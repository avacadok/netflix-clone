import React from 'react';

function Banner() {

  const shortenDescription = (string, num) => {
    return string.length > num ? string.substr(0, num -1 ) + '...' : string
  }
  return (
    <header className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://imgur.com/z9Nqlxx.png")`,
        backgroundPosition: 'center'
      }}>
      <div className='banner-content'>
        <h1 className='banner-title'>Movie Name</h1>
        <h1 className='banner-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio rerum consequatur suscipit sint consequuntur. Minus doloribus dolores repudiandae asperiores similique quae tenetur.
        </h1>

        <div className='banner-buttons'>
          <button className='banner-button play'><i class="fa-solid fa-play"></i> Play</button>
          <button className='banner-button more-info'><i class="fa-solid fa-circle-info"></i> More Info</button>
        </div>
      </div>

      <div className='banner-fade'></div>

    </header>
  )
}

export default Banner;