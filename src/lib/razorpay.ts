// --- Razorpay Configuration ---------------------------------------------------
// Replace NEXT_PUBLIC_RAZORPAY_KEY_ID in your .env.local with your actual key.
// Sign up free at https://razorpay.com ? Settings ? API Keys
// Test key starts with: rzp_test_xxxxx
// Live key starts with: rzp_live_xxxxx

export const RAZORPAY_KEY_ID =
  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_HERE';

export const MERCHANT_NAME = 'Thulir Organics';
export const MERCHANT_THEME_COLOR = '#1C3A2B';
export const MERCHANT_DESCRIPTION = 'Pure Natural Organic Personal Care';

/**
 * Dynamically loads the Razorpay checkout script.
 * Returns a promise that resolves to true if loaded, false if failed.
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as unknown as Record<string,unknown>).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export interface RazorpayOptions {
  productName: string;
  amount: number;
  onSuccess?: (paymentId: string) => void;
  onFailure?: () => void;
  onDismiss?: () => void;
}

export function openRazorpayCheckout({ productName, amount, onSuccess, onFailure, onDismiss }: RazorpayOptions) {
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: amount * 100,
    currency: 'INR',
    name: MERCHANT_NAME,
    description: productName,
    theme: { color: MERCHANT_THEME_COLOR },
    prefill: { name: '', email: '', contact: '' },
    notes: { product: productName },
    handler: function (response: Record<string,string>) {
      onSuccess?.(response.razorpay_payment_id);
    },
    modal: {
      ondismiss: function () { onDismiss?.(); },
    },
  };
  try {
    type RazorpayConstructor = new (opts: typeof options) => { open(): void; on(event: string, cb: () => void): void };
    const RazorpayClass = (window as unknown as { Razorpay: RazorpayConstructor }).Razorpay;
    const rzp = new RazorpayClass(options);
    rzp.on('payment.failed', function () { onFailure?.(); });
    rzp.open();
  } catch {
    onFailure?.();
  }
}
