import React from 'react'

const Card = ({ data }) => {
  console.log(data);

  const readMore = (url) => {
    window.open(url, '_blank'); 
  }

  if (!Array.isArray(data)) {
    return <div>No data available.</div>;
  }

  return (
    <div className='cardContainer'>
      {data.map((curItem, index) => {
        if (!curItem.image) { 
          return null;
        } else {
          return (
            <div className='card' key={index}> 
              <img src={curItem.image} alt={curItem.title || 'Article Image'} /> 
              <div className='content'>
                <a
                  className='title'
                  onClick={() => readMore(curItem.url)}
                  style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }} 
                >
                  {curItem.title}
                </a>
                <p>{curItem.description}</p>
                <button onClick={() => readMore(curItem.url)}>Read More</button>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Card
