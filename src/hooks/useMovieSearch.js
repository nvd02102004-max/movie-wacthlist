import { useState, useMemo } from 'react';

export function useMovieSearch(movies = []) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('rating-desc');

  // Trích xuất danh sách tất cả các thể loại duy nhất
  const genres = useMemo(() => {
    const set = new Set();
    movies.forEach((m) => {
      if (Array.isArray(m.genres)) {
        m.genres.forEach((g) => set.add(g));
      } else if (m.genre) {
        set.add(m.genre);
      }
    });
    return ['All', ...Array.from(set)];
  }, [movies]);

  // Lọc và sắp xếp danh sách phim theo từ khóa và bộ lọc
  const filteredMovies = useMemo(() => {
    return movies
      .filter((movie) => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase().trim());
        const matchesGenre =
          selectedGenre === 'All' ||
          (Array.isArray(movie.genres) ? movie.genres.includes(selectedGenre) : movie.genre === selectedGenre);
        return matchesSearch && matchesGenre;
      })
      .sort((a, b) => {
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        if (sortBy === 'rating-asc') return a.rating - b.rating;
        if (sortBy === 'year-desc') return b.year - a.year;
        if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [movies, searchTerm, selectedGenre, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    genres,
    filteredMovies,
    totalResults: filteredMovies.length,
  };
}
