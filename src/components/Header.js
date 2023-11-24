import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <Link to="/All" className='hedlink'>Home</Link>
          </li>
          {isLoggedIn && (
            <>
              <li><Link to="/news" className='hedlink'>My Feed</Link></li>
              <li><Link to="/profile" className='hedlink'>Profile</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
