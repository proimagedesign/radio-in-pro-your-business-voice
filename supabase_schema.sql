-- Script SQL para configurar o banco de dados da RÁDIO IN-PRO no Supabase

-- 1. Tabela de Perfis de Usuários
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text,
  company_name text,
  whatsapp text
);

-- 2. Tabela de Leads (Captura de demonstração)
create table leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  company_name text,
  whatsapp text,
  segment text
);

-- 3. Tabela de Pedidos de Gravação
create table orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'cancelled')),
  script text,
  recording_type text,
  notes text
);

-- CONFIGURANDO ROW LEVEL SECURITY (RLS)

alter table profiles enable row level security;
alter table leads enable row level security;
alter table orders enable row level security;

-- Políticas para Profiles
create policy "Usuários podem ver seu próprio perfil." on profiles for select using (auth.uid() = id);
create policy "Usuários podem atualizar seu próprio perfil." on profiles for update using (auth.uid() = id);

-- Políticas para Leads (Qualquer pessoa pode inserir da landing page)
create policy "Qualquer pessoa pode enviar leads." on leads for insert with check (true);

-- Políticas para Orders
create policy "Usuários podem ver seus próprios pedidos." on orders for select using (auth.uid() = user_id);
create policy "Usuários podem criar seus próprios pedidos." on orders for insert with check (auth.uid() = user_id);

-- TRIGGER PARA CRIAR PERFIL AUTOMATICAMENTE NO SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
