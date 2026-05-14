# Estratégia de Tráfego

Onde rodar, como segmentar, quais criativos testar.

## Mix de canais

| Canal | % de budget | Maturidade da persona | CPA esperado |
|---|---|---|---|
| **Meta Ads** (FB + IG) | 60-70% | Alta — persona vive no Instagram | $12-18 |
| **TikTok Ads** | 15-25% | Crescendo — 35-50 LATAM | $8-14 |
| **Kwai** | 10-15% | Forte México/Brasil/Peru | $6-12 |
| Google Ads (search) | 0-5% | Volume baixo, qualidade alta | $15-25 |
| YouTube Ads | 0-5% | Testar VSL pré-roll quando escalar | $14-20 |

**Início:** rodar SÓ Meta Ads nos primeiros 30 dias pra validar. Depois adicionar TikTok/Kwai gradualmente.

## Meta Ads — setup

### Objetivo de campanha

**Conversões** (não tráfego). Otimizar pra evento "Purchase" via Pixel + CAPI.

Se volume < 50 compras/semana, otimizar pra "InitiateCheckout" e migrar pra Purchase quando bater volume.

### Estrutura de contas

```
Campanha: Conversion — Frontend US$27
├── Adset 1: Cold Broad LATAM 35-55 (Mulheres)
├── Adset 2: Cold Interesses ("relacionamiento", "psicología de pareja")
├── Adset 3: Lookalike 1% de compradores (após ter 200+)
├── Adset 4: Lookalike 1% de leads (Tela 8 captura)
└── Adset 5: Retargeting 7d (visitou oferta, não comprou)
```

### Segmentação

**Geo:** México, Colômbia, Argentina, Peru, Chile, Equador, Uruguai, Rep. Dominicana. EXCLUIR Espanha (linguagem ≠).

**Idade:** 35-55 (pico 38-48)

**Gênero:** Mulheres apenas

**Interesses (para Adset 2):**
- Terapia de pareja
- Relaciones interpersonales
- Psicología
- Maternidad
- Bodas (proxy de "casada")
- Família

**Comportamentos:** compradores online ativos.

### Limites importantes

- **Início:** $10-15/dia/adset
- **Após validação:** duplicar a cada 3-4 dias se CPA estável
- **Teto técnico:** Meta começa a inflacionar CPM após $300/dia/adset — partir pra novos públicos/criativos

## Ângulos de criativo

### Ângulo 1 — Identificação com dor

**Hook (3 primeiros segundos):**
> "Si te sientes invisible para tu esposo, este video es para ti."

**Estrutura:**
- 0-3s: hook direto na dor
- 3-15s: lista 3-4 sintomas específicos
- 15-30s: "no es lo que crees — hay un bloqueo específico"
- 30-45s: convite ao quiz diagnóstico
- 45-60s: CTA "Hacer mi diagnóstico gratis"

### Ângulo 2 — Erro comum

**Hook:**
> "El error que el 73% de las mujeres comete cuando su marido se aleja..."

Sub-estrutura:
- Apresenta erro comum (dar espaço, falar mais)
- Explica por que piora
- Bridge pra método correto
- CTA quiz

### Ângulo 3 — Especialista (HeyGen avatar)

**Hook:**
> "Soy terapeuta de parejas y voy a contarte algo que casi nadie cuenta..."

Avatar HeyGen direto pra câmera. Funciona muito bem em audiências mais frias — autoridade visual.

### Ângulo 4 — Depoimento real (UGC)

**Hook:**
> "Mi marido y yo estábamos a punto de divorciarnos. Hasta que probé esto..."

Mulher real (atriz contratada via Fiverr/UGC platforms) falando em câmera, qualidade celular. CPA mais baixo historicamente — mas vida útil curta (fadiga rápida).

### Ângulo 5 — Descoberta (story-driven)

**Hook:**
> "Lo que descubrí cuando revisé el celular de mi esposo..."

Conta uma história. Mais longo (60-90s). Funciona em audiências mais maduras.

## Hooks de teste (primeiros 3s)

Testar pelo menos 6-8 hooks por ângulo:

- "Si tu esposo está distante..."
- "Deja de dar espacio — no funciona."
- "El error #1 cuando él se aleja..."
- "Mi marido no me toca hace 8 meses."
- "Soy terapeuta y voy a decirte algo difícil..."
- "73% de las mujeres se equivocan en este momento."
- "Lo descubrí cuando empezó a llegar tarde..."
- "No es falta de amor — es un bloqueo."

## Formato dos ads

### Vídeo (preferencial)

- **Aspect ratio:** 9:16 (Reels, Stories, TikTok)
- **Duração:** 15-60s (testar 30s primeiro)
- **Legendas:** SEMPRE (90% assistem mudo)
- **Áudio:** voz feminina espanhol neutro (ElevenLabs)
- **B-roll:** Veo3, Pexels, ou UGC

### Estático (suporte)

- Carrossel com 5-7 imagens (Midjourney) contando a história
- Imagem única com headline grande + foto da especialista

## Termos sensíveis (Meta)

Cuidado com:
- "Traición", "engaño", "amante" → revisar criativo
- "Divorcio" → tolerável se em contexto preventivo
- "Sexo" → usar "intimidad" no lugar
- "Salvar matrimonio" → permitido, mas suaviza com "reconectar"

**Estratégia:** escrever versão "segura" pra ads aprovados e versão "agressiva" só pra landing/quiz interno.

## Retargeting

**Audiências quentes:**
1. Visitou landing, não iniciou quiz — 7 dias
2. Iniciou quiz, não finalizou — 7 dias
3. Capturou (Tela 8), não comprou — 14 dias
4. Compradores — exclude de tudo + cross-sell em 30d

**Criativo de retargeting:** depoimentos + garantia + última chamada. Não repete o ângulo do top of funnel.

## TikTok Ads (após validar Meta)

- Formato: 9:16, 15-30s
- Estilo: orgânico (não polido), close em rosto, texto sobreposto
- CTA: "Link en bio" → bio do perfil TikTok com link pro quiz
- Ou: TikTok Spark Ads (boost orgânicos virais)

## Kwai (forte LATAM)

- Plataforma Kwai for Business
- CPM baixíssimo
- Persona feminina madura concentrada lá
- Testar último (após Meta + TikTok validados)

## Cronograma realista

| Semana | Atividade |
|---|---|
| 1-2 | Setup Meta + Pixel + CAPI + 5 criativos iniciais |
| 3-4 | Validação Meta cold ($10-15/dia/adset) |
| 5-6 | Identificar criativos vencedores, scaling |
| 7-8 | Adicionar TikTok Ads |
| 9-10 | Adicionar Kwai |
| 11-12 | UGC creator network (Fiverr/Insense) — 10 novos creators/mês |

## Indicadores de fadiga de criativo

- CTR cai 30%+ vs primeira semana
- CPM sobe 50%+
- Frequency > 3.0 em retargeting (> 1.8 em cold)
- CPA > meta por 5 dias seguidos

→ Trocar criativo / refresh
