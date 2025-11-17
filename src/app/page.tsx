"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Users, Video, TrendingUp, Dumbbell } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <Dumbbell className="w-4 h-4" />
              <span className="text-sm font-medium">Plataforma Profissional de Treinos</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Gerencie Seus Treinos
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> de Forma Profissional</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              A plataforma completa para professores de educação física acompanharem suas alunas, criarem treinos personalizados e receberem feedback em tempo real.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cadastro">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 text-lg rounded-xl shadow-2xl hover:shadow-green-500/50 transition-all duration-300">
                  Criar Conta e Começar
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-purple-400 text-purple-300 hover:bg-purple-500/20 px-8 py-6 text-lg rounded-xl backdrop-blur-sm">
                Ver Demonstração
              </Button>
            </div>
          </motion.div>

          {/* Video Demo */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-20 h-20 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg">Vídeo Demonstrativo</p>
                  <p className="text-gray-500 text-sm mt-2">Veja como funciona em 2 minutos</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Ferramentas profissionais para elevar seu trabalho a outro nível
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 h-full">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Por que escolher nossa plataforma?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-gray-400">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 text-white">
                <h3 className="text-3xl font-bold mb-4">Comece Agora</h3>
                <p className="text-purple-100 mb-6">
                  Apenas R$ 49,90/mês para gerenciar até 10 alunas. Adicione mais vagas conforme seu negócio cresce.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>10 vagas incluídas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Treinos ilimitados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Upload de vídeos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Suporte prioritário</span>
                  </li>
                </ul>
                <Link href="/cadastro">
                  <Button size="lg" className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold">
                    Criar Minha Conta
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para transformar seu trabalho?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Junte-se a centenas de professores que já estão usando nossa plataforma
            </p>
            <Link href="/cadastro">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-6 text-lg rounded-xl shadow-2xl hover:shadow-green-500/50 transition-all duration-300">
                Começar Gratuitamente
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2024 FitPro Manager. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: "Gestão de Alunas",
    description: "Cadastre e gerencie todas as suas alunas em um só lugar"
  },
  {
    icon: <Video className="w-6 h-6 text-white" />,
    title: "Treinos em Vídeo",
    description: "Crie treinos com vídeos demonstrativos de alta qualidade"
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    title: "Acompanhamento",
    description: "Monitore o progresso e evolução de cada aluna"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-white" />,
    title: "Feedback Instantâneo",
    description: "Receba e envie feedbacks em tempo real"
  }
]

const benefits = [
  {
    title: "Interface Intuitiva",
    description: "Design moderno e fácil de usar, tanto para você quanto para suas alunas"
  },
  {
    title: "Totalmente Responsivo",
    description: "Acesse de qualquer dispositivo - celular, tablet ou computador"
  },
  {
    title: "Armazenamento Seguro",
    description: "Todos os vídeos e dados protegidos com criptografia de ponta"
  },
  {
    title: "Escalável",
    description: "Comece pequeno e cresça conforme seu negócio expande"
  }
]
