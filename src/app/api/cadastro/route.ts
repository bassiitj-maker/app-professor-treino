import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      nomeCompleto,
      email,
      senha,
      cpf,
      telefone,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
    } = body

    // Verificar se email já existe
    const { data: existingUser } = await supabase
      .from('professores')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10)

    // Criar endereço completo
    const enderecoCompleto = `${endereco}, ${numero}${complemento ? ` - ${complemento}` : ''}, ${bairro}, ${cidade} - ${estado}, ${cep}`

    // Criar professor no banco
    const { data: professor, error } = await supabase
      .from('professores')
      .insert({
        nome_completo: nomeCompleto,
        email,
        senha_hash: senhaHash,
        cpf,
        telefone,
        endereco: enderecoCompleto,
        assinatura_ativa: false,
        vagas_contratadas: 0,
        vagas_ocupadas: 0,
      })
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar professor:', error)
      return NextResponse.json(
        { error: 'Erro ao criar conta' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      professorId: professor.id,
    })
  } catch (error) {
    console.error('Erro no cadastro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
