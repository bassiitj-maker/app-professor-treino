"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("professor")
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tipo: showAdminLogin ? "admin" : activeTab,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Salvar token no localStorage
        localStorage.setItem("token", data.token)
        localStorage.setItem("userType", data.tipo)
        localStorage.setItem("userId", data.userId)

        // Redirecionar baseado no tipo
        if (data.tipo === "admin") {
          router.push("/admin")
        } else if (data.tipo === "professor") {
          router.push("/professor")
        } else if (data.tipo === "aluna") {
          router.push("/aluna")
        }
      } else {
        alert(data.error || "Erro ao fazer login")
      }
    } catch (error) {
      console.error(error)
      alert("Erro ao fazer login. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 relative">
      <div className="container mx-auto max-w-md">
        <Link href="/">
          <Button variant="ghost" className="text-white mb-6 hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Login</h1>
              <p className="text-gray-400">Acesse sua conta</p>
            </div>

            {!showAdminLogin ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="professor">Professor</TabsTrigger>
                  <TabsTrigger value="aluna">Aluna</TabsTrigger>
                </TabsList>

                <TabsContent value="professor">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-slate-700/50 border-purple-500/30 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="senha" className="text-gray-300">Senha</Label>
                      <Input
                        id="senha"
                        name="senha"
                        type="password"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                        className="bg-slate-700/50 border-purple-500/30 text-white"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-xl"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Entrando...
                        </>
                      ) : (
                        "Entrar como Professor"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="aluna">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email-aluna" className="text-gray-300">Email</Label>
                      <Input
                        id="email-aluna"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-slate-700/50 border-purple-500/30 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="senha-aluna" className="text-gray-300">Senha</Label>
                      <Input
                        id="senha-aluna"
                        name="senha"
                        type="password"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                        className="bg-slate-700/50 border-purple-500/30 text-white"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-xl"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Entrando...
                        </>
                      ) : (
                        "Entrar como Aluna"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email-admin" className="text-gray-300">Email Admin</Label>
                  <Input
                    id="email-admin"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-slate-700/50 border-purple-500/30 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="senha-admin" className="text-gray-300">Senha Admin</Label>
                  <Input
                    id="senha-admin"
                    name="senha"
                    type="password"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                    className="bg-slate-700/50 border-purple-500/30 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar como Admin"
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  variant="ghost"
                  className="w-full text-gray-400 hover:text-white"
                >
                  Voltar
                </Button>
              </form>
            )}

            <p className="text-center text-gray-400 mt-6">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-purple-400 hover:underline">
                Criar conta
              </Link>
            </p>
          </Card>
        </div>
      </div>

      {/* Botão secreto de admin no canto inferior esquerdo */}
      <button
        onClick={() => setShowAdminLogin(!showAdminLogin)}
        className="fixed bottom-4 left-4 w-3 h-3 bg-transparent hover:bg-slate-700/20 rounded-full transition-colors duration-300"
        aria-label="Admin access"
      />
    </div>
  )
}
