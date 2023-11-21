import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css'; // Make sure to import the correct CSS file

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async () => {
    const { name, email, password } = user;
    if (name && email && password) {
      try {
        const response = await axios.post('https://news-users-pjt.onrender.com/user/register', user);
        console.log(response);
        navigate('/Login');
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
