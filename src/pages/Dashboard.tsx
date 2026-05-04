import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { PlusCircle, Music, LogOut, LayoutDashboard, User } from "lucide-react";
import { OrderForm } from "@/components/OrderForm";

const Dashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) navigate("/auth");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-6 flex flex-col gap-8 hidden md:flex">
        <div className="flex items-center gap-2 font-display font-black text-xl tracking-tighter">
          <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center text-accent-foreground text-xs">
            RP
          </div>
          RÁDIO IN-PRO
        </div>

        <nav className="flex-1 space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3 bg-secondary/50">
            <LayoutDashboard size={20} />
            Painel Geral
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Music size={20} />
            Minhas Gravações
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <User size={20} />
            Perfil
          </Button>
        </nav>

        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleSignOut}>
          <LogOut size={20} />
          Sair
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-display font-black tracking-tight">Seu Painel</h1>
            <p className="text-muted-foreground">Olá, {session?.user?.email}</p>
          </div>
          <Button className="gap-2 shadow-accent" onClick={() => setIsOrderFormOpen(true)}>
            <PlusCircle size={20} />
            Novo Pedido
          </Button>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Status Cards */}
          <div className="bg-card p-6 rounded-2xl border border-border shadow-soft">
            <p className="text-sm text-muted-foreground mb-1">Pedidos Ativos</p>
            <p className="text-4xl font-display font-black">0</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border shadow-soft">
            <p className="text-sm text-muted-foreground mb-1">Gravações Prontas</p>
            <p className="text-4xl font-display font-black">0</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border shadow-soft">
            <p className="text-sm text-muted-foreground mb-1">Plano Atual</p>
            <p className="text-xl font-display font-black uppercase text-accent">Nenhum</p>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-bold mb-6">Pedidos Recentes</h2>
          <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
            <div className="p-12 text-center text-muted-foreground">
              <Music className="mx-auto mb-4 opacity-20" size={48} />
              <p>Você ainda não tem pedidos de gravação.</p>
              <Button variant="link" className="mt-2 text-primary" onClick={() => setIsOrderFormOpen(true)}>
                Fazer meu primeiro pedido
              </Button>
            </div>
          </div>
        </section>

        {isOrderFormOpen && (
          <OrderForm onClose={() => setIsOrderFormOpen(false)} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
