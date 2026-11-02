import React from 'react';
import { MovieCard } from './MovieCard';
import { Film } from 'lucide-react';

export function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/40">
        <Film className="w-12 h-12 text-slate-600 mb-3" />
        <h3 className="text-base font-semibold text-slate-300">Không tìm thấy bộ phim nào</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          Hãy thử đổi từ khóa tìm kiếm hoặc chọn lại thể loại khác trên thanh công cụ.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
