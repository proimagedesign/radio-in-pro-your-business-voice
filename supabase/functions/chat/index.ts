import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('VITEOPENROUTERAPIKEY')}`,
        'HTTP-Referer': 'https://radioinpro.com.br', // Opcional, mude se desejar
        'X-Title': 'Rádio In-Pro', // Opcional
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini', // Ou outro modelo disponível no OpenRouter
        messages: [
          {
            role: 'system',
            content: `Você é o PRO-Bot, o consultor oficial de IA da RÁDIO IN-PRO. Seu objetivo é ajudar potenciais clientes a entenderem os benefícios da rádio interna e converter o interesse em vendas ou testes.

            INFORMAÇÕES CRUCIAIS:
            1. Nome: RÁDIO IN-PRO.
            2. O que fazemos: Marketing sensorial para o ponto de venda através de rádio interna personalizada, música estratégica, locução profissional e campanhas que influenciam a decisão de compra.
            3. Planos e Preços:
               - Bronze: R$ 289/mês (1 oferta/semana, Player Web, Vinhetas, Suporte por E-mail).
               - Prata: R$ 489/mês (2 ofertas/semana, Player Web, Vinhetas, Spots Sazonais, Suporte por WhatsApp). É o mais popular.
               - Ouro: R$ 789/mês (4 ofertas/semana, Player Web, Vinhetas, Spots Sazonais, Setup de Som completo, Suporte Prioritário 24h).
            4. Entrega: Conteúdos atualizados em até 24 horas.
            5. Instalação Rápida: Oferecemos um teste de 30 dias onde deixamos o sistema rodando no ambiente interno da loja em até 24h.
            6. Público-alvo: Supermercados, farmácias, lojas de moda, eletro, franquias e qualquer varejo que queira vender mais.
            7. Tom de voz: Profissional, enérgico, persuasivo, mas sempre prestativo e educado.
            8. CTA: Sempre que apropriado, incentive o usuário a preencher o formulário de "Instalação Rápida" no final da página para testar por 30 dias.

            Responda sempre em Português do Brasil. Mantenha as respostas concisas e focadas em converter o cliente.`
          },
          ...messages
        ],
      }),
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    return new Response(JSON.stringify({ text: botMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
