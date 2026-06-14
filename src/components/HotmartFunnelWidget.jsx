import { useEffect } from 'react';
import { trackPurchaseIntent } from '../lib/tracking';

// Widget de Funil de Vendas da Hotmart (one-click upsell/downsell).
// A Hotmart renderiza os botoes "Si, lo quiero / No, gracias" dentro do
// container e cuida do roteamento entre etapas (lido pela URL da pagina,
// configurada no funil: /upsell e /downsell). Mesma snippet nas duas paginas.
//
// Tracking: o salesFunnel nao expoe evento de clique nem de recusa, mas a
// classe base aceita callbacks de pagamento em init('salesFunnel', {payment}).
// `on_payment_approve` -> payment.onSuccess dispara na compra APROVADA (one
// clique = compra, nao ha etapa de intencao separada), entao religamos o
// trackPurchaseIntent ali. Sem produto, monta sem callback.
const SCRIPT_SRC = 'https://checkout.hotmart.com/lib/hotmart-checkout-elements.js';

function mountFunnel(purchaseSlug, purchaseValue) {
  if (!(window.checkoutElements && typeof window.checkoutElements.init === 'function')) return;
  try {
    const options = purchaseSlug
      ? { payment: { onSuccess: () => trackPurchaseIntent(purchaseSlug, purchaseValue) } }
      : undefined;
    window.checkoutElements.init('salesFunnel', options).mount('#hotmart-sales-funnel');
  } catch {
    // container ainda nao no DOM; o auto-mount da lib cobre o fallback
  }
}

export default function HotmartFunnelWidget({ purchaseSlug, purchaseValue }) {
  useEffect(() => {
    const fire = () => mountFunnel(purchaseSlug, purchaseValue);
    if (window.checkoutElements) {
      fire();
      return undefined;
    }
    let script = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener('load', fire);
    return () => script.removeEventListener('load', fire);
  }, [purchaseSlug, purchaseValue]);

  return <div id="hotmart-sales-funnel" />;
}
