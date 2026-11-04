import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useCart } from '../context/WatchlistContext';
import { CartItem } from './CartItem';

export function CartDrawer({ isOpen, onClose }) {
  const { cart, totalItems, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div
      id="cart-section"
      data-testid="cart-section"
      className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-400" />
              <h2 className="font-bold text-lg text-white">Giỏ Hàng Của Bạn</h2>
              <Badge variant="purple" className="ml-1">
                {totalItems} món
              </Badge>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <div
                id="empty-cart-msg"
                data-testid="empty-cart-msg"
                className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500"
              >
                <ShoppingBag className="w-14 h-14 text-slate-700 mb-3" />
                <p className="text-base font-bold text-slate-300">Giỏ hàng trống</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                  Bạn chưa thêm sản phẩm nào vào giỏ. Hãy chọn vé phim và nhấn "Thêm vào giỏ" nhé!
                </p>
              </div>
            ) : (
              cart.map((item) => <CartItem key={item.id} item={item} />)
            )}
          </div>

          {/* Footer & Total Price */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950/60 space-y-4">
              {/* Summary line */}
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Tổng số lượng:</span>
                  <span className="font-bold text-slate-200">{totalItems} món</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-800">
                  <span className="text-sm font-bold text-white">Tổng thanh toán:</span>
                  <span
                    id="cart-total-price"
                    data-testid="cart-total-price"
                    className="total-price text-lg font-black text-emerald-400"
                  >
                    {totalPrice.toLocaleString('vi-VN')} ₫
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  className="w-1/3"
                  onClick={clearCart}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Xóa hết
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-2/3"
                  onClick={onClose}
                >
                  <span>Tiếp tục mua</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const WatchlistDrawer = CartDrawer;
