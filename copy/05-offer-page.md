# Tela 12 — Oferta + VSL

Tela mais importante do funil. Estrutura: VSL → mensagem de "espera o vídeo" → após delay, revela stack de valor + depoimentos + caixa de preço + garantia.

## Header (sempre visível)

**Eyebrow centralizado:** `Tu Plan · Método R.E.C.`

**Headline:**
> El camino para mujeres en *Zona Crítica*

## VSL (sempre visível)

Vídeo 4-6 minutos, aspect ratio 16/9. Placeholder no JSX mostra:
- Player com play button dourado
- `[ VSL DE OFERTA ]`
- `4-6 min · Avatar HeyGen presenta el método`

Roteiro completo em [06-vsl-script.md](./06-vsl-script.md).

## Estado oculto (antes do reveal)

Enquanto `REVEAL_DELAY_MS` não foi atingido, mostra caixa:

> *Mira el video hasta el final.*
>
> Tu plan completo aparece automáticamente cuando llegues a la parte importante.

(Com 3 pontos dourados pulsantes no rodapé da caixa.)

## Estado revelado — Stack de valor

**Headline da seção:** `Lo que recibes hoy:`

### Item 01 — Ebook "Método R.E.C." completo

**Descrição:**
> El paso a paso de las 3 fases para reavivar la conexión emocional en 30 días. 120 páginas, sin relleno.

**Valor riscado:** $97

### Item 02 — Planner Diario de 30 días

**Descrição:**
> Workbook con ejercicios paso a paso, espacios para registrar avances y reflexiones diarias.

**Valor riscado:** $47

### Item 03 — Bonus 1: Guía de Primeros Auxilios Emocionales

**Descrição:**
> Qué hacer en las primeras 72 horas si la situación está crítica. Para aplicar HOY mismo.

**Valor riscado:** $27

### Item 04 — Bonus 2: Mapa de Comunicación de Pareja

**Descrição:**
> Infografía PDF que identifica los 5 estilos de comunicación y cómo adaptarte al de él.

**Valor riscado:** $19

### Item 05 — Bonus 3: Calendario Visual de la Reconexión

**Descrição:**
> Tu progreso en una sola página. Imprimible, para pegar en un lugar visible cada día.

**Valor riscado:** $17

### Total

**Label:** `Valor total`
**Valor riscado em vermelho:** **$207**

## Seção depoimentos

**Eyebrow centralizado:** `Quien ya aplicó`

### Depoimento 1

> "En 23 días, mi marido me invitó a cenar fuera por primera vez en más de un año. Lloré."
>
> **Marina S.** · Casada hace 8 años · Colombia

### Depoimento 2

> "Estaba a punto de pedir el divorcio. Hoy estamos empezando de nuevo — y está MEJOR que antes."
>
> **Camila R.** · Casada hace 11 años · México

### Depoimento 3

> "El método es diferente. No es 'darle espacio' ni 'valorarte'. Es algo que nadie habla en otro lado."
>
> **Leticia M.** · Casada hace 6 años · Argentina

(Cada depoimento tem placeholder pra foto: `[ Foto del testimonio — Midjourney o real ]`)

## Caixa de oferta premium

**Linha decorativa superior:** `── ✦ ──`

**Eyebrow:** `Oferta del Diagnóstico`

**Texto pequeno (Fraunces itálico):** `De`

**Valor riscado:** `$207`

**Eyebrow dourado:** `Hoy, por solo`

**PREÇO HERO:** **$27** (com shimmer animado, gradiente dourado)

**Subtítulo itálico:** `o en 12 cuotas sin interés`

**Pill dourado:**
> Equivale a **menos del 25%** de una sesión de terapia

**CTA premium (BuyButton):**
```
Acceder al Método
```
Subtítulo do botão: `Acceso inmediato · Sin compromiso`

**Trust signals:**
- 🔒 Pago seguro
- ⚡ Acceso al instante
- ✓ Garantía 30 días

## Caixa de garantia

**Ícone:** check dourado em círculo com glow

**Eyebrow:** `Garantía Blindada`

**Headline (Fraunces itálico):**
> 30 días para probarlo, *sin riesgo.*

**Texto:**
> Aplica el método completo. Si no sientes ningún cambio en la conexión, escríbenos y te devolvemos el 100%. Sin preguntas, sin papeleo.

## Notas

- Stack de valor: 5 itens × valores fictícios somam $207. Manter consistência com os preços individuais riscados
- Itens listados com número itálico dourado (01-05) e valor riscado em cinza
- Caixa de oferta tem 4 ornamentos de canto (borda dourada fina nos 4 cantos)
- Preço hero ($27) tem animação `price-shimmer 4s` infinita
- BuyButton tem `glow-pulse 2.4s` infinito (sombra dourada respirando)
- Reveal controlado por `REVEAL_DELAY_MS` (default 5000ms — ajustar pra match com a VSL)
