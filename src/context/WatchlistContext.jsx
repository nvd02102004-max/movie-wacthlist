import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext(undefined);

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('movie_watchlist_fer201');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('movie_watchlist_fer201', JSON.stringify(watchlist));
    } catch (err) {
      console.error('Không thể lưu watchlist vào localStorage:', err);
    }
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, { ...movie, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  };

  const toggleWatchlist = (movie) => {
    if (watchlist.some((m) => m.id === movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((m) => m.id === movieId);
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  const value = {
    watchlist,
    totalSaved: watchlist.length,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
    clearWatchlist,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist phải được sử dụng bên trong WatchlistProvider');
  }
  return context;
}
