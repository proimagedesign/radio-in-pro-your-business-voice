import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OrderFormProps {
  onClose: () => void;
}

export const OrderForm = ({ onClose }: OrderFormProps) => {
  const [script, setScript] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado.");

      const { error } = await supabase.from("orders").insert([
        {
          user_id: user.id,
          script,
          recording_type: type,
          status: "pending",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Pedido enviado!",
        description: "Nossa equipe começará a trabalhar na sua gravação em breve.",
      });
      onClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar pedido",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-lg rounded-3xl border border-border shadow-elegant overflow-hidden relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-full"
          onClick={onClose}
        >
          <X size={20} />
        </Button>

        <div className="p-8">
          <h2 className="text-2xl font-display font-black mb-1">Novo Pedido de Gravação</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Descreva o que você precisa que seja gravado.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Gravação</Label>
              <Input
                id="type"
                placeholder="Ex: Oferta da semana, Vinheta, Spot de Natal..."
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="script">Texto / Script</Label>
              <Textarea
                id="script"
                placeholder="Escreva aqui o texto exatamente como deve ser gravado..."
                className="min-h-[150px] resize-none"
                value={script}
                onChange={(e) => setScript(e.target.value)}
                required
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Enviando..." : "Enviar Pedido de Gravação"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
