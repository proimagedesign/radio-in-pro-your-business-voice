import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Olá! Sou o PRO-Bot, seu consultor de rádio e voz. Como posso ajudar sua empresa hoje?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const currentMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    
    setMessages(currentMessages);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      
      if (!apiKey) {
        throw new Error("Chave de API (VITE_OPENROUTER_API_KEY) não encontrada no .env");
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Rádio In-Pro",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `Você é o PRO-Bot, consultor oficial da RÁDIO IN-PRO. 
              Ajude o cliente a entender os benefícios da rádio interna (marketing sensorial).
              
              PLANOS:
              - Bronze (R$ 289/mês)
              - Prata (R$ 489/mês)
              - Ouro (R$ 789/mês): Inclui o fornecimento do sistema de som completo.
              
              SOBRE INSTALAÇÃO DE SOM (IMPORTANTE):
              Se perguntarem sobre a instalação física, explique que no Plano Ouro fornecemos os equipamentos, mas a instalação (mão de obra de fiação/eletricista) é por conta do cliente. Nós damos todo o suporte técnico e consultoria para que o eletricista contratado faça o serviço corretamente.
              
              DIRETRIZES:
              - Incentive o teste de 30 dias (Instalação Rápida).
              - Responda de forma curta, persuasiva e prestativa em Português.`
            },
            ...currentMessages
          ],
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "Erro na API");
      }

      const botMessage = data.choices[0].message.content;
      setMessages(prev => [...prev, { role: "assistant", content: botMessage }]);
    } catch (error: any) {
      console.error("Erro no chatbot:", error);
      toast({
        variant: "destructive",
        title: "Erro de Conexão",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] h-[500px] bg-card border border-border rounded-3xl shadow-elegant flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <p className="font-bold text-sm">PRO-Bot</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-white/10" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </Button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/10">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-2 max-w-[85%]", m.role === "user" ? "ml-auto flex-row-reverse" : "")}>
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0", m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                  {m.role === "user" ? <User size={12} /> : <Bot size={12} />}
                </div>
                <div className={cn("p-3 rounded-2xl text-sm", m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted rounded-tl-none")}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-xs text-muted-foreground animate-pulse ml-8">PRO-Bot está digitando...</div>}
          </div>

          <div className="p-4 border-t border-border bg-card flex gap-2">
            <Input 
              placeholder="Sua dúvida..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="rounded-full"
            />
            <Button size="icon" className="rounded-full shrink-0" onClick={handleSend} disabled={isLoading}>
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}

      <Button
        size="lg"
        className={cn("rounded-full h-14 w-14 p-0 shadow-lg", isOpen && "scale-0 opacity-0")}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle size={28} />
      </Button>
    </div>
  );
};
