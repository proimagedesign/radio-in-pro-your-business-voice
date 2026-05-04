import { createClient } from '@supabase/supabase-js';

// Usamos valores padrão temporários para evitar que a aplicação quebre na inicialização caso as chaves não existam
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase URL ou Anon Key não encontradas. Certifique-se de configurar as variáveis de ambiente.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
