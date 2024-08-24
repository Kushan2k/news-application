
import React from 'react'
import ListItem from './cat-item'

const categories = [
  { title: "Business", id: 1 },
  { title: "Entertainment", id: 2 },
  { title: "General", id: 3 },
  { title: "Health", id: 4 },
  { title: "Science", id: 5 },
  { title: "Sports", id: 6 },
  { title: "Technology", id: 7 }
];
function Catagories() {
  return (
    <div className="flex flex-col">
      <div className="flex">

        <h2 className='text-3xl font-bold uppercase flex items-center'>

          Main Catagories
        </h2>
      </div>
      <div className="w-full mt-5">
        <ul className="space-y-3">
          {
            categories.map((cat, index) => {
              return <ListItem key={index} cat={cat} />
            })
          }

        </ul>
      </div>

    </div>
  )
}

export default Catagories
