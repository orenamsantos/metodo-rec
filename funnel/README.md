# Funil — Quiz Diagnóstico Método R.E.C.

Componente React único (`Quiz.jsx`) que implementa todo o funil de vendas — da landing à thank you page — em 17 telas sequenciais.

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

Recomendado **Vite + React**:

```bash
npm create vite@latest metodo-rec-funnel -- --template react
cd metodo-rec-funnel
npm install
# Copiar Quiz.jsx para src/
# Em src/App.jsx: import Quiz from './Quiz'; export default () => <Quiz />;
npm run dev
```

Acesse `http://localhost:5173`.

## Dependências

- **React 18+** (hooks: useState, useEffect)
- **Fontes via Google Fonts CDN** — `Fraunces` (display, com itálico) + `Manrope` (body). Carregadas automaticamente pelo componente via `<link rel="stylesheet">` injetado em runtime
- Não usa nenhuma lib externa de UI — todo CSS é inline via objeto `c` de tokens

## Configurações importantes

### `REVEAL_DELAY_MS` na função `Offer`

No componente `Offer` (Tela 12), a constante controla quanto tempo o usuário precisa "assistir" antes do plano completo + caixa de oferta aparecerem.

```jsx
const REVEAL_DELAY_MS = 5000; // 5 segundos para teste
```

**Em produção**, ajustar para o momento em que a VSL apresenta a oferta:
- VSL de 4 min → ~150000 ms (2:30)
- VSL de 6 min → ~240000 ms (4:00)

Linha aproximada: ~820 no `Quiz.jsx`.

### Estado do quiz

Único `useState` chamado `a` (answers) que persiste:
- `timeAgo`, `feelings[]`, `triedTalking`, `commitment`, `timeLeft`
- `name`, `phone` (capturados na Tela 8)

Não há persistência em localStorage — recarregar perde tudo. Para enviar pra CRM/webhook ver [INTEGRATION.md](./INTEGRATION.md).

## Notas de design

- Paleta editorial dark warm dourada — ver [design-system.md](./design-system.md)
- Animações: fadeUp, pulse, shimmer, glow-pulse, price-shimmer
- Mobile-first: max-width 640px, `clamp()` em fontes
- Cada tela faz scroll-to-top automaticamente no mount
- Barra de progresso aparece nas telas 1-8 (etapas 1 de 8 → 8 de 8)
