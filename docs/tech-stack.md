# Tech Stack

Todas as ferramentas usadas no projeto, com versões recomendadas e papel de cada uma.

## Frontend do funil

| Ferramenta | Versão | Papel |
|---|---|---|
| **React** | 18+ | Componente do quiz (`Quiz.jsx`) |
| **Vite** | 5+ | Build tool recomendado (alternativa: Next.js / Webflow embed) |
| **Fraunces** | Variable | Fonte display (Google Fonts CDN) |
| **Manrope** | Variable | Fonte body (Google Fonts CDN) |

**Notas:**
- O componente não usa nenhuma biblioteca CSS externa (Tailwind, MUI, etc.) — tudo inline
- Hooks usados: `useState`, `useEffect`
- Pode ser embutido em **Vite**, **Next.js**, **Webflow** (via custom embed), **Framer** ou plataforma de quiz como **Involve.me**

## IA — Vídeo

| Ferramenta | Plano | Papel |
|---|---|---|
| **HeyGen** | Creator $30/mês | Avatar da especialista (Tela 5 + VSL Tela 12) |
| **Veo3** | Acesso via API | B-roll cinematográfico (cutaways de mulheres pensativas) |
| **Sora** | Opcional, OpenAI Plus | Alternativa pra b-roll se Veo3 indisponível |
| **CapCut / DaVinci Resolve** | Free | Edição final dos vídeos |

## IA — Áudio

| Ferramenta | Plano | Papel |
|---|---|---|
| **ElevenLabs** | Creator $22/mês | Narração em espanhol neutro (audiolibro + áudios guiados + VSL voz) |
| **Voz recomendada** | Lucía ou Valentina | Espanhol neutro, tom íntimo |
| **Audacity** | Free | Edição/limpeza dos áudios |
| **Epidemic Sound** | $15/mês | Música de fundo (piano minimalista) |

## IA — Imagens

| Ferramenta | Plano | Papel |
|---|---|---|
| **Midjourney** | Standard $30/mês | Capas dos produtos + retratos pros depoimentos |
| **Canva Pro** | $13/mês | Diagramação de todos os PDFs (ebook, planner, bônus) |

## Plataforma de venda

| Ferramenta | Custo | Papel |
|---|---|---|
| **Hotmart** | Grátis + 9.9% + R$1/venda | Plataforma principal (LATAM forte) |
| **Kiwify** | Grátis + 4.99-9.99% | Alternativa (foco Brasil) |
| **Stripe** (futuro) | 2.9% + $0.30 | Quando escalar pra mercados globais |

**Por que Hotmart:** maior penetração LATAM, suporte espanhol, área de membros nativa, one-click upsell, webhooks robustos.

## Email marketing

| Ferramenta | Plano inicial | Plano de escala |
|---|---|---|
| **Mailerlite** | $15-30/mês (até 1k subs) | até 10k subs $50-100/mês |
| **ConvertKit** (alternativa) | $30+/mês | $80-150/mês |
| **ActiveCampaign** (futuro) | $50+/mês | $150-300/mês com CRM avançado |

## WhatsApp

| Ferramenta | Custo | Papel |
|---|---|---|
| **Z-API** | $10-30/mês | Início — número WhatsApp normal |
| **API oficial Meta WhatsApp Business** | $0.005-0.015 por conversa | Escala |

## Tráfego

| Plataforma | Foco |
|---|---|
| **Meta Ads Manager** | Principal — Facebook + Instagram |
| **TikTok Ads Manager** | Secundário — escala futura |
| **Kwai for Business** | Terciário — LATAM forte |
| **Google Ads** | Search + YouTube (volume baixo, qualidade alta) |

## Analytics / Tracking

| Ferramenta | Plano | Papel |
|---|---|---|
| **Meta Pixel + CAPI** | Free | Tracking de conversões Facebook/Instagram |
| **TikTok Pixel** | Free | Tracking TikTok |
| **Google Analytics 4** | Free | Análise comportamental geral |
| **Hotjar / Microsoft Clarity** | Free tier | Heatmaps + recordings (UX do quiz) |
| **TripleWhale / Hyros** | $150+/mês | Atribuição multi-canal (quando >$500/dia ad spend) |

## Infraestrutura

| Ferramenta | Plano | Papel |
|---|---|---|
| **Vercel** | Free / Pro $20 | Hospedagem do funil React |
| **Cloudflare** | Free | CDN, DNS, segurança |
| **Domain** | $12/ano | `.com` ou `.shop` |

## Backup / armazenamento

| Ferramenta | Plano | Papel |
|---|---|---|
| **Dropbox** | $12/mês | Backup dos produtos PDF + áudios |
| **Google Drive** | $2/mês (100GB) | Trabalho colaborativo |
| **GitHub** | Free | Versionamento do código + docs |

## Total mensal estimado

| Categoria | Custo mensal |
|---|---|
| HeyGen Creator | $30 |
| ElevenLabs Creator | $22 |
| Midjourney Standard | $30 |
| Canva Pro | $13 |
| Email tool (início) | $20 |
| WhatsApp (Z-API) | $20 |
| Epidemic Sound | $15 |
| Vercel + domínio | $4 (amortizado) |
| Backup | $14 |
| **Total ferramentas** | **~$170/mês** |

**Tráfego à parte** — começar com $300-500/mês em ads pra validar.

## Stack opcional avançada

Quando faturar > $10k/mês:

- **Hyros** ($150-300/mês) — atribuição precisa
- **ActiveCampaign** ($150-300/mês) — CRM + email + automações
- **Make / Zapier** ($30-60/mês) — orquestração
- **Mixpanel** ($50+/mês) — analytics produto
- **Loom** (free) — vídeos internos pra time
