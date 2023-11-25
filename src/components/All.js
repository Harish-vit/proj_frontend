import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const All = ({ setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const updateNews = async () => {
    try {
      setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=in&everything&apiKey=5c46782116ca42c4a8043dc3d6247a59&pageSize=50`;
      const response = await axios.get(url);
      const parsedData = response.data;
      setArticles(parsedData.articles);
      setLoading(false);
      setProgress(100);
      setCurrentPage(0);
    } catch (error) {
      console.error('Error fetching news data:', error.message);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => (prevPage > 0 ? prevPage - 1 : 0));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => (prevPage < Math.ceil(articles.length / 3) - 1 ? prevPage + 1 : prevPage));
  };

  useEffect(() => {
    document.title = `News - Top Headlines`;
    updateNews();
  }, []);

  return (
    <div>
      <div className="container my-3">
        <h1>Headlines</h1>
        {loading && <p>Loading...</p>}
        {!loading && articles.length === 0 && <p>No news available.</p>}
        {!loading && articles.length > 0 && (
          <div className='row'>
            {articles
              .slice(currentPage * 21, (currentPage + 1) * 21)
              .map((element, index) => (
                <div className='col-md-4' key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ''}
                    description={element.description ? element.description : ''}
                    urlToImage={element.urlToImage}
                    newsUrl={element.url}
                    source={element.source.name}
                  />
                  {(index + 1) % 3 === 0 && <div className="w-100"></div>}
                </div>
              ))}
          </div>
        )}
        {!loading && articles.length > 21 && (
          <div className="pagination-buttons d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-primary" onClick={handlePrevPage}>
              <FaArrowLeft /> Previous
            </button>
            <button className="btn btn-primary" onClick={handleNextPage}>
              Next <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default All;
