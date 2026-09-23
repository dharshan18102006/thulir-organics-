'use client';

import { X, Smartphone, Copy, CheckCircle2, MessageCircle, ScanLine } from 'lucide-react';
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
  unit?: string;
  priceStr?: string;
}

export default function UpiCheckoutModal({
  isOpen,
  onClose,
  productName,
  amount,
  unit,
  priceStr,
}: UpiCheckoutModalProps) {
  const [copied, setCopied] = useState(false);

  // If unit wasn't provided directly, extract from priceStr
  const resolvedUnit =
    unit ||
    (priceStr && priceStr.includes('/') ? priceStr.split('/')[1]?.trim() : '');

  const displayPrice = resolvedUnit ? `₹${amount} / ${resolvedUnit}` : `₹${amount}`;

  const upiUrl =
    amount > 0
      ? `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(MERCHANT_NAME)}&cu=INR&am=${amount}&tn=${encodeURIComponent(`Payment for ${productName}`)}`
      : `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(MERCHANT_NAME)}&cu=INR&tn=${encodeURIComponent(`Payment for ${productName}`)}`;

  const waMessage = encodeURIComponent(
    `Hi Thulir Organics! 🌿\n\nI just paid ${displayPrice} for *${productName}* via UPI.\nUPI ID: ${UPI_ID}\n\nAttaching payment screenshot. Please confirm my order. Thank you!`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 z-50 backdrop-blur-md"
          />

          {/* ── Modal ───────────────────────────── */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320, mass: 0.8 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm z-50"
          >
            <div className="bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.22)] overflow-hidden">

              {/* ── Gradient Header ─────────────── */}
              <div
                className="relative px-6 py-5 flex items-center justify-between overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #122519 0%, #1C3A2B 60%, #2D5A3D 100%)' }}
              >
                {/* Decorative rings */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border border-white/10" />
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full border border-white/8" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-0.5">
                    <ScanLine className="w-3.5 h-3.5 text-gold" />
                    <p className="text-gold text-[10px] font-body uppercase tracking-widest">Secure UPI Payment</p>
                  </div>
                  <h3 className="font-display font-bold text-cream text-2xl">Scan & Pay</h3>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close payment modal"
                  className="relative z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <X className="w-4 h-4 text-cream" />
                </button>

                {/* Leaf icon badge */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, type: 'spring', damping: 18 }}
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg z-20"
                >
                  <span className="text-lg">🌿</span>
                </motion.div>
              </div>

              {/* ── Body ────────────────────────── */}
              <div className="px-6 pt-8 pb-6 flex flex-col items-center gap-5">

                {/* Product + Amount */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <p className="text-forest/50 text-xs font-body uppercase tracking-wider mb-1">Paying for</p>
                  <p className="font-display font-semibold text-forest text-base leading-snug">{productName}</p>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.18, type: 'spring', damping: 16 }}
                    className="flex items-baseline justify-center gap-1.5 mt-1"
                  >
                    <span className="text-4xl font-display font-bold text-earth">
                      ₹{amount}
                    </span>
                    {resolvedUnit && (
                      <span className="text-forest/60 font-body text-base font-semibold">
                        / {resolvedUnit}
                      </span>
                    )}
                  </motion.div>
                </motion.div>

                {/* QR Code with animated reveal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: 0.2, type: 'spring', damping: 18, stiffness: 260 }}
                  className="relative"
                >
                  {/* Glowing ring around QR */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/20 via-forest/10 to-gold/20 blur-xl scale-110 opacity-60" />

                  <div className="relative p-4 bg-white rounded-2xl border-2 border-forest/10 shadow-[0_4px_24px_rgba(28,58,43,0.15)]">
                    {/* Corner marks */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-forest rounded-tl" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-forest rounded-tr" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-forest rounded-bl" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-forest rounded-br" />

                    <QRCodeSVG
                      value={upiUrl}
                      size={192}
                      bgColor="#ffffff"
                      fgColor="#1C3A2B"
                      level="H"
                    />
                  </div>
                </motion.div>

                {/* Scan hint */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-forest/50 text-xs font-body text-center"
                >
                  Scan with GPay · PhonePe · Paytm · BHIM · any UPI app
                </motion.p>

                {/* UPI ID copy row */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-[#f5f0e8] rounded-xl border border-[#e8dfc8]"
                >
                  <div className="min-w-0">
                    <p className="text-forest/50 text-[10px] font-body uppercase tracking-wider mb-0.5">UPI ID</p>
                    <p className="text-forest font-mono text-sm font-semibold truncate">{UPI_ID}</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    aria-label="Copy UPI ID"
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest text-cream text-xs font-semibold transition-all duration-200 hover:bg-forest-mid hover:scale-105 active:scale-95"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.span
                          key="done"
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Copied!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-1"
                        >
                          <Copy className="w-3.5 h-3.5" /> Copy
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>

                {/* Open in UPI App — mobile only */}
                <motion.a
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 }}
                  href={upiUrl}
                  className="md:hidden w-full flex items-center justify-center gap-2 py-3.5 bg-forest text-cream font-semibold rounded-full hover:bg-forest-mid transition-colors shadow-md text-sm"
                >
                  <Smartphone className="w-4.5 h-4.5" />
                  Open in UPI App
                </motion.a>

                {/* Divider */}
                <div className="w-full flex items-center gap-3">
                  <div className="flex-1 h-px bg-[#e8dfc8]" />
                  <span className="text-forest/35 text-[11px] font-body whitespace-nowrap">after paying</span>
                  <div className="flex-1 h-px bg-[#e8dfc8]" />
                </div>

                {/* WhatsApp confirm */}
                <motion.a
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full font-semibold text-white text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #1aad52 100%)',
                    boxShadow: '0 6px 24px rgba(37,211,102,0.40)',
                  }}
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                  Confirm Order on WhatsApp
                </motion.a>

                <p className="text-forest/30 text-[10px] font-body text-center leading-relaxed">
                  Pay via UPI, then send your payment screenshot on WhatsApp to confirm your order.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
