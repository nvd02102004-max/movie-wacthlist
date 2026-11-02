import React from 'react';
import { X, Trash2, Film, Star } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useWatchlist } from '../context/WatchlistContext';

export function WatchlistDrawer({ isOpen, onClose }) {
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-purple-400" />
              <h2 className="font-bold text-lg text-white">Watchlist Của Tôi</h2>
              <Badge variant="purple" className="ml-1">
                {watchlist.length}
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

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {watchlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <Film className="w-12 h-12 text-slate-700 mb-3" />
                <p className="text-sm font-medium text-slate-400">Watchlist đang trống</p>
                <p className="text-xs text-slate-600 mt-1">
                  Nhấn nút "Thêm vào Watchlist" ở bất kỳ phim nào để lưu lại xem sau.
                </p>
              </div>
            ) : (
              watchlist.map((movie) => (
                <div
                  key={movie.id}
                  className="flex gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 transition-all"
                  data-testid={`watchlist-item-${movie.id}`}
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    className="w-16 h-20 object-cover rounded-lg bg-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <h4 className="font-semibold text-sm text-white truncate">{movie.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span className="flex items-center text-amber-400 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                          {movie.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[11px] text-purple-400 font-medium">
                        {movie.genre || movie.genres?.[0]}
                      </span>
                      <button
                        onClick={() => removeFromWatchlist(movie.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                        aria-label={`Xóa ${movie.title}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {watchlist.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950/40 flex gap-3">
              <Button
                variant="danger"
                size="sm"
                className="w-full"
                onClick={clearWatchlist}
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                Xóa tất cả
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={onClose}
              >
                Tiếp tục xem
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
