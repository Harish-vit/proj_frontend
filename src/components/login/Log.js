import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoginUser, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
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

  const login = async () => {
    try {
      const response = await axios.post('https://newsapp-be.onrender.com/user/login', user);
      alert(response.data.message);
      setLoginUser(response.data.user);
      setIsLoggedIn(true);
      navigate('/All');
    } catch (error) {
      console.error('Login failed:', error.message);
      setLoginUser({});
    }
  };
  

  return (
    <div className="login-body">
      <div className="login-center-container">
        <div className="login-form-container">
          <div className="login-header">
            Login To Your Account
          </div>
          <div className="login-form">
            <form action="#" autoComplete="off">
              <div className="login-form-group">
                <div className="login-form-relative">
                  <input
                    type="text"
                    id="login-sign-in-email"
                    className="login-form-input"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    autoComplete='username'
                  />
                </div>
              </div>
              <div className="login-form-group">
                <div className="login-form-relative">
                  <input
                    type="password"
                    id="login-sign-in-password"
                    className="login-form-input"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Your password"
                    autoComplete='current-password'
                  />
                </div>
              </div>
              <div className="login-form-group">
                <button
                  type="button"
                  className="login-button"
                  onClick={login}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="login-form-group login-flex items-center justify-center mt-6">
            <a
              href="#"
              className="login-register-link text-gray-300"
              onClick={() => navigate('/Register')}
            >
              <span className="login-ml-2">You don't have an account?</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
