import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/WatchlistContext';

export function CartIcon({ onClick }) {
  const { totalItems } = useCart();

  return (
    <button
      id="cart-icon"
      data-testid="cart-icon"
      onClick={onClick}
      className="cart-button relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500"
      aria-label="Giỏ hàng"
    >
      <ShoppingBag className="w-5 h-5 text-purple-400" />
      {totalItems > 0 && (
        <span
          id="cart-badge"
          data-testid="cart-badge"
          className="cart-badge absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-purple-600 text-[11px] font-extrabold text-white flex items-center justify-center border-2 border-slate-900 animate-in zoom-in-75 duration-200 shadow-md shadow-purple-600/40"
        >
          {totalItems}
        </span>
      )}
    </button>
  );
}

export const WatchlistIcon = CartIcon;
