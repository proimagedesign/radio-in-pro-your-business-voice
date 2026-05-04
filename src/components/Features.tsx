import { Radio, Mic2, ListMusic, ShoppingBag, Headphones } from "lucide-react";

const features = [
  {
    icon: Radio,
    title: "Player Inteligente",
    desc: "Sistema estável e personalizado para o perfil do seu público.",
  },
  {
    icon: Mic2,
    title: "Locução High-End",
    desc: "Sua marca anunciada por vozes profissionais de rádio e TV.",
  },
  {
    icon: ListMusic,
    title: "Curadoria Semanal",
    desc: "Playlists atualizadas para o som nunca ficar cansativo.",
  },
  {
    icon: ShoppingBag,
    title: "Marketing Sensorial",
    desc: "Estimule o consumo através da ambientação sonora correta.",
  },
  {
    icon: Headphones,
    title: "Suporte Técnico",
    desc: "Auxílio completo na configuração do seu sistema de som físico.",
  },
];

export const Features = () => {
  return (
    <section id="diferenciais" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-bold tracking-[0.2em] text-accent uppercase mb-4">
            Diferenciais Exclusivos
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl leading-tight text-balance">
            Tudo que sua loja precisa para soar como uma{" "}
            <span className="text-primary">marca de verdade.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative rounded-2xl bg-gradient-card border border-border p-7 hover:border-primary/30 hover:shadow-elegant transition-smooth"
            >
              <div className="absolute top-5 right-5 font-display font-bold text-sm text-muted-foreground/40">
                0{i + 1}
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-gradient-primary group-hover:text-primary-foreground group-hover:shadow-glow transition-smooth">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}

          {/* CTA card */}
          <div className="relative rounded-2xl bg-gradient-dark text-primary-foreground p-7 overflow-hidden">
            <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative">
              <h3 className="font-display font-bold text-xl mb-2">Quer ouvir antes?</h3>
              <p className="text-primary-foreground/80 mb-5">
                Receba uma demo personalizada com o nome e ofertas da sua loja.
              </p>
              <a href="#contato" className="inline-flex items-center gap-2 text-accent font-bold hover:gap-3 transition-all">
                Solicitar agora →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
