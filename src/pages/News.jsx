import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


const API_KEY = import.meta.env.VITE_NEWS_API_KEY
function News() {

  const { newsID } = useParams()

  const [news, setNews] = useState([])

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {

    (async () => {

      try {


        const resp = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${newsID}&apiKey=${API_KEY}`)

        const d = resp.data
        if (d.status === 'ok') {
          const l = []
          d.articles.forEach(article => {
            l.push(article)
          })

          setNews(l)
        }
        await new Promise((resolve, reject) => setTimeout(() => {
          resolve()
        }, 1000))

      } catch (error) {
        toast.warn('Failed to fetch news')
        navigate('/')

      } finally {
        setLoading(false)
      }

    })()

  }, [])
  return (
    <div className="p-5">
      {
        loading && (
          <div className="flex h-20 mt-10 items-center justify-center">
            <Loader2 size={50} className='animate-spin' />
          </div>
        )
      }
      {
        !loading && news?.map((article, index) => {
          return (
            <div key={index} className="bg-white p-5 rounded-md shadow-md">
              <h1 className="text-2xl font-bold">{article.title}</h1>
              <p className="text-gray-500">{article.description}</p>
              <a href={article.url} target="_blank" rel="noreferrer" className="text-blue-500">Read More</a>
            </div>
          )
        })
      }
    </div>
  )
}

export default News
