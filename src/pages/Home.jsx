import React from 'react'

function HomePage() {
  return (
    <div className="p-5 mt-5 flex w-full flex-col md:flex-row">
      <div className='md:w-1/6'>
        <h1 className="text-3xl font-semibold uppercase">Categories</h1>
      </div>
      <div className='md:w-1/2'>
        <h1 className="text-3xl font-semibold uppercase text-center">Feed</h1>
      </div>
      <div className='md:w-2/6'>
        <h1 className="text-3xl font-semibold uppercase text-end">Related</h1>
      </div>
    </div>
  )
}

export default HomePage
