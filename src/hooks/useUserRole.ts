import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "admin" | "user";

export function useUserRole() {
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async (userId: string | undefined) => {
      if (!userId) {
        if (mounted) { setRole(null); setLoading(false); }
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      if (!mounted) return;
      const roles = (data ?? []).map((r: any) => r.role as AppRole);
      setRole(roles.includes("admin") ? "admin" : roles[0] ?? "user");
      setLoading(false);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      load(session?.user?.id);
    });
    supabase.auth.getSession().then(({ data }) => load(data.session?.user?.id));

    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  return { role, loading, isAdmin: role === "admin" };
}
