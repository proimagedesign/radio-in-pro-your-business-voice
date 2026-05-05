import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const CTA = () => {
  const [company, setCompany] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [segment, setSegment] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("leads").insert([
        {
          company_name: company,
          whatsapp: whatsapp,
          segment: segment,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Solicitação enviada!",
        description: "Em breve entraremos em contato via WhatsApp.",
      });
      setCompany("");
      setWhatsapp("");
      setSegment("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="relative rounded-[2rem] bg-gradient-dark text-primary-foreground p-6 md:p-16 overflow-hidden shadow-elegant">
          {/* Decorative */}
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-primary-glow/40 blur-3xl" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]"
          />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] text-accent uppercase mb-4">
                Instalação Rápida
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl leading-tight text-balance mb-5">
                Ouça a sua loja com a voz da RÁDIO IN-PRO.
              </h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Em até 24h, deixamos nosso sistema rodando no ambiente interno de som de sua loja.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl bg-background/95 backdrop-blur p-6 md:p-8 text-foreground shadow-elegant space-y-4">
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Nome da empresa</label>
                <Input 
                  placeholder="Mercado, farmácia, loja..." 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block">WhatsApp</label>
                <Input 
                  type="tel" 
                  placeholder="(11) 99999-0000" 
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Segmento</label>
                <Input 
                  placeholder="Ex: Supermercado de bairro" 
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" variant="accent" size="lg" className="w-full group" disabled={loading}>
                {loading ? "Enviando..." : "Testar por 30 dias"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="text-xs text-muted-foreground text-center pt-1">
                <MessageCircle className="inline h-3 w-3 mr-1" />
                Resposta em até 24h pelo nosso PRO-Bot.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
