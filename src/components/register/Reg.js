import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GenreGrid from './Genregrid';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    selectedGenres: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleGenreToggle = (genre) => {
    setUser((prevUser) => ({
      ...prevUser,
      selectedGenres: prevUser.selectedGenres.includes(genre)
        ? prevUser.selectedGenres.filter((g) => g !== genre)
        : [...prevUser.selectedGenres, genre],
    }));
  };

  const register = async () => {
    const { name, email, password, selectedGenres } = user;
    if (name && email && password && selectedGenres.length > 0) {
      try {
        const userData = {
          name,
          email,
          password,
          selectedGenres,
        };
        const response = await axios.post('https://proj-backend-evsx.onrender.com/user/register', userData);
        console.log(response);
        navigate('/All');
      } catch (error) {
        console.error('Error during registration:', error);
      }
    } else {
      alert('Invalid input');
    }
  };

  return (
    <div className="login-body">
      <div className="login-center-container">
        <div className="login-form-container">
          <div className="login-header">Register Your Account</div>
          <div className="login-form">
            <div className="login-form-group">
              <div className="login-form-relative">
                <input
                  type="text"
                  id="name"
                  className="login-form-input"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div className="login-form-group">
              <div className="login-form-relative">
                <input
                  type="text"
                  id="email"
                  className="login-form-input"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="login-form-group">
              <div className="login-form-relative">
                <input
                  type="password"
                  id="password"
                  className="login-form-input"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login-form-group">
              <GenreGrid
                selectedGenres={user.selectedGenres}
                onGenreToggle={handleGenreToggle}
              />
            </div>
            <div className="button-container">
              <button
                type="button"
                className="login-button"
                onClick={register}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
