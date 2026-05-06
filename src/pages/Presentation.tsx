import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Users, 
  ShoppingBag, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Award,
  BarChart3,
  Mic2
} from "lucide-react";
import { motion } from "framer-motion";

const Presentation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Slide 1: Capa */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-dark text-white">
          <div className="absolute inset-0 opacity-40 bg-[url('/hero-apresentacao.png')] bg-cover bg-center" />
          <div className="container relative z-10 text-center space-y-6 max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-bold tracking-widest uppercase"
            >
              <Award className="w-4 h-4" /> Apresentação Oficial
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-black leading-[1.1]"
            >
              RÁDIO <span className="text-accent">IN-PRO</span><br />
              <span className="text-3xl md:text-5xl opacity-90 font-medium">Rádio Interna para Lojas que Vendem Mais Todos os Dias</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 max-w-2xl mx-auto"
            >
              A voz estratégica que transforma o ambiente da sua loja em uma máquina de vendas.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button size="xl" variant="accent" className="shadow-accent group" asChild>
                <a href="#desafio">
                  Iniciar Apresentação <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Slide 2: O Desafio do Varejo Atual */}
        <section id="desafio" className="py-24 bg-secondary/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-sm font-bold text-accent tracking-[0.2em] uppercase">O Cenário</h2>
                <h3 className="text-4xl md:text-5xl font-display font-black">O Desafio do Varejo Atual</h3>
                <p className="text-lg text-muted-foreground">
                  Hoje, atrair o cliente para dentro da loja é apenas o começo. O verdadeiro desafio é manter a atenção e influenciar a decisão no momento crucial.
                </p>
                <div className="space-y-4 pt-4">
                  {[
                    { icon: Users, title: "Concorrência Alta", desc: "Sua loja luta por cada segundo da atenção do consumidor." },
                    { icon: Zap, title: "Clientes Distraídos", desc: "O excesso de estímulos digitais dispersa o foco do seu produto." },
                    { icon: Clock, title: "Tempo Decisivo", desc: "Você tem poucos segundos para converter movimento em faturamento." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-background border border-border shadow-soft">
                      <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-muted overflow-hidden shadow-elegant border border-border">
                  <img 
                    src="/loja-movimentada.png" 
                    alt="Loja movimentada" 
                    className="w-full h-full object-cover transition-smooth hover:scale-105" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3: O Que é a RÁDIO IN-PRO */}
        <section className="py-24">
          <div className="container text-center max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-8">O Que é a RÁDIO IN-PRO?</h2>
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-dark text-white shadow-elegant relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] -mr-32 -mt-32" />
               <p className="text-2xl md:text-3xl leading-relaxed font-light">
                Muito mais que música, somos uma <span className="text-accent font-bold">estratégia de comunicação auditiva</span> personalizada para o varejo. Unimos tecnologia, locução profissional e inteligência de marketing para falar diretamente com o seu cliente no ponto de venda.
               </p>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 border-t border-white/10 pt-12">
                 <div>
                   <div className="text-accent font-black text-3xl">100%</div>
                   <div className="text-xs uppercase tracking-widest text-white/60">Personalizada</div>
                 </div>
                 <div>
                   <div className="text-accent font-black text-3xl">24h</div>
                   <div className="text-xs uppercase tracking-widest text-white/60">No ar</div>
                 </div>
                 <div className="col-span-2 md:col-span-1">
                   <div className="text-accent font-black text-3xl">Premium</div>
                   <div className="text-xs uppercase tracking-widest text-white/60">Vozes Reais</div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Slide 4 & 5: Como Aumenta Vendas e Benefícios */}
        <section className="py-24 bg-secondary/50">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-black">Como a Rádio Interna Aumenta as Vendas</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Ciência e persuasão aplicadas ao som ambiente.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Compras por Impulso", 
                  desc: "Estimulamos o desejo imediato através de gatilhos mentais em spots promocionais estrategicamente posicionados.",
                  icon: TrendingUp
                },
                { 
                  title: "Destaque de Ofertas", 
                  desc: "Garantimos que nenhum cliente saia da loja sem saber das suas melhores promoções e novos lançamentos.",
                  icon: Target
                },
                { 
                  title: "Influência Comportamental", 
                  desc: "Músicas e mensagens que ajustam o tempo de permanência e o humor do cliente para maximizar o ticket médio.",
                  icon: BarChart3
                }
              ].map((card, i) => (
                <div key={i} className="p-8 rounded-3xl bg-card border border-border shadow-soft hover:shadow-elegant transition-smooth group">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-smooth">
                    <card.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">{card.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Slide 6: Conteúdos */}
        <section className="py-24">
          <div className="container">
            <div className="bg-gradient-primary rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight">O que você ouve na RÁDIO IN-PRO</h2>
                  <div className="grid gap-6">
                    {[
                      "Spots promocionais de alto impacto",
                      "Ofertas relâmpago do dia",
                      "Mensagens institucionais e branding",
                      "Curadoria musical por perfil de loja",
                      "Vinhetas personalizadas com sua marca"
                    ].map((text, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="text-accent w-6 h-6 shrink-0" />
                        <span className="text-lg font-medium">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                   <div className="relative w-64 h-64">
                     <div className="absolute inset-0 bg-accent rounded-full blur-3xl opacity-50 animate-pulse" />
                     <Mic2 className="w-full h-full text-white relative z-10" strokeWidth={1} />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 7: Diferenciais */}
        <section className="py-24 bg-background">
          <div className="container">
             <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-display font-black">Diferenciais que nos tornam Únicos</h2>
             </div>
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { title: "Conteúdo Profissional", desc: "Locutores de rádio e TV com vozes vendedoras." },
                 { title: "Linguagem Estratégica", desc: "Scripts criados por especialistas em varejo." },
                 { title: "Atualização Ágil", desc: "Novos conteúdos prontos em até 24 horas." },
                 { title: "Personalização Total", desc: "Sua rádio única, para uma loja ou rede inteira." }
               ].map((item, i) => (
                 <div key={i} className="p-6 rounded-2xl bg-secondary/30 border border-border">
                   <ShieldCheck className="w-8 h-8 text-primary mb-4" />
                   <h4 className="font-bold mb-2">{item.title}</h4>
                   <p className="text-sm text-muted-foreground">{item.desc}</p>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* Slide 8: Resultados Esperados */}
        <section className="py-24 bg-gradient-dark text-white">
          <div className="container text-center">
            <h2 className="text-4xl font-display font-black mb-12">Resultados que seu negócio vai sentir</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="text-accent text-6xl font-black">+15%</div>
                <p className="text-xl font-medium">Aumento médio do Ticket Médio</p>
                <p className="text-white/50 text-sm">Baseado em pesquisas de marketing sensorial</p>
              </div>
              <div className="space-y-4">
                <div className="text-accent text-6xl font-black">9/10</div>
                <p className="text-xl font-medium">Melhoria na percepção de marca</p>
                <p className="text-white/50 text-sm">Ambiente mais profissional e acolhedor</p>
              </div>
              <div className="space-y-4">
                <div className="text-accent text-6xl font-black">100%</div>
                <p className="text-xl font-medium">Comunicação Garantida</p>
                <p className="text-white/50 text-sm">O cliente ouve enquanto compra</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 9: Para Quem é */}
        <section className="py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-display font-black">Para Quem é a RÁDIO IN-PRO?</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {["Lojas de Varejo", "Supermercados", "Farmácias", "Moda", "Eletro", "Franquias", "Redes Logistas"].map((tag, i) => (
                  <span key={i} className="px-6 py-3 rounded-full bg-secondary border border-border font-bold text-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Slide 10: Encerramento / CTA */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="container relative z-10">
            <div className="p-12 md:p-24 rounded-[3.5rem] bg-accent text-accent-foreground text-center space-y-10 shadow-accent">
               <h2 className="text-5xl md:text-7xl font-display font-black leading-tight">
                 RÁDIO IN-PRO
               </h2>
               <p className="text-3xl md:text-4xl font-medium max-w-3xl mx-auto opacity-90">
                 A rádio interna que transforma movimento em vendas todos os dias.
               </p>
               <div className="pt-6">
                 <Button size="xl" className="bg-white text-accent hover:bg-white/90 px-12 shadow-elegant" asChild>
                   <a href="/auth">Solicitar meu orçamento agora</a>
                 </Button>
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Presentation;
