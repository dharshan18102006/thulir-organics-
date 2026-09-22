'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { loadRazorpayScript, openRazorpayCheckout } from '@/lib/razorpay';

const WHATSAPP_NUMBER = '919585142753';

interface ProductActionsProps {
  productName: string;
  priceStr: string;
}

function WhatsAppIcon({ className, pulse }: { className?: string; pulse?: boolean }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className ?? ''}`}>
      {/* Pulse rings — only when pulse=true */}
      {pulse && (
        <>
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-60" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-30" />
        </>
      )}
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 relative z-10" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </span>
  );
}

type Status = 'idle' | 'loading' | 'success' | 'failed';

export default function ProductActions({ productName, priceStr }: ProductActionsProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [paymentId, setPaymentId] = useState('');
  const [waHighlight, setWaHighlight] = useState(false);
  const [waHovered, setWaHovered] = useState(false);

  // Parse INR price string e.g. "₹350 / 30ml" → 350
  const parseAmount = (price: string) => {
    const num = parseInt(price.replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };
  const amount = parseAmount(priceStr);

  // WhatsApp message pre-filled with product info
  const waMessage = encodeURIComponent(
    `Hi Thulir Organics! 🌿\n\nI'd like to order:\n*${productName}* — ${priceStr}\n\nPlease confirm availability and payment details. Thank you!`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  // Auto-remove success state after 5s
  useEffect(() => {
    if (status === 'success') {
      const t = setTimeout(() => setStatus('idle'), 5000);
      return () => clearTimeout(t);
    }
  }, [status]);

  // Auto-remove failed state & highlight WA button
  useEffect(() => {
    if (status === 'failed') {
      setWaHighlight(true);
      const t = setTimeout(() => {
        setStatus('idle');
        setWaHighlight(false);
      }, 8000);
      return () => clearTimeout(t);
    }
  }, [status]);

  const handleBuyNow = async () => {
    setStatus('loading');
    const loaded = await loadRazorpayScript();

    if (!loaded) {
      setStatus('failed');
      return;
    }

    openRazorpayCheckout({
      productName,
      amount,
      onSuccess: (pid) => {
        setPaymentId(pid);
        setStatus('success');
      },
      onFailure: () => setStatus('failed'),
      onDismiss: () => setStatus('idle'),
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full">

      {/* ── Status banners ─────────────────────────────────────── */}
      {status === 'success' && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest/10 border border-forest/20 text-forest text-sm font-body animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-forest-mid" />
          <span>
            Payment successful! 🎉 ID: <span className="font-mono text-xs">{paymentId}</span>
            <br />
            <span className="text-forest/60 text-xs">We will confirm your order via WhatsApp shortly.</span>
          </span>
        </div>
      )}

      {status === 'failed' && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-body animate-fade-in">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
          <span>
            Payment gateway unavailable. <strong>Order safely via WhatsApp ↓</strong>
          </span>
        </div>
      )}

      {/* ── Buttons row ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Buy Now — Razorpay */}
        <button
          id="buy-now-razorpay"
          onClick={handleBuyNow}
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-forest text-cream font-semibold rounded-full transition-all duration-300 hover:bg-forest-mid hover:shadow-card focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
              </svg>
              Processing…
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Paid ✓
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              Buy Now
            </>
          )}
        </button>

        {/* Order via WhatsApp — animated fallback */}
        <a
          id="order-whatsapp-btn"
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Order ${productName} via WhatsApp`}
          onMouseEnter={() => setWaHovered(true)}
          onMouseLeave={() => setWaHovered(false)}
          className="flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          style={{
            background: waHighlight
              ? 'linear-gradient(135deg, #1aad52 0%, #128c3e 100%)'
              : 'linear-gradient(135deg, #25D366 0%, #1aad52 100%)',
            boxShadow: waHovered || waHighlight
              ? '0 8px 28px rgba(37,211,102,0.55), 0 2px 8px rgba(37,211,102,0.3)'
              : '0 4px 14px rgba(37,211,102,0.35)',
            transform: waHovered ? 'scale(1.04)' : waHighlight ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          <WhatsAppIcon pulse={waHighlight} />
          <span>{waHighlight ? 'Order via WhatsApp ↗' : 'Order on WhatsApp'}</span>
        </a>

      </div>

      {/* Safety note */}
      <p className="text-forest/40 text-xs font-body leading-relaxed">
        🔒 Razorpay secured checkout · UPI, Cards, Net Banking & Wallets accepted · WhatsApp ordering always available as backup
      </p>
    </div>
  );
}

