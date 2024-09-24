import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';


const Newsapp = () => {
  const [search, setSearch] = useState('india');
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const getData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://gnews.io/api/v4/search', {
        params: {
          q: search,
          token: process.env.API_KEY, 
          lang: 'en',
          page: currentPage,
          max: pageSize, 
        },
      });

      if (response.data.articles) {
        setNewsData(response.data.articles);
      } else {
        console.error('No articles found in response:', response.data);
        setNewsData([]);
        setError('No articles found.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('An unexpected error occurred.');
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [search, currentPage]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1); 
    getData();
  };

  const handleCategoryClick = (category) => {
    setSearch(category);
    setCurrentPage(1);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (newsData.length === pageSize) { 
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div>
      <nav style={styles.nav}>
        <div>
          <h1>Trendy News</h1>
        </div>
        <ul style={styles.navList}>
          <li><a href="#" style={styles.navLink}>All News</a></li>
          <li><a href="#" style={styles.navLink}>Trending</a></li>
        </ul>
        <div className="searchBar" style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleInput}
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button}>Search</button>
        </div>
      </nav>
      <div>
        <p className="head" style={styles.head}>Stay Updated with TrendyNews</p>
      </div>
      <div className="categoryBtn" style={styles.categoryBtn}>
        <button onClick={() => handleCategoryClick('sports')} style={styles.categoryButton}>Sports</button>
        <button onClick={() => handleCategoryClick('politics')} style={styles.categoryButton}>Politics</button>
        <button onClick={() => handleCategoryClick('entertainment')} style={styles.categoryButton}>Entertainment</button>
        <button onClick={() => handleCategoryClick('health')} style={styles.categoryButton}>Health</button>
        <button onClick={() => handleCategoryClick('fitness')} style={styles.categoryButton}>Fitness</button>
      </div>

      <div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && newsData.length > 0 ? <Card data={newsData} /> : null}
      </div>
      <div style={styles.pagination}>
        <button onClick={handlePrev} disabled={currentPage === 1} style={styles.paginationButton}>Prev</button>
        <span style={styles.pageInfo}>Page {currentPage}</span>
        <button onClick={handleNext} disabled={newsData.length < pageSize} style={styles.paginationButton}>Next</button>
      </div>
    </div>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f8f8',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '11px',
    margin: 0,
    padding: 0,
  },
  navLink: {
    fontWeight: 600,
    fontSize: '17px',
    textDecoration: 'none',
    color: '#333',
    cursor: 'pointer',
  },
  searchBar: {
    display: 'flex',
    gap: '5px',
  },
  input: {
    padding: '5px',
    fontSize: '16px',
  },
  button: {
    padding: '5px 10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  head: {
    textAlign: 'center',
    margin: '20px 0',
    fontSize: '24px',
  },
  categoryBtn: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  categoryButton: {
    padding: '8px 16px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    margin: '20px 0',
  },
  paginationButton: {
    padding: '8px 16px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  pageInfo: {
    fontSize: '16px',
  },
};

export default Newsapp;
