# Método R.E.C.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-d4a574?style=flat-square)
![Idioma](https://img.shields.io/badge/idioma-Espa%C3%B1ol%20LATAM-9a7548?style=flat-square)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20AI-3a2620?style=flat-square)

> Funil de vendas em espanhol neutro LATAM para o nicho de "salvar casamento" — quiz diagnóstico interativo + esteira de produtos digitais.

## Visão geral

O **Método R.E.C.** (Reconexión · Encantamiento · Compromiso) é um sistema digital de 30 dias para mulheres latino-americanas (35-55 anos) em crise conjugal. O funil é um quiz de 17 telas que diagnostica o "bloqueio invisível" da relação, ancora preço com expectativa terapêutica, e converte em um ebook + bônus a $27 USD com order bump, upsell e downsell.

## Stack tecnológica

| Camada | Ferramentas |
|---|---|
| Frontend funil | React 18, Fraunces + Manrope (Google Fonts) |
| Vídeo IA | HeyGen (avatar), Veo3 (b-roll), Sora (opcional) |
| Áudio IA | ElevenLabs (espanhol neutro, voz feminina) |
| Imagens | Midjourney v6+ |
| Plataforma venda | Hotmart ou Kiwify |
| Email | Mailerlite / ConvertKit / ActiveCampaign |
| WhatsApp | API oficial Meta ou Z-API |
| Tráfego | Meta Ads, TikTok Ads, Kwai |

## Estrutura

```
metodo-rec/
├── funnel/        # Componente React do quiz + integração
├── copy/          # Toda a copy do funil, organizada por tela
├── strategy/      # Pricing, persona, psicologia, metas
├── products/      # Briefs dos 8 produtos da esteira
├── automation/    # Sequências de email e WhatsApp
└── docs/          # Tech stack, ferramentas, roadmap, glossário
```

## Esteira de produtos

| Posição | Produto | Preço |
|---|---|---|
| Frontend | Ebook Método R.E.C. + Planner + 3 bônus | **$27** |
| Order bump | Audiolibro + 5 áudios guiados | **+$19** |
| Upsell | 30 Cartas y Guiones | **+$47** |
| Downsell | 7 Guiones Críticos | **+$27** |

**Stack de valor declarado:** $207 → preço $27 (87% de desconto).

## Métricas-alvo

- **Ticket médio esperado:** $45-65 USD (com 30% bump + 15% upsell)
- **CPA-alvo:** $10-15 USD
- **ROAS-alvo:** 3x+ no D7, 5x+ no D30
- **Quiz completion:** 40-60%
- **Resultado → Compra:** 4-8% (cold traffic)

## Status atual

- [x] Funil React (17 telas) pronto e funcional
- [x] Estrutura de pastas e documentação no GitHub
- [ ] Produtos: ebook, planner, bônus em criação
- [ ] Vídeos HeyGen + ElevenLabs em produção
- [ ] Setup Hotmart + integrações
- [ ] Beta com $10/dia em Meta Ads

## Próximos passos

1. Finalizar conteúdo do ebook principal (3 fases × 10 dias)
2. Gravar VSL no HeyGen (4-6 min) e vídeo da especialista (3 min)
3. Configurar checkout Hotmart com order bump, upsell e downsell
4. Conectar webhook + CRM + email marketing
5. Lançar beta com $10/dia para validar conversão

## Idioma do produto

Todo o conteúdo do funil e dos produtos é em **espanhol neutro LATAM** — sem regionalismos fortes de Espanha, México, Argentina ou Colômbia. Tom editorial premium, feminino, autoridade terapêutica.

## Licença

MIT — ver [LICENSE](./LICENSE).
