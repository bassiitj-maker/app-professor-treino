import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const professorId = session.metadata?.professor_id
        const tipo = session.metadata?.tipo

        if (tipo === 'assinatura_inicial') {
          // Ativar assinatura e adicionar 10 vagas
          await supabase
            .from('professores')
            .update({
              assinatura_ativa: true,
              vagas_contratadas: 10,
              stripe_subscription_id: session.subscription as string,
            })
            .eq('id', professorId)
        } else if (tipo === 'vagas_adicionais') {
          // Adicionar vagas extras
          const vagas = parseInt(session.metadata?.vagas || '0')
          
          const { data: professor } = await supabase
            .from('professores')
            .select('vagas_contratadas')
            .eq('id', professorId)
            .single()

          if (professor) {
            await supabase
              .from('professores')
              .update({
                vagas_contratadas: professor.vagas_contratadas + vagas,
              })
              .eq('id', professorId)
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Desativar assinatura
        await supabase
          .from('professores')
          .update({
            assinatura_ativa: false,
          })
          .eq('stripe_customer_id', customerId)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        // Notificar professor sobre falha no pagamento
        console.log('Pagamento falhou para customer:', customerId)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
