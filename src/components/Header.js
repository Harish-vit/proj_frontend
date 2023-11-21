import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <nav>
        <ul>
          <li ><Link to="/news" className='hedlink'>Home</Link ></li>
          <li><Link to="/genres" className='hedlink'>Genres</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
