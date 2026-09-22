'use client';

import { X, Smartphone, Copy, CheckCircle2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

const UPI_ID = 'priyasindhu0307-1@okhdfcbank';
const MERCHANT_NAME = 'Thulir Organics';
const WHATSAPP_NUMBER = '919585142753';

interface UpiCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  amount: number;
}

export default function UpiCheckoutModal({
  isOpen,
  onClose,
  productName,
  amount,
}: UpiCheckoutModalProps) {
  const [copied, setCopied] = useState(false);

  // Standard UPI deep-link — works with GPay, PhonePe, Paytm, BHIM, etc.
  const upiUrl = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(MERCHANT_NAME)}&cu=INR&am=${amount}&tn=${encodeURIComponent(`Payment for ${productName}`)}`;

  const waMessage = encodeURIComponent(
    `Hi Thulir Organics! 🌿\n\nI just paid ₹${amount} for *${productName}* via UPI (${UPI_ID}).\n\nAttaching payment screenshot for confirmation. Please process my order. Thank you!`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback for older browsers
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-forest px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-cream/60 text-xs font-body uppercase tracking-widest mb-0.5">Secure UPI Payment</p>
                <h3 className="font-display font-semibold text-cream text-xl leading-tight">Scan & Pay</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close payment modal"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-cream" />
              </button>

              {/* Decorative circle */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md z-10">
                <span className="text-xl">🌿</span>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 pt-10 pb-6 flex flex-col items-center gap-5">

              {/* Product + Amount */}
              <div className="text-center">
                <p className="text-forest/55 text-sm font-body">Paying for</p>
                <p className="font-display font-semibold text-forest text-base leading-snug">{productName}</p>
                <p className="text-3xl font-display font-bold text-earth mt-1">₹{amount}</p>
              </div>

              {/* QR Code */}
              <div className="relative p-3 bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.10)] border border-beige">
                <QRCodeSVG
                  value={upiUrl}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#1C3A2B"
                  level="H"
                  imageSettings={{
                    src: '/upi-logo.png',
                    height: 36,
                    width: 36,
                    excavate: true,
                  }}
                />
              </div>

              {/* UPI ID row */}
              <div className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-cream rounded-xl border border-beige">
                <div>
                  <p className="text-forest/50 text-[10px] font-body uppercase tracking-wider">UPI ID</p>
                  <p className="text-forest font-mono text-sm font-medium">{UPI_ID}</p>
                </div>
                <button
                  onClick={handleCopy}
                  aria-label="Copy UPI ID"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest/8 hover:bg-forest/15 text-forest text-xs font-medium transition-all duration-200"
                >
                  {copied ? (
                    <><CheckCircle2 className="w-3.5 h-3.5 text-forest-mid" /> Copied!</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copy</>
                  )}
                </button>
              </div>

              {/* Open in UPI App — mobile only */}
              <a
                href={upiUrl}
                className="md:hidden w-full flex items-center justify-center gap-2 py-3.5 bg-forest text-cream font-semibold rounded-full hover:bg-forest-mid transition-colors shadow-md"
              >
                <Smartphone className="w-4.5 h-4.5" />
                Open in UPI App
              </a>

              {/* Divider */}
              <div className="w-full flex items-center gap-3">
                <div className="flex-1 h-px bg-beige" />
                <span className="text-forest/35 text-xs font-body">after paying</span>
                <div className="flex-1 h-px bg-beige" />
              </div>

              {/* WhatsApp confirm */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full font-semibold text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #1aad52 100%)',
                  boxShadow: '0 4px 18px rgba(37,211,102,0.38)',
                }}
              >
                <MessageCircle className="w-4.5 h-4.5" />
                Send Screenshot on WhatsApp
              </a>

              <p className="text-forest/35 text-[11px] font-body text-center leading-relaxed">
                Scan the QR with GPay, PhonePe, Paytm, BHIM or any UPI app · Then send your payment screenshot on WhatsApp to confirm your order.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
