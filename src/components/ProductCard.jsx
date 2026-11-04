import React, { useState } from 'react';
import { Star, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { useCart } from '../context/WatchlistContext';

export function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const price = product.price || 150000;
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1200);
  };

  return (
    <div
      id="product-card"
      className="product-card h-full"
      data-testid="product-card"
    >
      <Card className="flex flex-col h-full group hover:-translate-y-1 hover:shadow-purple-500/10 transition-all duration-300 border-slate-800 bg-slate-900/90">
        {/* Product Image / Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
          {!imgError ? (
            <img
              src={product.image || product.poster}
              alt={product.name || product.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-purple-950 via-slate-900 to-indigo-950 text-slate-400">
              <ShoppingBag className="w-10 h-10 text-purple-400 mb-1 opacity-70" />
              <span className="text-[11px] font-semibold">{product.name || product.title}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Rating Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="amber" className="bg-slate-950/80 backdrop-blur-md px-2 py-1 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
              {product.rating || '8.5'}
            </Badge>
          </div>

          {/* Year & Duration */}
          <div className="absolute bottom-3 left-3 flex gap-2 items-center text-xs text-slate-300 font-medium">
            <span>{product.year || '2024'}</span>
            <span>•</span>
            <span>{product.duration || 'Standard'}</span>
          </div>
        </div>

        {/* Details & Price */}
        <div className="p-4 flex flex-col flex-1 justify-between gap-3">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {(product.genres || [product.genre || 'Vé Phim']).map((g) => (
                <Badge
                  key={g}
                  variant={g === 'Việt Nam' ? 'emerald' : 'purple'}
                  className="text-[10px]"
                >
                  {g}
                </Badge>
              ))}
            </div>

            <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors line-clamp-1">
              {product.name || product.title}
            </h3>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-base font-extrabold text-emerald-400">
                {price.toLocaleString('vi-VN')} ₫
              </span>
              <span className="text-[11px] text-slate-400">/ vé</span>
            </div>

            <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector & Add to Cart button */}
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Số lượng:</span>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-700/80 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-6 h-6 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Giảm"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center font-bold text-white text-xs">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-6 h-6 flex items-center justify-center rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Tăng"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              id="add-to-cart-btn"
              data-testid="add-to-cart-btn"
              onClick={handleAddToCart}
              variant={isAddedRecently ? 'secondary' : 'primary'}
              size="sm"
              className="w-full font-bold shadow-md shadow-purple-600/20"
            >
              {isAddedRecently ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Đã thêm vào giỏ!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm vào giỏ</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export const MovieCard = ProductCard;
