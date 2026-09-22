'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import UpiCheckoutModal from '@/components/ui/UpiCheckoutModal';

interface ProductActionsProps {
  productName: string;
  priceStr: string;
}

export default function ProductActions({ productName, priceStr }: ProductActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parse price string like "₹350" to number 350
  const parseAmount = (price: string) => {
    const num = parseInt(price.replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };

  const amount = parseAmount(priceStr);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-forest text-cream font-semibold rounded-full hover:bg-forest-mid transition-all duration-300 hover:shadow-card focus-visible:ring-2 focus-visible:ring-gold"
      >
        <ShoppingBag className="w-5 h-5" aria-hidden="true" />
        Buy Now
      </button>

      <UpiCheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={productName}
        amount={amount}
      />
    </>
  );
}
