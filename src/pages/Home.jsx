import React from 'react'
import Catagories from '../components/catagories'
import NewsBox from '../components/news-box'
import FavoriteBox from '../components/fav-box'

function HomePage() {
  return (
    <div className="p-5 grid grid-cols-1 md:grid-cols-5 mt-5 gap-5 ">

      <div className=''>
        <Catagories />
      </div>
      <div className='md:col-span-4 lg:col-span-3'>
        <NewsBox />
      </div>
      <div className='hidden lg:flex'>
        <FavoriteBox />
      </div>

    </div>
  )
}

export default HomePage
