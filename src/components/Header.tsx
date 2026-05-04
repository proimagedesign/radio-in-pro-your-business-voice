import { Radio, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const links = [
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#planos", label: "Planos" },
  { href: "#contato", label: "Contato" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 font-display font-extrabold text-lg">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Radio className="h-5 w-5 text-primary-foreground" />
            <span className="absolute inset-0 rounded-xl animate-pulse-ring bg-primary/40" />
          </span>
          <span>RÁDIO <span className="text-accent">IN-PRO</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-foreground transition-smooth">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">Entrar</Button>
          <Button variant="accent" size="sm">Demonstração</Button>
        </div>
        <button
          aria-label="Abrir menu"
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-3">
            {links.map(l => (
              <a key={l.href} href={l.href} className="py-2 text-sm" onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            <Button variant="accent" className="w-full">Demonstração Gratuita</Button>
          </div>
        </div>
      )}
    </header>
  );
};
