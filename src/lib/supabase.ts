import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types para o banco de dados
export type Professor = {
  id: string
  email: string
  nome_completo: string
  cpf: string
  telefone: string
  endereco: string
  assinatura_ativa: boolean
  vagas_contratadas: number
  vagas_ocupadas: number
  stripe_customer_id?: string
  stripe_subscription_id?: string
  created_at: string
  updated_at: string
}

export type Aluna = {
  id: string
  professor_id: string
  nome: string
  email?: string
  senha_hash: string
  ativa: boolean
  created_at: string
  updated_at: string
}

export type Treino = {
  id: string
  professor_id: string
  titulo: string
  descricao: string
  video_url?: string
  categoria?: string
  semana?: number
  created_at: string
  updated_at: string
}

export type TreinoAluna = {
  id: string
  treino_id: string
  aluna_id: string
  concluido: boolean
  video_execucao_url?: string
  data_conclusao?: string
  created_at: string
  updated_at: string
}

export type Feedback = {
  id: string
  treino_aluna_id: string
  professor_id: string
  mensagem: string
  created_at: string
}
