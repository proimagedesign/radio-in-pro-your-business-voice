import { Radio } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2.5 font-display font-extrabold text-foreground">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
          <Radio className="h-4 w-4 text-primary-foreground" />
        </span>
        RÁDIO <span className="text-accent">IN-PRO</span>
      </div>
      <p className="italic">"A voz estratégica do seu negócio."</p>
      <p>© {new Date().getFullYear()} RÁDIO IN-PRO. Todos os direitos reservados.</p>
    </div>
  </footer>
);
