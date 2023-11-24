import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewsItem = ({ title, description, urlToImage, newsUrl, source }) => {
  return (
    <div>
      
      <div className="card mb-3" style={{ width: '18rem' }}>
        {urlToImage && <img src={urlToImage} className="card-img-top" alt="News" />}
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">Source: {source}</p>
          <a href={newsUrl} className="btn btn-primary"target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
