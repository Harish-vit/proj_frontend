import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

const NewsPage = ({ selectedGenres, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateNews = async () => {
    try {
      if (selectedGenres.length === 0) {
        setArticles([]); 
        setLoading(false);
        return;
      }

      setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=in&${selectedGenres.map(genre => `category=${genre}`).join('&')}&apiKey=5c46782116ca42c4a8043dc3d6247a59`;
      const response = await axios.get(url);
      const parsedData = response.data;
      setArticles(parsedData.articles);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error('Error fetching news data:', error.message);
    }
  };

  useEffect(() => {
    document.title = `News - Top Headlines`;
    updateNews();
  }, [selectedGenres]);

  return (
    <div>
      <div className="container my-3">
        <h1>Headlines</h1>
        {loading && <p>Loading...</p>}
        {!loading && articles.length === 0 && <p>No news available for the selected genres.</p>}
        {!loading && articles.length > 0 && (
          <div className='row'>
            {articles.map((element) => (
              <div className='col-md-4' key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ''}
                  description={element.description ? element.description : ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
