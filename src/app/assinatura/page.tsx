"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Loader2, CreditCard } from "lucide-react"
import { motion } from "framer-motion"

export default function AssinaturaPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const professorId = searchParams.get("professor_id")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!professorId) {
      router.push("/cadastro")
    }
  }, [professorId, router])

  const handleSubscribe = async () => {
    setLoading(true)

    try {
      const response = await fetch("/api/criar-assinatura", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ professorId }),
      })

      const data = await response.json()

      if (response.ok && data.sessionUrl) {
        // Redirecionar para checkout do Stripe
        window.location.href = data.sessionUrl
      } else {
        alert(data.error || "Erro ao criar assinatura")
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      alert("Erro ao processar pagamento")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Escolha Seu Plano
          </h1>
          <p className="text-gray-400 text-lg">
            Comece agora e transforme seu trabalho
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Plano Inicial</h2>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-white">R$ 49,90</span>
                <span className="text-white/80">/mês</span>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-white text-lg">10 vagas para alunas incluídas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-white text-lg">Treinos ilimitados</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-white text-lg">Upload de vídeos sem limite</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-white text-lg">Sistema de feedback em tempo real</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-white text-lg">Painel de acompanhamento completo</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-white text-lg">Suporte prioritário</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-white text-lg">Adicione mais vagas quando precisar</span>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-8">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Pagamento Seguro
                </h3>
                <p className="text-gray-400 text-sm">
                  Processamento seguro via Stripe. Cobrança recorrente mensal. Cancele quando quiser.
                </p>
              </div>

              <Button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-xl shadow-2xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Assinar Agora"
                )}
              </Button>

              <p className="text-center text-gray-400 text-sm mt-4">
                Ao assinar, você concorda com nossos termos de serviço
              </p>
            </div>
          </Card>
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Precisa de mais vagas? Você pode adicionar pacotes extras a qualquer momento no painel.
          </p>
        </div>
      </div>
    </div>
  )
}
