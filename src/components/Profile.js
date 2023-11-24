import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css'
const genres = [
  'Politics', 'Technology', 'Sports', 'Entertainment',
  'Science', 'Health', 'Business', 'World',
  'Fashion', 'Food', 'Travel', 'Music',
  'Movies', 'Books', 'Art', 'Environment'
];

const Profile = ({ user, setLoginUser }) => {
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState('');
  const [selectedGenres, setSelectedGenres] = useState(user.selectedGenres);
  const [allGenres, setAllGenres] = useState([]);
  const [error, setError] = useState(null);
  const [showGenresDropdown, setShowGenresDropdown] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    setAllGenres(genres);
  }, []);

  const handleEditName = async () => {
    try {
      const response = await axios.put(`https://proj-backend-evsx.onrender.com/user/editname`, { email: user.email, name });
      console.log(response);
      setLoginUser({ ...user, name });
      setError(null);
    } catch (error) {
      console.error('Error updating name:', error.message);
      setError('Error updating name. Please try again.');
    }
  };

  const handleEditPassword = async () => {
    try {
      const response = await axios.put(`https://proj-backend-evsx.onrender.com/user/editpassword`, { email: user.email, password });
      console.log(response);
      setLoginUser({ ...user, password });
      setError(null);
    } catch (error) {
      console.error('Error updating password:', error.message);
      setError('Error updating password. Please try again.');
    }
  };

  const handleAddSelectedGenre = async () => {
    try {
      const response = await axios.put(`https://proj-backend-evsx.onrender.com/user/addgenre`, { email: user.email, genre: selectedGenre });
      console.log(response);
      setLoginUser({ ...user, selectedGenres: [...selectedGenres, selectedGenre] });
      setError(null);
      setShowGenresDropdown(false);
    } catch (error) {
      console.error('Error adding genre:', error.message);
      setError('Error adding genre. Please try again.');
    }
  };

  const handleDeleteGenre = async (genre) => {
    try {
      const response = await axios.put(`https://proj-backend-evsx.onrender.com/user/deletegenre`, { email: user.email, genre });
      console.log(response);
      setLoginUser({ ...user, selectedGenres: selectedGenres.filter(g => g !== genre) });
      setError(null);
    } catch (error) {
      console.error('Error deleting genre:', error.message);
      setError('Error deleting genre. Please try again.');
    }
  };

  return (
    <div className='container'>
      <h2>Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleEditName}>Edit Name</button>
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={user.email}
          disabled
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleEditPassword}>Edit Password</button>
      </div>
      <div>
        <h4>Selected Genres:</h4>
        <ul>
          {selectedGenres.map((genre) => (
            <li key={genre}>
              {genre} <button className="delete-button" onClick={() => handleDeleteGenre(genre)}>Delete</button>
            </li>
          ))}
        </ul>
        <button className="add-genre-button" onClick={() => setShowGenresDropdown(!showGenresDropdown)}>Add Genre</button>
        {showGenresDropdown && (
          <div>
            <div className="genre-dropdown">
              <select onChange={(e) => setSelectedGenre(e.target.value)}>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            <button className="add-button" onClick={handleAddSelectedGenre}>Add</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
