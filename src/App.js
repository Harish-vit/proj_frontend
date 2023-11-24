import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Login from './components/login/Log';
import Register from './components/register/Reg';
import GenreGrid from './components/register/Genregrid';
import NewsPage from './components/Newspage';
import Header from './components/Header';
import Footer from './components/Footer';
import All from './components/All';
import Profile from './components/Profile'; 

import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const [user, setLoginUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleGenreToggle = (genre) => {
    setSelectedGenres((prevGenres) => {
      if (prevGenres.includes(genre)) {
        return prevGenres.filter((g) => g !== genre);
      } else {
        return [...prevGenres, genre];
      }
    });
  };

  return (
    <div className="body">
      <Router>
        <Header isLoggedIn={isLoggedIn}/>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => setProgress(0)}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="blur-container">
                <Navigate to="/Login" />
              </div>
            }
          />
          <Route
            path="/Login"
            element={
              <div className="blur-container">
                <Login setIsLoggedIn={setIsLoggedIn} setLoginUser={setLoginUser} />
              </div>
            }
          />
          <Route
              path="/All" 
              element={<All setProgress={setProgress}/>}
          />
          <Route
            path="/Register"
            element={<div className="blur-container"><Register /></div>}
          />
          <Route
            path="/genres"
            element={<GenreGrid selectedGenres={selectedGenres} onGenreToggle={handleGenreToggle} />}
          />
          <Route
            path="/news"
            element={<NewsPage user={user} setProgress={setProgress} />}
          />
          <Route
            path="/profile" 
            element={<Profile user={user} setLoginUser={setLoginUser} />}
          />

        </Routes>
        </ErrorBoundary>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
