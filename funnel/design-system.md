# Design System — Método R.E.C.

Sistema visual editorial premium: dark warm com ornamentos dourados sutis. Sensação de "boutique terapêutica" — não parece mais um lançamento agressivo de infoproduto.

## Paleta de cores

Todos os tokens vivem no objeto `c` no topo de `Quiz.jsx`.

### Backgrounds

| Token | Hex | Uso |
|---|---|---|
| `bg` | `#241813` | Background principal — base de todas as telas |
| `bgSoft` | `#332218` | Cards secundários, hover states sutis |
| `bgDeep` | `#1a0f0a` | Bordas inferiores, áreas mais profundas |
| `bgWarm` | `#3a2620` | Caixas premium, oferta, garantia |

### Dourados (acentos principais)

| Token | Hex | Uso |
|---|---|---|
| `gold` | `#d4a574` | Cor de marca principal — botões, headlines, ícones |
| `goldBright` | `#f0d4a8` | Hover, highlights, brilho |
| `goldDeep` | `#9a7548` | Gradientes (extremos escuros), profundidade |
| `goldGlow` | `#e8c898` | Subtítulos itálicos, glow secundário |

### Rosa (acento feminino)

| Token | Hex | Uso |
|---|---|---|
| `rose` | `#d4929c` | Downsell, acentos femininos suaves |
| `roseDeep` | `#a86670` | Gradientes do downsell |

### Texto

| Token | Hex | Uso |
|---|---|---|
| `text` | `#faf0e0` | Texto principal — alta legibilidade |
| `textSoft` | `#c4b09e` | Texto secundário, parágrafos descritivos |
| `textDim` | `#8a7868` | Texto terciário, micro-copy, timestamps |

### Bordas

| Token | Hex | Uso |
|---|---|---|
| `border` | `#4a3a30` | Bordas padrão (cards, inputs) |
| `borderSoft` | `#3a2b22` | Divisores internos sutis |
| `borderGold` | `#8a6d4a` | Bordas de caixas premium (oferta, garantia) |

### Estados

| Token | Hex | Uso |
|---|---|---|
| `danger` | `#d18a7a` | Preços riscados, "lo que NO funciona" |
| `success` | `#a8c094` | Confirmações ("✓ Compra Confirmada") |
| `shadow` | `#0a0604` | Box-shadows profundas |

## Tipografia

### Fraunces (display, com itálico)

- **Uso:** headlines (H1, H2), preços, citações, eyebrows itálicos
- **Peso:** 300-600 (variável)
- **Estilo:** principalmente itálico nos elementos editoriais
- **Tamanhos:** `clamp(28px, 6vw, 38px)` para headlines, `clamp(72px, 18vw, 92px)` para preço hero
- **Letter-spacing:** `-0.01em` a `-0.04em` (compactado, editorial)

### Manrope (body)

- **Uso:** todo o texto corrido, botões, labels, inputs
- **Peso:** 300-700
- **Tamanho base:** 14-16px
- **Letter-spacing:** padrão (0), com `0.04em` a `0.3em` em CTAs e eyebrows

### Componente `<Em>`

Span com `color: c.gold` + `fontStyle: italic`. Usado pra destacar palavras-chave dentro de headlines (`<Em>probabilidad real</Em>`, `<Em>algo cambió</Em>`).

## Princípios visuais

1. **Dark warm editorial** — não preto puro, mas tons quentes de marrom escuro. Sensação de couro envelhecido, biblioteca, intimidade.
2. **Ornamentos sutis** — pontos dourados (`·`, `✦`), divisores com gradiente, cantos com borda fina nas caixas premium.
3. **Glow dourado** — shadows com `${c.gold}40` em elementos importantes (preço, botão de compra).
4. **Shimmer e pulse** — botões premium têm `glow-pulse 2.4s` infinito; preço hero tem `price-shimmer 4s`; pontos de loading têm `pulse 1.4s`.
5. **Textura grain** — overlay SVG com noise filtrado, `opacity: 0.4`, `mixBlendMode: overlay`. Dá sensação de print analógico.
6. **Hierarquia tripla de tom** — `text` (alta) → `textSoft` (média) → `textDim` (baixa).

## Animações

Definidas em `<style>` dentro do componente `FadeIn`:

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
@keyframes shimmer { 0% { bg-pos: -200% 0; } 100% { bg-pos: 200% 0; } }
@keyframes glow-pulse { /* sombra dourada pulsante */ }
@keyframes price-shimmer { /* gradiente animado no preço */ }
```

Curva padrão: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out suave).

## Componentes reutilizáveis

| Componente | Função |
|---|---|
| `FadeIn` | Wrapper de animação fadeUp, aceita `delay` |
| `PrimaryButton` | Botão dourado sólido, full-width |
| `BuyButton` | Botão premium com gradiente + glow-pulse infinito |
| `GhostButton` | Botão fantasma underlined, pra "não, obrigado" |
| `OptionCard` | Card de opção do quiz (radio ou checkbox) |
| `ScreenTitle` | Eyebrow + H1, fade animado |
| `Em` | Span dourado itálico inline |

## Mobile-first

- `maxWidth: 640px` no container principal
- `clamp()` em todas as fontes de display
- Padding interno consistente: 24px laterais
- Touch targets: mínimo 44px de altura em todos os botões
