import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { professorId } = await request.json()

    if (!professorId) {
      return NextResponse.json(
        { error: 'Professor ID é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar dados do professor
    const { data: professor, error: professorError } = await supabase
      .from('professores')
      .select('*')
      .eq('id', professorId)
      .single()

    if (professorError || !professor) {
      return NextResponse.json(
        { error: 'Professor não encontrado' },
        { status: 404 }
      )
    }

    // Criar customer no Stripe
    const customer = await stripe.customers.create({
      email: professor.email,
      name: professor.nome_completo,
      metadata: {
        professor_id: professorId,
      },
    })

    // Criar produto e preço
    const product = await stripe.products.create({
      name: 'Plano Inicial - FitPro Manager',
      description: '10 vagas para alunas + recursos ilimitados',
    })

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 4990, // R$ 49,90
      currency: 'brl',
      recurring: {
        interval: 'month',
      },
    })

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/professor?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/assinatura?professor_id=${professorId}&canceled=true`,
      metadata: {
        professor_id: professorId,
        tipo: 'assinatura_inicial',
      },
    })

    // Atualizar professor com IDs do Stripe
    await supabase
      .from('professores')
      .update({
        stripe_customer_id: customer.id,
      })
      .eq('id', professorId)

    return NextResponse.json({
      success: true,
      sessionUrl: session.url,
    })
  } catch (error) {
    console.error('Erro ao criar assinatura:', error)
    return NextResponse.json(
      { error: 'Erro ao processar assinatura' },
      { status: 500 }
    )
  }
}
