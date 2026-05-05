import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "bot" | "user";
  text: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Olá! Sou o PRO-Bot, seu consultor de rádio e voz. Como posso ajudar sua empresa hoje?" }
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
    const newMessages: Message[] = [...messages, { role: "user", text: userMessage }];
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error: functionError } = await supabase.functions.invoke("chat", {
        body: { 
          messages: newMessages.map(m => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.text
          }))
        }
      });
      
      if (functionError) throw functionError;
      if (data.error) throw new Error(data.error);

      const botMessage = data.text;
      setMessages(prev => [...prev, { role: "bot", text: botMessage }]);
    } catch (error: any) {
      console.error("Erro no chatbot:", error);
      toast({
        variant: "destructive",
        title: "Erro no chat",
        description: "Não foi possível obter uma resposta do PRO-Bot agora.",
      });
      setMessages(prev => [...prev, { role: "bot", text: `Erro técnico: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] h-[500px] bg-card border border-border rounded-3xl shadow-elegant flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-4 bg-gradient-dark text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                <Bot size={18} />
              </div>
              <div>
                <p className="font-bold text-sm">PRO-Bot</p>
                <p className="text-[10px] opacity-70">Consultor IA Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 rounded-full" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </Button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-2 max-w-[85%]", m.role === "user" ? "ml-auto flex-row-reverse" : "")}>
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0", m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                  {m.role === "user" ? <User size={12} /> : <Bot size={12} />}
                </div>
                <div className={cn("p-3 rounded-2xl text-sm shadow-sm", m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted rounded-tl-none")}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 max-w-[85%] animate-pulse">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Bot size={12} />
                </div>
                <div className="p-3 rounded-2xl text-sm bg-muted rounded-tl-none">
                  Digitando...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border flex gap-2">
            <Input 
              placeholder="Digite sua dúvida..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="rounded-full bg-secondary/50 border-none focus-visible:ring-1"
            />
            <Button size="icon" className="rounded-full shrink-0" onClick={handleSend} disabled={isLoading}>
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}

      <Button
        size="lg"
        className={cn("rounded-full h-14 w-14 p-0 shadow-accent animate-pulse-gentle", isOpen && "rotate-90 opacity-0 pointer-events-none scale-0")}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle size={28} />
      </Button>
    </div>
  );
};
