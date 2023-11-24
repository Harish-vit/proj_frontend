import React from 'react';

const genres = [
  'Entertainment', 'Technology', 'Sports', 'Politics',
  'Science', 'Health', 'Business', 'World',
  'Fashion', 'Food', 'Travel', 'Music',
  'Movies', 'Books', 'Art', 'Environment'
];

const GenreGrid = ({ selectedGenres, onGenreToggle }) => {
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
    </div>
  );
};

export default GenreGrid;
