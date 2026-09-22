'use client';

import { X, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UpiCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  amount: number;
  upiId?: string;
  merchantName?: string;
}

export default function UpiCheckoutModal({
  isOpen,
  onClose,
  productName,
  amount,
  upiId = 'thulirorganics@upi', // Replace with actual UPI ID
  merchantName = 'Thulir Organics',
}: UpiCheckoutModalProps) {
  
  // Construct the UPI Intent URL
  const upiIntentUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName)}&cu=INR&am=${amount}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-cream-light rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-forest text-cream-light p-4 flex items-center justify-between">
              <h3 className="font-display font-medium text-xl">Complete Payment</h3>
              <button onClick={onClose} className="p-1 hover:bg-forest-light rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col items-center text-center space-y-6">
              
              <div className="space-y-1">
                <p className="text-forest/70 text-sm">Paying for</p>
                <p className="font-display font-medium text-lg text-forest">{productName}</p>
                <div className="text-3xl font-display font-semibold text-forest mt-2">
                  ₹{amount}
                </div>
              </div>

              {/* QR Code Placeholder (could be dynamically generated later) */}
              <div className="w-48 h-48 bg-white rounded-xl shadow-inner border border-sage p-4 flex flex-col items-center justify-center">
                {/* For now, just a placeholder icon since generating dynamic QR needs a library like qrcode.react */}
                <div className="w-full h-full border-2 border-dashed border-sage/50 rounded-lg flex items-center justify-center bg-sage/5">
                  <div className="text-forest/50 text-xs text-center space-y-2">
                    <p>Scan with any UPI App</p>
                    <p className="font-semibold">{upiId}</p>
                  </div>
                </div>
              </div>

              <div className="w-full space-y-3">
                <a
                  href={upiIntentUrl}
                  className="w-full flex items-center justify-center gap-2 bg-forest text-cream-light py-3 rounded-full hover:bg-forest-light transition-colors font-medium shadow-md md:hidden"
                >
                  <Smartphone className="w-5 h-5" />
                  Pay Now with UPI App
                </a>
                
                <p className="text-xs text-forest/60">
                  After payment, please share the screenshot on WhatsApp to confirm your order.
                </p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
