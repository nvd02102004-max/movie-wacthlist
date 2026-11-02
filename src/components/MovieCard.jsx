import React from 'react';
import { Star, Plus, Check, Film } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { useWatchlist } from '../context/WatchlistContext';

export function MovieCard({ movie }) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const added = isInWatchlist(movie.id);

  return (
    <Card className="flex flex-col h-full group hover:-translate-y-1 hover:shadow-purple-500/10">
      {/* Poster */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="amber" className="bg-slate-950/80 backdrop-blur-md px-2 py-1 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
            {movie.rating}
          </Badge>
        </div>

        {/* Year & Duration */}
        <div className="absolute bottom-3 left-3 flex gap-2 items-center text-xs text-slate-300 font-medium">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.duration}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {(movie.genres || [movie.genre]).map((g) => (
              <Badge key={g} variant="purple" className="text-[10px]">
                {g}
              </Badge>
            ))}
          </div>

          <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors line-clamp-1">
            {movie.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {movie.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-800/80">
          <Button
            onClick={() => toggleWatchlist(movie)}
            variant={added ? 'secondary' : 'primary'}
            size="sm"
            className="w-full"
            data-testid={`movie-action-${movie.id}`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Đã trong Watchlist</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Thêm vào Watchlist</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
