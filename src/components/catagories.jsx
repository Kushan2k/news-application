
import React from 'react'
import ListItem from './cat-item'

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
          <ListItem cat={{ id: 123, text: "It is a long established fact reader" }} />
          <ListItem cat={{ text: "It is a long established fact reader", id: 3435 }} />
          <ListItem cat={{ text: "The point of using Lorem Ipsum", id: 5454 }} />
          <ListItem cat={{ text: "There are many variations of passages", id: 898 }} />
          <ListItem cat={{ text: "If you are going to use a of Lorem", id: 5643 }} />
        </ul>
      </div>

    </div>
  )
}

export default Catagories
