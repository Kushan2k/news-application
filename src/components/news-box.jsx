
import React from 'react'
import NewsCard from './news-card'
import { Newspaper } from 'lucide-react'

function NewsBox() {
  return (
    <section className="flex flex-col ">
      <h1 className="text-5xl uppercase font-bold flex items-center gap-4 justify-center">
        <Newspaper size={35} />
        Latest News
      </h1>
      <NewsCard news={null} />

    </section>
  )
}

export default NewsBox
