
import React, { useEffect, useState } from 'react'
import NewsCard from './news-card'
import { Loader, Newspaper } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY

function NewsBox() {

  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    (async () => {
      console.log(API_KEY)
      try {
        const resp = await axios.get(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${API_KEY}`)


        const data = resp.data

        if (data.status === 'ok') {

          console.log(data)
          let ar = []
          data.articles.forEach(article => {
            ar.push(article)
          })

          setNews(ar)
        }

      } catch (error) {
        console.log(error)
        toast.warn('Failed to fetch news')
      } finally {
        setLoading(false)
      }

    })()


  }, [])


  return (
    <section className="flex flex-col ">
      <h1 className="text-5xl uppercase font-bold flex items-center gap-4 justify-center">
        <Newspaper size={35} />
        Latest News
      </h1>
      {
        loading && (
          <div className="flex w-full items-center justify-center h-20 mt-10">
            <Loader className='animate-spin' size={50} />
          </div>
        )
      }
      {
        !loading && news?.map((article, index) => {
          return (<NewsCard key={index} news={article} />)
        })
      }

    </section>
  )
}

export default NewsBox
