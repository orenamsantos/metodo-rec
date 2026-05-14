# Tela 13 — Checkout + Order Bump

Tela que recebe o iframe do Hotmart/Kiwify e tem o order bump destacado.

## Eyebrow centralizado

```
Finalizando tu acceso
```

## Headline

> Estás a *un paso*.

## Placeholder do iframe

No JSX:
```
[ AQUÍ VA EL IFRAME DEL CHECKOUT DE HOTMART / KIWIFY ]
```

Substituir pelo iframe real. Ver [INTEGRATION.md](../funnel/INTEGRATION.md).

## Order bump

**Header dourado:**
```
+ ORDER BUMP · $47 → $19
```

**Título:**
> Audios Guiados de Reconexión + Audiolibro Premium

**Descrição:**
> 5 audios guiados (12-18 min cada uno) para escuchar en los momentos más difíciles. Más el audiolibro narrado completo en español, ideal para escuchar mientras trabajas o conduces.

**Checkbox:** acentColor dourado, marca/desmarca o bump

## CTA (botão de simulação enquanto não tiver checkout real)

```
Simular Compra Exitosa →
```

(No build de produção: o CTA não existe — o iframe gerencia. Esta tela só existe pra testes/preview.)

## Trust signals (rodapé)

```
🔒 Compra 100% segura · Acceso inmediato después del pago
Garantía incondicional de 30 días
```

## Notas

- Caixa do order bump tem borda dourada `60% opacity` pra chamar atenção
- Em produção real, o order bump fica DENTRO do iframe Hotmart (configurado na plataforma)
- O bump renderizado nessa tela serve como reforço visual + previsualização do que vai aparecer no checkout
- Em produção, considerar remover o checkbox local e confiar 100% no iframe Hotmart pra evitar duplicar UX
