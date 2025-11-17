import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("professores")
      .select("*")
      .eq("id", params.id)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: "Professor não encontrado" },
        { status: 404 }
      )
    }

    // Não retornar senha_hash
    const { senha_hash, ...professorData } = data

    return NextResponse.json(professorData)
  } catch (error) {
    console.error("Erro ao buscar professor:", error)
    return NextResponse.json(
      { error: "Erro ao buscar professor" },
      { status: 500 }
    )
  }
}
