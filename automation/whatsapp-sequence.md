# Sequência de WhatsApp — Pós-Compra

Mensagens curtas e estratégicas em paralelo aos emails. Mais íntimas, sensação de "conversa real".

## Stack técnica

- **Z-API** ($10-30/mês) — opção mais simples, número WhatsApp normal
- **API oficial Meta WhatsApp Business** — caro pra começar, mas escalável
- Templates pré-aprovados pelo WhatsApp (obrigatório para mensagens automáticas)

## Sequência

### M1 — Imediato (após compra)

**Trigger:** webhook `PURCHASE_COMPLETE` do Hotmart

```
Hola {Nombre} 💛

Soy Lucía del Centro R.E.C. Tu acceso ya está liberado — todo el material te llegó por email también.

Una pregunta importante para que pueda ayudarte mejor:

¿En qué fase sientes que estás ahora?

1️⃣ "Está distante pero podemos hablar"
2️⃣ "Casi no hablamos"
3️⃣ "Estamos en crisis abierta"
4️⃣ "Sospecho infidelidad"

Solo responde el número. Es para personalizar lo que te envío en los próximos días.
```

**Função:** segmentação imediata + simular "consulta humana"

### M2 — D+3 (check-in)

**Trigger:** 72h após M1

```
{Nombre}, ¿cómo van estos primeros 3 días?

Sin necesidad de detalles — solo dime con un número del 1 al 10 cómo te sientes hoy comparado con el día del diagnóstico.

(1 = igual o peor, 10 = mucho mejor)
```

**Função:** engagement + dado pra otimização

**Resposta automática:**
- 1-4: enviar mensagem de apoio + lembrete de aplicar Bonus 1
- 5-7: parabenizar progresso + reforço da disciplina
- 8-10: pedir depoimento (se aplicou ao menos 7 dias)

### M3 — D+14 (cross-sell soft)

**Trigger:** 14 dias após M1

```
Hola {Nombre} ✨

Si estás llegando al Día 14 del método y empezando a sentir cambios, quería contarte algo.

Mucha mujeres aquí me preguntan, justo en este punto, qué hacer con la intimidad física cuando empieza a reaparecer la posibilidad.

Escribí un material específico para eso: **Reconexión Íntima**.

¿Quieres que te mande el link? Solo responde "sí" o "no, gracias".

(Es complemento — no urgente. Solo si te interesa.)
```

**Função:** cross-sell sem pressão (opt-in claro)

### M4 — D+30 (celebração + pedido de depoimento)

**Trigger:** 30 dias após M1

```
{Nombre} 🌟

30 días. Lo lograste.

Tengo una pregunta — y siéntete libre de no responder, sin presión:

¿Estarías abierta a compartirme en un audio corto (1-2 min) cómo cambió tu matrimonio estos 30 días?

Lo uso para inspirar a otras mujeres que están donde tú estabas el Día 0. Cambio el nombre y nunca expongo nada que no quieras.

Si sí, te paso indicaciones. Si no, también está bien — me alegra saberte mejor 💛

— Lucía
```

**Função:** captura de depoimento (gold para criativos futuros)

## Mensagens de "trigger" baseadas em comportamento

### Quando responde no quiz "tengo miedo de una traición"

Dispara 1h após captura na Tela 8:

```
{Nombre}, vi en tu diagnóstico que tienes miedo de una posible infidelidad.

Solo quería que sepas: el método tiene un capítulo específico para esto (Bonus 1 — Primeros Auxilios). Si la situación es delicada hoy, lee ese antes que cualquier otra cosa.

Si necesitas algo, escribe aquí. Te leo.

— Lucía
```

### Quando rejeita upsell e downsell

Dispara 24h após compra só do frontend:

```
{Nombre}, gracias por confiar en el método 💛

Empieza tranquila. Lee la introducción hoy, y mañana arrancas el Día 1.

Cualquier duda — desde "¿cómo abro el PDF?" hasta "¿qué hago si él pregunta qué estoy haciendo?" — me escribes aquí.

— Lucía
```

## Princípios

- **Mensagens curtas** — nunca > 80 palavras
- **Tom de amiga próxima** — não corporativo, não "olá, esperamos que..."
- **CTAs com opt-in claro** — sempre "responde sim/não", nunca "compre agora"
- **Sem links suspeitos** — WhatsApp marca como spam fácil
- **Identidade humana** — assinar como "Lucía", não "Equipo R.E.C."

## Métricas a monitorar

| Mensagem | Response rate esperado |
|---|---|
| M1 (boas-vindas) | 60-75% |
| M2 (check-in D+3) | 40-55% |
| M3 (cross-sell D+14) | 25-35% (com 8-12% conversão) |
| M4 (D+30 depoimento) | 15-25% |

## Custo estimado

- Z-API: $10-30/mês até 5.000 mensagens
- Após 5.000 msg/mês: API oficial Meta ($0.005-0.015 por conversa)

## Compliance

- **Opt-in obrigatório** — captura na Tela 8 deve ter checkbox "Aceito receber mensagens por WhatsApp e email"
- **Opt-out fácil** — toda mensagem deve aceitar "STOP" pra parar
- **Não rodar entre 22h-8h** local da pessoa (respeitar fuso por país)
