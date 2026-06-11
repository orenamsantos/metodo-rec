# Landing Método R.E.C. — redesign Warm Editorial

**Data:** 2026-06-11 · **Aprovado por:** Flavio (mockup A, rodada 1, visual companion)

## Objetivo

Elevar a tela de entrada do quiz (`src/screens/Landing.jsx`) de texto puro para uma
identidade visual completa, aumentando a taxa de início do quiz com tráfego frio de
Meta (mulher 35-55, LATAM, mobile). Decisão de rota: upgrade da entrada do quiz
(não advertorial, não página de vendas) — ad→quiz direto é o padrão vencedor do
formato em LATAM.

## Design system

**Warm Editorial** (biblioteca curada do Open Design, `~/open-design/app/resources/open-design/design-systems/warm-editorial/DESIGN.md`):

- Fundo papel quente `#FAF7F2` · texto `#1C1A17` (nunca preto puro)
- Acento primário terracota `#C0512F` (CTA + 1 elemento de destaque por tela, máx)
- Acento secundário verde-floresta `#2F5B4F` (bordas de card a 8-12% de opacidade)
- Neutro quente `#8A817A` (metadados, bylines)
- Superfície elevada `#FFFFFF` (só cards)
- Display: Fraunces (já carregada no app), peso 400, tracking -0.015em, itálico
  apenas no destaque da headline · Corpo: Manrope
- Botões: fill chapado, radius 12px · Cards: radius 12-16px, borda 1px
  forest-8%, sombra só em card · Proibido: gradientes, glassmorphism, radius >24px

## Estrutura da tela (mockup aprovado, de cima pra baixo)

1. Eyebrow terracota uppercase: `MÉTODO R.E.C. · DIAGNÓSTICO`
2. Byline serif itálico: `Por la Dra. Sofía Restrepo · Terapeuta de pareja`
3. **Headline (nova, ângulo do vilão):** `Él no se está alejando. Está` *`probando`*
   `si todavía le importas.` — itálico terracota em "probando". Substitui
   "Tu matrimonio no se está rompiendo..." pela voz de prova aprovada.
4. Subtexto: nomeia o ciclo **"se aleja y vuelve"** como patrón com nome + os
   **3 patrones** + promessa de descoberta em **90 segundos**.
5. Card de depoimento (superfície branca, borda forest-8%): estrelas 4.9 ·
   12.847 mujeres + quote da Camila R. (México) + foto existente
   (`/images/retratos/camila-mexico-47.png`).
6. CTA terracota cheio: `Quiero entender qué pasa →` + linha de fricção-zero
   (`90 segundos · 100% confidencial · Sin registro inicial`).
7. Faixa social atual mantida: `+9.000 mujeres en los últimos 30 días` + avatares.

## Restrições (invariantes)

- Só `src/screens/Landing.jsx` muda. Fluxo `onStart`→Q1, componente `FadeIn`,
  e qualquer tracking permanecem intactos.
- Tokens do Warm Editorial **escopados na Landing** (constantes locais);
  `ThemeContext` global não muda (redesign das outras 16 telas = projeto separado).
- A tela precisa funcionar nos dois temas do app sem quebrar (a Landing passa a
  impor o fundo papel localmente, ignorando o tema escuro APENAS nesta tela —
  decisão consciente: warm editorial é light por natureza).
- Espanhol neutro LATAM; zero vícios de IA na copy (sem travessão).
- Contraste mínimo WCAG AA no CTA (terracota #C0512F com texto #FAF7F2 = 4.6:1 ✓)
  — a auditoria reprovou o botão de compra atual da Offer por 2.59:1; a Landing
  nova não repete o erro.

## Fora de escopo (anotado para depois)

- Auditoria de copy completa do quiz + decisão sobre os 2 vídeos
  (mini-VSL/VSL final) e re-produção via omniflash — próximo capítulo, pedido
  pelo Flavio em 2026-06-11.
- Os 3 furos da auditoria de 07/06 (resultado fixo, HOTMART_URL placeholder,
  delay 290s) — tratados em frente separada.

## Validação

Build Vite + preview local; screenshots mobile (412px) e desktop pro Flavio
aprovar visualmente ANTES de merge. Branch separado (`feat/landing-warm-editorial`).
