# Automação — Pós-Compra

Sequências automatizadas que rodam após a compra do frontend ou da esteira completa.

## Objetivos

1. **Reduzir refund** — engajar comprador imediatamente
2. **Aumentar consumo do produto** — quem aplica fica feliz (e dá depoimento)
3. **Aumentar LTV** — cross-sell "Reconexión Íntima" em D+14 ou D+30
4. **Capturar feedback** — pra UGC e melhoria do produto

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| [email-sequence-post-purchase.md](./email-sequence-post-purchase.md) | 7 emails ao longo de 30 dias |
| [whatsapp-sequence.md](./whatsapp-sequence.md) | 3-4 mensagens estratégicas em paralelo |
| [cross-sell-reconexion-intima.md](./cross-sell-reconexion-intima.md) | Produto $37 ofertado D+14/D+30 |

## Stack técnica

- **Email:** Mailerlite ($15-30/mês inicialmente) ou ConvertKit ($30+/mês quando escalar)
- **WhatsApp:** Z-API ($10-30/mês) ou API oficial Meta WhatsApp Business
- **Trigger:** webhook do Hotmart → adiciona ao Mailerlite com tag `comprador_frontend`

## Tags do CRM

- `lead_quiz` — captura na Tela 8 (não comprou)
- `comprador_frontend` — comprou os $27
- `comprador_bump` — incluiu order bump
- `comprador_upsell` — incluiu upsell
- `comprador_downsell` — incluiu downsell
- `refund_pendente` — solicitou reembolso
- `cross_sell_aceito` — comprou Reconexión Íntima
- `aplicou_30d` — confirmou ter aplicado 30 dias completos (pesquisa)

## Princípios das sequências

1. **Personalização** — primeiro nome em assunto e abertura
2. **Brevidade** — nenhum email > 250 palavras
3. **Plain text** — sem templates HTML pomposos (chega mais como amiga)
4. **CTA único** — cada email tem 1 ação principal
5. **Histórias** — abrir com mini-cenas, não com "olá, espero que esteja bem"
6. **Sem assinatura corporativa** — assina como "Lucía" ou nome da especialista
