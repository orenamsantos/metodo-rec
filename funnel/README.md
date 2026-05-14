# Funil — Quiz Diagnóstico Método R.E.C.

> **Nota:** o código real da aplicação vive em [`src/`](../src/) na raiz do repo. Esta pasta contém apenas a documentação do funil. O monolito antigo `Quiz.jsx` foi quebrado em componentes modulares — veja a estrutura abaixo.

## Estrutura do código (em `src/`)

```
src/
├── main.jsx                 # Entry point — React + BrowserRouter
├── App.jsx                  # Roteamento (/, /upsell, /downsell, /acceso)
├── theme.js                 # Paleta `c` + GRAIN texture
├── components/              # Reutilizáveis
│   ├── Layout.jsx           # Wrapper com background + grain + keyframes
│   ├── FadeIn.jsx
│   ├── Em.jsx
│   ├── PrimaryButton.jsx
│   ├── BuyButton.jsx
│   ├── GhostButton.jsx
│   ├── OptionCard.jsx
│   ├── ScreenTitle.jsx
│   └── ProgressBar.jsx
├── screens/                 # Telas internas do Quiz (0-13)
│   ├── Landing.jsx          # Tela 0
│   ├── Q1.jsx ... Q5.jsx    # Telas 1, 2, 4, 6, 7
│   ├── Interrupt.jsx        # Tela 3
│   ├── VideoMiddle.jsx      # Tela 5
│   ├── Capture.jsx          # Tela 8
│   ├── Loading.jsx          # Tela 9
│   ├── Result.jsx           # Tela 10
│   ├── PriceAnchor.jsx      # Tela 11
│   ├── Offer.jsx            # Tela 12
│   └── Checkout.jsx         # Tela 13
└── pages/                   # Rotas
    ├── Quiz.jsx             # Rota / → orquestra screens 0-13
    ├── Upsell.jsx           # Rota /upsell → Tela 14
    ├── Downsell.jsx         # Rota /downsell → Tela 15
    └── Acceso.jsx           # Rota /acceso → Tela 16
```

## Rotas

| URL | Tela(s) | Função |
|---|---|---|
| `/` | 0-13 (Landing → Checkout) | Quiz diagnóstico completo |
| `/upsell` | 14 | 30 Cartas y Guiones — $47 |
| `/downsell` | 15 | 7 Guiones Críticos — $27 (se rejeitar upsell) |
| `/acceso` | 16 | Thank You · Acceso liberado |

## As 17 telas

| # | Tela | Propósito |
|---|---|---|
| 0 | **Landing** | Hero + social proof + CTA pra iniciar diagnóstico |
| 1 | **Q1: Tempo** | Há quanto tempo sente que algo mudou |
| 2 | **Q2: Sentimientos (multi)** | Marcar todas as dores que sente hoje |
| 3 | **Interrupción Emocional** | "73,4% de las mujeres como tú... no estás sola" |
| 4 | **Q3: Conversaciones** | Já tentou conversar abertamente |
| 5 | **Video Especialista** | HeyGen 3min — apresenta o método antes das últimas perguntas |
| 6 | **Q4: Compromiso** | Se houvesse um caminho comprovado, se comprometeria |
| 7 | **Q5: Urgencia** | Quanto tempo aguenta assim |
| 8 | **Captura WhatsApp** | Nome + telefone (com código país) |
| 9 | **Loading Análisis** | Teatro de autoridade — 4 etapas de "análise" |
| 10 | **Resultado: Zona Crítica** | Perfil "Bloqueo de Conexión Emocional" |
| 11 | **Anclaje de Precio** | Comparativo de custos: terapia, divórcio |
| 12 | **Oferta + VSL** | Caixa premium com stack de valor, garantia, depoimentos |
| 13 | **Checkout + Order Bump** | Iframe Hotmart/Kiwify + bump $19 |
| 14 | **Upsell** | 30 Cartas y Guiones por $47 |
| 15 | **Downsell** | 7 Guiones Críticos por $27 |
| 16 | **Thank You** | Acesso liberado + próximos passos |

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

Build de produção:
```bash
npm run build
npm run preview
```

## Dependências principais

- **React 18+**
- **React Router DOM 6+** — roteamento SPA
- **Vite 5+** — build tool
- **Fraunces + Manrope** (Google Fonts CDN, preload em `index.html`)
- Sem libs de UI externas — todo CSS é inline via `theme.js`

## Configurações importantes

### `REVEAL_DELAY_MS` em `src/screens/Offer.jsx`

Constante que controla quanto tempo o usuário "assiste" antes de o plano completo + caixa de oferta aparecerem.

```js
const REVEAL_DELAY_MS = 5000; // 5 segundos para teste
```

**Em produção:**
- VSL de 4 min → ~150000 ms (2:30)
- VSL de 6 min → ~240000 ms (4:00)

### Estado do quiz

Único `useState` chamado `a` (answers) em `src/pages/Quiz.jsx`:
- `timeAgo`, `feelings[]`, `triedTalking`, `commitment`, `timeLeft`
- `name`, `phone` (capturados na Tela 8)

Não há persistência em localStorage — recarregar perde tudo. Para enviar pra CRM/webhook ver [INTEGRATION.md](./INTEGRATION.md).

## Otimizações aplicadas

- **Lazy load** de `Upsell`, `Downsell`, `Acceso` (não carregadas até navegação)
- **Manual chunks** em `vite.config.js` separando vendor (react/react-router) do app
- **Preconnect** + preload de fontes Google em `index.html`
- **`vercel.json`** com cache imutável em `/assets/*` e rewrite SPA pra todas as rotas
- **Suspense fallback** sem flash (null) durante lazy loading

## Notas de design

- Paleta editorial dark warm dourada — ver [design-system.md](./design-system.md)
- Animações: fadeUp, pulse, shimmer, glow-pulse, price-shimmer (definidas em `Layout.jsx`)
- Mobile-first: max-width 640px, `clamp()` em fontes
- Barra de progresso aparece nas telas 1-8 (etapas 1 de 8 → 8 de 8)
