import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Bronze",
    badge: "Para começar",
    price: "289",
    accent: "from-amber-700 to-amber-500",
    features: [
      { label: "1 oferta/semana", on: true },
      { label: "Player Web", on: true },
      { label: "Vinhetas", on: true },
      { label: "Spots Sazonais", on: false },
      { label: "Setup de Som", on: false },
      { label: "Suporte por E-mail", on: true },
    ],
    cta: "Assinar Bronze",
    variant: "outline" as const,
  },
  {
    name: "Prata",
    badge: "Mais popular",
    price: "489",
    highlight: true,
    accent: "from-slate-400 to-slate-200",
    features: [
      { label: "2 ofertas/semana", on: true },
      { label: "Player Web", on: true },
      { label: "Vinhetas", on: true },
      { label: "Spots Sazonais", on: true },
      { label: "Setup de Som", on: false },
      { label: "Suporte por WhatsApp", on: true },
    ],
    cta: "Assinar Prata",
    variant: "accent" as const,
  },
  {
    name: "Ouro",
    badge: "Performance máxima",
    price: "789",
    accent: "from-yellow-500 to-amber-300",
    features: [
      { label: "4 ofertas/semana", on: true },
      { label: "Player Web", on: true },
      { label: "Vinhetas", on: true },
      { label: "Spots Sazonais", on: true },
      { label: "Setup de Som — assistência completa", on: true },
      { label: "Suporte Prioritário 24h", on: true },
    ],
    cta: "Assinar Ouro",
    variant: "default" as const,
  },
];

export const Pricing = () => {
  return (
    <section id="planos" className="py-24 md:py-32 bg-secondary/40 relative">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="text-xs font-bold tracking-[0.2em] text-accent uppercase mb-4">
            Planos
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl leading-tight text-balance">
            Escolha a frequência ideal para a sua marca.
          </h2>
          <p className="text-lg text-muted-foreground mt-5">
            Sem fidelidade. Cancele quando quiser. Mude de plano a qualquer momento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-8 border transition-smooth ${
                p.highlight
                  ? "bg-gradient-dark text-primary-foreground border-transparent shadow-elegant scale-100 md:scale-105 z-10"
                  : "bg-card border-border hover:border-primary/30 hover:shadow-soft"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-accent text-accent-foreground text-xs font-bold shadow-accent">
                  {p.badge}
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-br ${p.accent}`} />
                <span className={`text-sm font-semibold ${p.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {p.name}
                </span>
              </div>

              {!p.highlight && (
                <div className="text-xs text-muted-foreground mb-3">{p.badge}</div>
              )}

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-medium opacity-70">R$</span>
                  <span className="font-display font-black text-5xl tracking-tight">{p.price}</span>
                  <span className={`text-sm ${p.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    /mês
                  </span>
                </div>
              </div>

              <Button
                variant={p.variant}
                size="lg"
                className="w-full mb-7"
                asChild
              >
                <a href="/auth">{p.cta}</a>
              </Button>

              <ul className="space-y-3.5">
                {p.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-3 text-sm">
                    {f.on ? (
                      <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        p.highlight ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary"
                      }`}>
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                    ) : (
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Minus className="h-3 w-3" />
                      </span>
                    )}
                    <span className={f.on ? "" : "opacity-50 line-through"}>{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
