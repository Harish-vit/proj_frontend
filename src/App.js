// Import necessary components and libraries
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Login from './components/login/Log';
import Register from './components/register/Reg';
import GenreGrid from './components/Genregrid';
import NewsPage from './components/Newspage';
import Header from './components/Header';
import Footer from './components/Footer';

// Define the main App component
function App() {
  const [user, setLoginUser] = useState({});
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [progress, setProgress] = useState(0);  // Add this line

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
        <Header/>
        <Routes>
          <Route
            path="/"
            element={user && user._id ? (
              <Navigate to="/genres" />
            ) : (
              <div className="blur-container">
                <Navigate to="/Login" />
              </div>
            )}
          />
          <Route
            path="/Login"
            element={
              <div className="blur-container">
                <Login setLoginUser={setLoginUser} />
              </div>
            }
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
            element={<NewsPage selectedGenres={selectedGenres} setProgress={setProgress} />}
          />
          {/* Add a default route to redirect to /Login */}
          <Route
            index
            element={<Navigate to="/Login" />}
          />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

// Export the App component
export default App;
