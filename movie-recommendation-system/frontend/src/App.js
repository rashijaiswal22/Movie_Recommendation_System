import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/movies')
      .then(response => {
        setMovies(response.data);
        if (response.data.length > 0) {
          setSelectedMovie(response.data[0]);
        }
      })
      .catch(err => console.error("Error in fetching movies list :", err));
  }, []);

  // to fetch poster 
  const fetchPoster = async (movieId) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY; 
      if (!apiKey) {
      throw new Error("TMDB API Key is missing in environment variables!");
    }
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
      
      const response = await axios.get(url);
      const posterPath = response.data.poster_path;
      
      return posterPath 
        ? `https://image.tmdb.org/t/p/w500/${posterPath}` 
        : 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500';
        
    } catch (error) {
      console.error(`Poster not found for movie ${movieId}:`, error);
      // Fallback image when network timeout
      return 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500';
    }  
  };

  // Recommend button action (Parallel Fetching)
  const handleRecommend = async () => {
    if (!selectedMovie) return;
    setLoading(true);
    setRecommendations([]);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/recommend', { movie: selectedMovie });
      const rawRecommendations = response.data;

      const detailedRecommendations = await Promise.all(
        rawRecommendations.map(async (movie) => {
          const posterUrl = await fetchPoster(movie.id);
          return { title: movie.title, poster: posterUrl };
        })
      );
      setRecommendations(detailedRecommendations);
    } catch (error) {
      console.error("Error getting recommendations :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎬 Movie Recommendation System</h1>
      </header>

      <div className="search-section">
        <label htmlFor="movie-select">Choose a movie you like:</label>
        <select 
          id="movie-select" 
          value={selectedMovie} 
          onChange={(e) => setSelectedMovie(e.target.value)}
          className="movie-dropdown"
        >
          {movies.length === 0 ? (
            <option style={{color: 'white'}}>Loading movies...</option>
          ) : (
            movies.map((movie, index) => (
              <option key={index} value={movie} style={{color: 'white', background: '#151521'}}>
                {movie}
              </option>
            ))
          )}
        </select>
        
        <button onClick={handleRecommend} className="recommend-btn" disabled={loading}>
          {loading ? 'Searching...' : 'Recommend'}
        </button>
      </div>

      {loading && <div className="loader">Finding best movies for you... 🍿</div>}

      {recommendations.length > 0 && (
        <div className="recommendations-container">
          <h2>Recommended Movies For You:</h2>
          <div className="movies-grid">
            {recommendations.map((movie, index) => {
              const isFallback = movie.poster.includes('unsplash.com');
              
              return (
                <div key={index} className="movie-card">
                  <img src={movie.poster} alt={movie.title} className="movie-poster" />
                  
                  {isFallback ? (
                    <div className="movie-title-fallback">
                      <span>🎬</span>
                      <p>{movie.title}</p>
                    </div>
                  ) : (
                    <div className="movie-title-overlay">
                      <p>{movie.title}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;