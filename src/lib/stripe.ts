import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

// Preços dos planos
export const PLANOS = {
  INICIAL: {
    preco: 4990, // R$ 49,90 em centavos
    vagas: 10,
    nome: 'Plano Inicial',
    descricao: '10 vagas para alunas',
  },
  VAGAS_5: {
    preco: 1990, // R$ 19,90
    vagas: 5,
    nome: '+5 Vagas',
    descricao: 'Adicione 5 vagas extras',
  },
  VAGAS_10: {
    preco: 3490, // R$ 34,90
    vagas: 10,
    nome: '+10 Vagas',
    descricao: 'Adicione 10 vagas extras',
  },
  VAGAS_20: {
    preco: 5990, // R$ 59,90
    vagas: 20,
    nome: '+20 Vagas',
    descricao: 'Adicione 20 vagas extras',
  },
}

export async function criarAssinaturaInicial(
  email: string,
  professorId: string
) {
  // Criar customer no Stripe
  const customer = await stripe.customers.create({
    email,
    metadata: {
      professor_id: professorId,
    },
  })

  // Criar produto e preço se não existir
  const produto = await stripe.products.create({
    name: PLANOS.INICIAL.nome,
    description: PLANOS.INICIAL.descricao,
  })

  const preco = await stripe.prices.create({
    product: produto.id,
    unit_amount: PLANOS.INICIAL.preco,
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
        price: preco.id,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/professor?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/assinatura?canceled=true`,
    metadata: {
      professor_id: professorId,
      tipo: 'assinatura_inicial',
    },
  })

  return { sessionId: session.id, customerId: customer.id }
}

export async function comprarVagasAdicionais(
  customerId: string,
  professorId: string,
  pacote: keyof typeof PLANOS
) {
  const plano = PLANOS[pacote]

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'brl',
          product_data: {
            name: plano.nome,
            description: plano.descricao,
          },
          unit_amount: plano.preco,
        },
        quantity: 1,
      },
    ],
    mode: 'payment', // Pagamento único
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/professor?vagas_adicionadas=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/professor/vagas?canceled=true`,
    metadata: {
      professor_id: professorId,
      tipo: 'vagas_adicionais',
      vagas: plano.vagas.toString(),
    },
  })

  return session.id
}
