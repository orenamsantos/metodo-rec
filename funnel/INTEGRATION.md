# Integração — Checkout, Order Bump, Upsell, CRM

Como conectar o `Quiz.jsx` ao Hotmart/Kiwify, capturar leads e gerenciar a esteira pós-compra.

## 1. Checkout Hotmart/Kiwify (Tela 13)

No componente `Checkout` há um placeholder:

```jsx
<div style={{ padding: 40, background: c.bg, border: `1px dashed ${c.border}`, ... }}>
  Embed del Checkout
</div>
```

**Substituir por:**

```jsx
<iframe
  src="https://pay.hotmart.com/SEUPRODUTO?checkoutMode=10"
  width="100%"
  height="900"
  frameBorder="0"
  allow="payment"
  title="Checkout Método R.E.C."
/>
```

Hotmart: gere o link na aba **Produto → Página de pagamento → Checkout Transparente**.
Kiwify: idem na aba **Checkout → Compartilhar**.

## 2. Order bump ($19)

No Hotmart, configurar como **Order Bump** dentro do mesmo checkout:
- **Plataforma → Produto principal → Ofertas → Order Bump**
- Vincular SKU "Audiolibro + 5 áudios guiados" a $19
- O checkbox já vem renderizado no iframe — não precisa do HTML extra no Quiz.jsx

Se preferir order bump customizado (fora do iframe), conectar o estado do `<input type="checkbox">` da Tela 13 a um produto separado via parâmetro de URL.

## 3. Upsell one-click ($47) — Tela 14

Hotmart **One Click Buy**:
1. Criar produto "30 Cartas y Guiones" — $47
2. Na página do upsell, configurar tag de produto principal
3. URL de redirecionamento pós-compra → `/upsell`
4. Botão "Sí, Agregar a Mi Pedido" dispara API one-click — substituir `onAccept` por:

```jsx
const onAccept = async () => {
  await fetch('https://api.hotmart.com/one-click/aceitar', {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ produto_id: 'UPSELL_ID', transacao_origem: 'COMPRA_FRONTEND_ID' })
  });
  setScreen(16); // thank you
};
```

Em Kiwify usar **Upsell 1 clique** — o fluxo é parecido.

## 4. Downsell one-click ($27) — Tela 15

Mesma lógica do upsell, mas só dispara se o usuário recusar o upsell (`onDecline` da Tela 14 → `setScreen(15)`).

Já está cabeado no `Quiz.jsx`:

```jsx
{screen === 14 && <Upsell onAccept={() => goTo(16)} onDecline={next} />}
{screen === 15 && <Downsell onAccept={() => goTo(16)} onDecline={() => goTo(16)} />}
```

## 5. Webhook Hotmart → liberar acesso

Configurar webhook em **Hotmart → Ferramentas → Webhook → Adicionar**:
- URL: `https://seu-backend.com/hotmart/webhook`
- Eventos: `PURCHASE_COMPLETE`, `PURCHASE_REFUNDED`

Exemplo de handler (Node.js / Vercel):

```js
export default async function handler(req, res) {
  const { event, data } = req.body;
  if (event === 'PURCHASE_COMPLETE') {
    const { email, buyer, subscription } = data;
    // 1. Criar acesso na área de membros
    // 2. Disparar email de boas-vindas
    // 3. Enviar mensagem inicial no WhatsApp
    await criarAcesso(email, data.product.id);
    await dispararEmail('e1-boas-vindas', email, buyer.name);
  }
  res.status(200).send('OK');
}
```

## 6. Captura de leads (Tela 8)

A Tela 8 captura `name` + `phone` ANTES da compra — esse lead é ouro: já passou pelo diagnóstico inteiro.

**Onde plugar:**

No `Capture` component, alterar a função `onSubmit`:

```jsx
const onSubmit = async () => {
  await fetch('https://hook.zapier.com/SEU_HOOK_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: a.name,
      phone: a.phone,
      timeAgo: a.timeAgo,
      feelings: a.feelings,
      triedTalking: a.triedTalking,
      commitment: a.commitment,
      timeLeft: a.timeLeft,
      resultado: 'Zona Crítica',
      timestamp: new Date().toISOString(),
    }),
  });
  next();
};
```

**Opções de receptor:**
- **Zapier** ou **Make (Integromat)** — webhook → ActiveCampaign / Mailerlite / Sheets
- **Webhook próprio** (Vercel function) → SQL / Notion
- Direto na API do **ActiveCampaign** ou **Mailerlite**

## 7. Integração WhatsApp

Após captura na Tela 8, idealmente disparar uma mensagem inicial via:
- **Z-API** (mais simples, $10-30/mês)
- **API oficial Meta WhatsApp Business** (complexo, mas escalável)

Mensagem-template:

> Hola {nome}, soy [especialista]. Tu diagnóstico está listo. Si te interesa el plan, te dejo el link aquí: [link checkout]. Y si quieres conversar antes, escríbeme. 💛

## 8. Pixel + Conversion API

Em todas as telas críticas (oferta, checkout, thank you), disparar eventos:

```jsx
useEffect(() => {
  if (screen === 12) window.fbq?.('track', 'InitiateCheckout');
  if (screen === 16) window.fbq?.('track', 'Purchase', { value: 27, currency: 'USD' });
}, [screen]);
```

Idealmente também conectar **Meta CAPI** server-side via webhook do Hotmart pra eventos mais precisos (já que iOS 14+ depende disso).

## Checklist de produção

- [ ] Iframe Hotmart na Tela 13
- [ ] Order bump configurado no Hotmart
- [ ] One-click upsell/downsell habilitado
- [ ] Webhook Hotmart → backend → liberar acesso
- [ ] Captura Tela 8 → Zapier → ActiveCampaign
- [ ] Mensagem inicial WhatsApp pós-captura
- [ ] Pixel Meta + CAPI server-side
- [ ] Pixel TikTok (se rodar TikTok Ads)
- [ ] Google Analytics 4 com eventos customizados
