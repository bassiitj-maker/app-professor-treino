"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function CadastroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    cpf: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    aceitouTermos: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.aceitouTermos) {
      alert("Você precisa aceitar os termos de uso")
      return
    }

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirecionar para página de assinatura
        router.push(`/assinatura?professor_id=${data.professorId}`)
      } else {
        alert(data.error || "Erro ao criar conta")
      }
    } catch (error) {
      console.error(error)
      alert("Erro ao criar conta. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link href="/">
          <Button variant="ghost" className="text-white mb-6 hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Criar Conta</h1>
              <p className="text-gray-400">Preencha seus dados para começar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Dados Pessoais</h3>
                
                <div>
                  <Label htmlFor="nomeCompleto" className="text-gray-300">Nome Completo</Label>
                  <Input
                    id="nomeCompleto"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                    required
                    className="bg-slate-700/50 border-purple-500/30 text-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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
                    <Label htmlFor="cpf" className="text-gray-300">CPF</Label>
                    <Input
                      id="cpf"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                      placeholder="000.000.000-00"
                      required
                      className="bg-slate-700/50 border-purple-500/30 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="telefone" className="text-gray-300">Telefone</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    required
                    className="bg-slate-700/50 border-purple-500/30 text-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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
                  <div>
                    <Label htmlFor="confirmarSenha" className="text-gray-300">Confirmar Senha</Label>
                    <Input
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type="password"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      required
                      className="bg-slate-700/50 border-purple-500/30 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Endereço</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cep" className="text-gray-300">CEP</Label>
                    <Input
                      id="cep"
                      name="cep"
                      value={formData.cep}
                      onChange={handleChange}
                      placeholder="00000-000"
                      required
                      className="bg-slate-700/50 border-purple-500/30 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="endereco" className="text-gray-300">Endereço</Label>
                    <Input
                      id="endereco"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleChange}
                      required
                      className="bg-slate-700/50 border-purple-500/30 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="numero" className="text-gray-300">Número</Label>
                    <Input
                      id="numero"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      required
                      className="bg-slate-700/50 border-purple-500/30 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="complemento" className="text-gray-300">Complemento</Label>
                    <Input
                      id="complemento"
                      name="complemento"
                      value={formData.complemento}
                      onChange={handleChange}
                      className="bg-slate-700/50 border-purple-500/30 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bairro" className="text-gray-300">Bairro</Label>
                    <Input
                      id="bairro"
                      name="bairro"
                      value={formData.bairro}
                      onChange={handleChange}
                      required
                      className="bg-slate-700/50 border-purple-500/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cidade" className="text-gray-300">Cidade</Label>
                    <Input
                      id="cidade"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      required
                      className="bg-slate-700/50 border-purple-500/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="estado" className="text-gray-300">Estado</Label>
                    <Input
                      id="estado"
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      placeholder="UF"
                      maxLength={2}
                      required
                      className="bg-slate-700/50 border-purple-500/30 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Termos */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="termos"
                  checked={formData.aceitouTermos}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, aceitouTermos: checked as boolean }))
                  }
                  className="mt-1"
                />
                <Label htmlFor="termos" className="text-gray-300 text-sm leading-relaxed">
                  Eu aceito os{" "}
                  <Link href="/termos" className="text-purple-400 hover:underline">
                    Termos de Uso
                  </Link>{" "}
                  e a{" "}
                  <Link href="/privacidade" className="text-purple-400 hover:underline">
                    Política de Privacidade
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Criar Conta e Continuar"
                )}
              </Button>
            </form>

            <p className="text-center text-gray-400 mt-6">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-purple-400 hover:underline">
                Fazer login
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
