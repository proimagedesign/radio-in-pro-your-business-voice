import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-store.jpg";

const Equalizer = () => (
  <div className="flex items-end gap-1 h-6">
    {[0.1, 0.3, 0.6, 0.2, 0.5, 0.4, 0.7].map((d, i) => (
      <span
        key={i}
        className="eq-bar w-1 rounded-full bg-accent"
        style={{ height: "100%", animationDelay: `${d}s` }}
      />
    ))}
  </div>
);

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-gradient-hero">
      {/* Decorative grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(hsl(var(--primary))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary))_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="container relative grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-1.5 text-xs font-medium shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Marketing sensorial para o ponto de venda
          </div>

          <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance">
            Rádio interna profissional para lojas que{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-accent bg-clip-text text-transparent">vendem mais</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                <path d="M2 5 Q 100 -2 198 5" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>{" "}
            todos os dias.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Música certa, locução profissional e campanhas que influenciam a decisão de compra do seu cliente no ponto de venda.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="accent" size="xl" className="group">
              Solicitar Demonstração Gratuita
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="xl">
              <Play className="mr-2 h-4 w-4 fill-current" />
              Ouvir amostra
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-4 text-sm text-muted-foreground">
            <div>
              <div className="font-display font-bold text-2xl text-foreground">+1.200</div>
              lojas no ar
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display font-bold text-2xl text-foreground">+38%</div>
              ticket médio
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display font-bold text-2xl text-foreground">24h</div>
              suporte ativo
            </div>
          </div>
        </div>

        {/* Visual: player mockup over store image */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-elegant animate-float">
            <img
              src={heroImg}
              alt="Loja moderna com ambientação sonora profissional da RÁDIO IN-PRO"
              width={1536}
              height={1024}
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/80 via-primary-deep/20 to-transparent" />

            {/* Player card */}
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-background/95 backdrop-blur-xl border border-border p-4 shadow-elegant">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow shrink-0">
                  <Play className="h-5 w-5 text-primary-foreground fill-current" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground font-medium">AO VIVO • Loja Centro</div>
                  <div className="font-semibold truncate">Promoção Dia das Mães · Spot 30s</div>
                </div>
                <Equalizer />
              </div>
              <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-accent" />
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -top-4 -left-4 rounded-2xl bg-card border border-border shadow-elegant px-4 py-3 hidden md:flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
            <div className="text-xs">
              <div className="font-bold">Curadoria semanal</div>
              <div className="text-muted-foreground">Atualizada toda segunda</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
