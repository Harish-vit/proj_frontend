import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const genres = [
  'Politics', 'Technology', 'Sports', 'Entertainment',
  'Science', 'Health', 'Business', 'World',
  'Fashion', 'Food', 'Travel', 'Music',
  'Movies', 'Books', 'Art', 'Environment'
];

const GenreGrid = ({ selectedGenres, onGenreToggle }) => {
  const navigate = useNavigate();

  return (
    <div className="genre-grid">
      {genres.map(genre => (
        <label key={genre} className="genre-checkbox">
          <input
            type="checkbox"
            checked={selectedGenres.includes(genre)}
            onChange={() => onGenreToggle(genre)}
          />
          {genre}
        </label>
      ))}
      {selectedGenres.length > 0 && (
        <div className="ok-button-container">
          <Link to="/news">
            <button className="ok-button" onClick={() => navigate('/news')}>
              OK
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default GenreGrid;
