import React, { useState } from 'react';
import { Film, Search, Clapperboard, Sparkles, Filter } from 'lucide-react';
import { INITIAL_MOVIES } from './data/movies';
import { useMovieSearch } from './hooks/useMovieSearch';
import { MovieList } from './components/MovieList';
import { WatchlistIcon } from './components/WatchlistIcon';
import { WatchlistDrawer } from './components/WatchlistDrawer';

export function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    genres,
    filteredMovies,
    totalResults,
  } = useMovieSearch(INITIAL_MOVIES);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-600/30">
              <Clapperboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                MovieWatch <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-1.5 py-0.5 rounded border border-purple-500/30">FER201</span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">FPT University • React SPA Demo</p>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm phim theo tên (vd: Inception, Batman)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              data-testid="search-input"
            />
          </div>

          {/* Watchlist Action */}
          <div className="shrink-0 flex items-center gap-3">
            <WatchlistIcon onClick={() => setIsDrawerOpen(true)} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Hero Banner */}
        <section className="mb-8 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/30 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Kiến trúc React Component + Context API + Custom Hook
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Khám Phá & Lưu Trữ Những Bộ Phim Đỉnh Cao
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              Dự án thực hành môn FER201 minh họa việc quản lý trạng thái bằng React Context API, 
              tách logic tìm kiếm bằng Custom Hook và xây dựng giao diện chuẩn Clean Architecture.
            </p>
          </div>
        </section>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
          {/* Genre Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none" data-testid="genre-filters">
            <Filter className="w-3.5 h-3.5 text-slate-500 mr-1 shrink-0" />
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedGenre === genre
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
                data-testid={`genre-${genre}`}
              >
                {genre === 'All' ? 'Tất cả thể loại' : genre}
              </button>
            ))}
          </div>

          {/* Sort Dropdown & Result Count */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-slate-400">
              <strong className="text-white">{totalResults}</strong> phim
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
              data-testid="sort-select"
            >
              <option value="rating-desc">Điểm đánh giá (Cao $\to$ Thấp)</option>
              <option value="rating-asc">Điểm đánh giá (Thấp $\to$ Cao)</option>
              <option value="year-desc">Năm phát hành mới nhất</option>
              <option value="title-asc">Tên phim (A $\to$ Z)</option>
            </select>
          </div>
        </div>

        {/* Movies Grid */}
        <MovieList movies={filteredMovies} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>MovieWatch React Project • Phục vụ kiểm thử & bảo vệ đồ án SWD392 / FER201</p>
      </footer>

      {/* Watchlist Slide-over Drawer */}
      <WatchlistDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
