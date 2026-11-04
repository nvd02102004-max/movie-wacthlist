import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/WatchlistContext';

export function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const subtotal = (item.price || 0) * (item.quantity || 1);

  return (
    <div
      id="cart-item"
      className="cart-item flex gap-3 p-3.5 rounded-2xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition-all"
      data-testid="cart-item"
    >
      <img
        src={item.image || item.poster}
        alt={item.name || item.title}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
        className="w-16 h-20 object-cover rounded-xl bg-slate-800 shrink-0"
      />
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <h4 className="font-semibold text-sm text-white truncate">
            {item.name || item.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-purple-300 font-medium mt-1">
            <span>{(item.price || 0).toLocaleString('vi-VN')} ₫</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 mt-1 border-t border-slate-800/60">
          {/* Quantity Selector inside cart */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, -1)}
              className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Giảm số lượng"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-center text-xs font-bold text-white">
              {item.quantity || 1}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, 1)}
              className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Tăng số lượng"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Subtotal & Remove Button */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-emerald-400">
              {subtotal.toLocaleString('vi-VN')} ₫
            </span>
            <button
              type="button"
              id="remove-cart-item-btn"
              data-testid="remove-cart-item-btn"
              onClick={() => removeFromCart(item.id)}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 p-1 rounded hover:bg-rose-950/40 transition-colors"
              aria-label={`Xóa ${item.name || item.title}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="font-medium">Xóa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
