import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export async function POST(request: NextRequest) {
  try {
    const { email, senha, tipo } = await request.json()

    if (!email || !senha || !tipo) {
      return NextResponse.json(
        { error: "Email, senha e tipo são obrigatórios" },
        { status: 400 }
      )
    }

    let user
    let tableName = ""

    // Buscar usuário baseado no tipo
    if (tipo === "professor") {
      tableName = "professores"
      const { data, error } = await supabase
        .from("professores")
        .select("*")
        .eq("email", email)
        .single()

      if (error || !data) {
        return NextResponse.json(
          { error: "Email ou senha incorretos" },
          { status: 401 }
        )
      }
      user = data
    } else if (tipo === "aluna") {
      tableName = "alunas"
      const { data, error } = await supabase
        .from("alunas")
        .select("*")
        .eq("email", email)
        .single()

      if (error || !data) {
        return NextResponse.json(
          { error: "Email ou senha incorretos" },
          { status: 401 }
        )
      }
      user = data
    } else if (tipo === "admin") {
      tableName = "administradores"
      const { data, error } = await supabase
        .from("administradores")
        .select("*")
        .eq("email", email)
        .single()

      if (error || !data) {
        return NextResponse.json(
          { error: "Email ou senha incorretos" },
          { status: 401 }
        )
      }
      user = data
    } else {
      return NextResponse.json(
        { error: "Tipo de usuário inválido" },
        { status: 400 }
      )
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, user.senha_hash)
    if (!senhaValida) {
      return NextResponse.json(
        { error: "Email ou senha incorretos" },
        { status: 401 }
      )
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        tipo: tipo,
        role: user.role || tipo,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    return NextResponse.json({
      success: true,
      token,
      userId: user.id,
      tipo,
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome_completo || user.nome,
      },
    })
  } catch (error) {
    console.error("Erro no login:", error)
    return NextResponse.json(
      { error: "Erro ao fazer login" },
      { status: 500 }
    )
  }
}
