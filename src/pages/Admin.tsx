import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import { LogOut, ShieldCheck } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, loading } = useUserRole();
  const [authChecked, setAuthChecked] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
      else setAuthChecked(true);
    });
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    supabase.from("orders").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setOrders(data ?? []));
    supabase.from("leads").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setLeads(data ?? []));
  }, [isAdmin]);

  if (!authChecked || loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center gap-4">
        <ShieldCheck className="h-12 w-12 text-muted-foreground" />
        <h1 className="text-2xl font-display font-black">Acesso restrito</h1>
        <p className="text-muted-foreground max-w-md">
          Esta área é exclusiva para administradores. Sua conta não tem permissão de admin.
        </p>
        <Button onClick={() => navigate("/dashboard")}>Ir para meu painel</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30 p-6 md:p-10">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-display font-black tracking-tight flex items-center gap-2">
            <ShieldCheck className="text-accent" /> Painel Admin
          </h1>
          <p className="text-muted-foreground">Gestão de pedidos e leads</p>
        </div>
        <Button variant="ghost" onClick={async () => { await supabase.auth.signOut(); navigate("/auth"); }}>
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </Button>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Pedidos ({orders.length})</h2>
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Nenhum pedido ainda.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr><th className="p-3 text-left">Data</th><th className="p-3 text-left">Tipo</th><th className="p-3 text-left">Script</th><th className="p-3 text-left">Status</th></tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="p-3">{new Date(o.created_at).toLocaleString("pt-BR")}</td>
                    <td className="p-3">{o.recording_type}</td>
                    <td className="p-3 max-w-md truncate">{o.script}</td>
                    <td className="p-3"><span className="px-2 py-1 rounded bg-secondary text-xs">{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Leads ({leads.length})</h2>
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {leads.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Nenhum lead ainda.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr><th className="p-3 text-left">Data</th><th className="p-3 text-left">Empresa</th><th className="p-3 text-left">WhatsApp</th><th className="p-3 text-left">Segmento</th></tr>
              </thead>
              <tbody>
                {leads.map(l => (
                  <tr key={l.id} className="border-t border-border">
                    <td className="p-3">{new Date(l.created_at).toLocaleString("pt-BR")}</td>
                    <td className="p-3">{l.company_name}</td>
                    <td className="p-3">{l.whatsapp}</td>
                    <td className="p-3">{l.segment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
};

export default Admin;
