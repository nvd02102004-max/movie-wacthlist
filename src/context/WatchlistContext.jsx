import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export function WatchlistProvider({ children }) {
  // 4. Cart Persistence: Khởi tạo từ Local Storage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('fer201_shopping_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Đồng bộ trạng thái giỏ hàng vào Browser Local Storage
  useEffect(() => {
    try {
      localStorage.setItem('fer201_shopping_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Không thể đồng bộ giỏ hàng vào Local Storage:', err);
    }
  }, [cart]);

  // Thêm sản phẩm vào giỏ (nếu đã có thì cộng dồn số lượng)
  const addToCart = (product, quantityToAdd = 1) => {
    const qty = Math.max(1, Number(quantityToAdd) || 1);
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qty,
        };
        return next;
      }
      return [...prev, { ...product, quantity: qty, addedAt: new Date().toISOString() }];
    });
  };

  // Cập nhật số lượng (+ / -)
  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCart([]);
  };

  // Kiểm tra xem sản phẩm đã có trong giỏ chưa
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  // Tính tổng số lượng sản phẩm trong giỏ (cho Badge)
  const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  // Tính tổng giá trị giỏ hàng
  const totalPrice = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);

  const value = {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isInCart,
    // Backward compatibility cho Watchlist aliases
    watchlist: cart,
    totalSaved: totalItems,
    addToWatchlist: addToCart,
    removeFromWatchlist: removeFromCart,
    isInWatchlist: isInCart,
    clearWatchlist: clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useWatchlist() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useWatchlist phải được sử dụng bên trong WatchlistProvider');
  }
  return context;
}

export const useCart = useWatchlist;
