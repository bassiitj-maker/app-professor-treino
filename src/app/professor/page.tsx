"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Video, TrendingUp, LogOut, Plus, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

type Professor = {
  id: string
  nome_completo: string
  email: string
  vagas_contratadas: number
  vagas_ocupadas: number
  assinatura_ativa: boolean
}

type Aluna = {
  id: string
  nome: string
  email: string
  ativa: boolean
}

type Treino = {
  id: string
  titulo: string
  categoria: string
}

export default function ProfessorDashboard() {
  const router = useRouter()
  const [professor, setProfessor] = useState<Professor | null>(null)
  const [alunas, setAlunas] = useState<Aluna[]>([])
  const [treinos, setTreinos] = useState<Treino[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userType = localStorage.getItem("userType")
    const userId = localStorage.getItem("userId")

    if (!token || userType !== "professor") {
      router.push("/login")
      return
    }

    loadData(userId!)
  }, [router])

  const loadData = async (professorId: string) => {
    try {
      // Buscar dados do professor
      const profResponse = await fetch(`/api/professor/${professorId}`)
      const profData = await profResponse.json()
      setProfessor(profData)

      // Buscar alunas
      const alunasResponse = await fetch(`/api/professor/${professorId}/alunas`)
      const alunasData = await alunasResponse.json()
      setAlunas(alunasData)

      // Buscar treinos
      const treinosResponse = await fetch(`/api/professor/${professorId}/treinos`)
      const treinosData = await treinosResponse.json()
      setTreinos(treinosData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    localStorage.removeItem("userId")
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  const vagasLivres = (professor?.vagas_contratadas || 0) - (professor?.vagas_ocupadas || 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Painel do Professor</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Olá, {professor?.nome_completo}</span>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Cards de Estatísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Vagas Totais</p>
                <p className="text-3xl font-bold text-white">{professor?.vagas_contratadas}</p>
              </div>
              <Users className="w-10 h-10 text-purple-400" />
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Vagas Ocupadas</p>
                <p className="text-3xl font-bold text-white">{professor?.vagas_ocupadas}</p>
              </div>
              <Users className="w-10 h-10 text-green-400" />
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Vagas Livres</p>
                <p className="text-3xl font-bold text-white">{vagasLivres}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-400" />
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Treinos Criados</p>
                <p className="text-3xl font-bold text-white">{treinos.length}</p>
              </div>
              <Video className="w-10 h-10 text-pink-400" />
            </div>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/professor/alunas/nova">
            <Card className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center gap-4">
                <Plus className="w-10 h-10 text-white" />
                <div>
                  <h3 className="text-xl font-bold text-white">Nova Aluna</h3>
                  <p className="text-purple-100">Cadastrar nova aluna</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/professor/treinos/novo">
            <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 p-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center gap-4">
                <Video className="w-10 h-10 text-white" />
                <div>
                  <h3 className="text-xl font-bold text-white">Novo Treino</h3>
                  <p className="text-blue-100">Criar treino com vídeo</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/professor/vagas">
            <Card className="bg-gradient-to-br from-green-600 to-emerald-600 p-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center gap-4">
                <Settings className="w-10 h-10 text-white" />
                <div>
                  <h3 className="text-xl font-bold text-white">Gerenciar Vagas</h3>
                  <p className="text-green-100">Comprar mais vagas</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Lista de Alunas */}
        <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Minhas Alunas</h2>
            <Link href="/professor/alunas">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Ver Todas
              </Button>
            </Link>
          </div>

          {alunas.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              Você ainda não tem alunas cadastradas
            </p>
          ) : (
            <div className="space-y-3">
              {alunas.slice(0, 5).map((aluna) => (
                <div
                  key={aluna.id}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                >
                  <div>
                    <p className="text-white font-semibold">{aluna.nome}</p>
                    <p className="text-gray-400 text-sm">{aluna.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        aluna.ativa
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {aluna.ativa ? "Ativa" : "Inativa"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Lista de Treinos */}
        <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Meus Treinos</h2>
            <Link href="/professor/treinos">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Ver Todos
              </Button>
            </Link>
          </div>

          {treinos.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              Você ainda não criou nenhum treino
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {treinos.slice(0, 6).map((treino) => (
                <Card
                  key={treino.id}
                  className="bg-slate-700/30 border-purple-500/20 p-4 hover:bg-slate-700/50 transition-colors"
                >
                  <h3 className="text-white font-semibold mb-2">{treino.titulo}</h3>
                  <p className="text-gray-400 text-sm">{treino.categoria}</p>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
