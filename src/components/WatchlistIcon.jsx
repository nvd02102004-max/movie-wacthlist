import React from 'react';
import { Bookmark } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';

export function WatchlistIcon({ onClick }) {
  const { totalSaved } = useWatchlist();

  return (
    <button
      onClick={onClick}
      className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500"
      aria-label="Xem Watchlist"
      data-testid="watchlist-toggle-btn"
    >
      <Bookmark className="w-5 h-5 text-purple-400" />
      {totalSaved > 0 && (
        <span
          data-testid="watchlist-count"
          className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-purple-600 text-[11px] font-extrabold text-white flex items-center justify-center border-2 border-slate-900 animate-in zoom-in-75 duration-200"
        >
          {totalSaved}
        </span>
      )}
    </button>
  );
}
