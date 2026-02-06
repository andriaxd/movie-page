import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import "../css/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getMovieDetails(id)
      .then((m) => {
        if (mounted) setMovie(m);
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setError("Failed to load movie details.");
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="details-page container">Loading...</div>;
  if (error) return <div className="details-page container">{error}</div>;
  if (!movie) return null;
  return (
    <main className="details-page">
      <div className="container details-wrap">
        <Link to="/" className="back-link">← Back</Link>
        <div className="details-grid">
          <div className="poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          </div>
          <div className="info">
            <h1>{movie.title}</h1>
            <p className="meta">{movie.release_date} • {movie.runtime ? `${movie.runtime}m` : ''} • {movie.genres?.map(g=>g.name).join(', ')}</p>
            { /* Director */ }
            {movie.credits?.crew && (
              <p className="director">Director: {(() => {
                const dir = movie.credits.crew.find(c => c.job === 'Director' || c.job === 'director');
                return dir ? dir.name : 'Unknown';
              })()}</p>
            )}
            <p className="overview">{movie.overview}</p>
            <div className="stats">
              <div className="rating"> {movie.vote_average}</div>
              <div className="popularity">Popularity: {Math.round(movie.popularity)}</div>
            </div>
            {movie.credits?.cast && (
              <div className="cast">
                <h3>Top Cast</h3>
                <div className="cast-list">
                  {movie.credits.cast.slice(0,6).map(c => (
                    <div key={c.cast_id} className="cast-item">{c.name}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;
