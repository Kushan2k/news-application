
import React, { useEffect, useState } from 'react'
import NewsCard from './news-card'
import { AlertCircleIcon, Loader, Newspaper } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { auth, firestore } from '../firebase.config'
import { onAuthStateChanged } from 'firebase/auth'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY

function NewsBox() {

  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [text, setText] = useState('')



  async function seach() {

    if (!text || text === '') {
      toast.warn('Please enter a search term')
      return
    }
    try {
      setLoading(true)
      const resp = await axios.get(`https://newsapi.org/v2/everything?q=${text}&apiKey=${API_KEY}`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })


      const data = resp.data

      if (data.status === 'ok') {

        // console.log(data)
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
  }


  useEffect(() => {

    (async () => {

      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
        }
      })
      try {

        const resp = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })


        const data = resp.data

        if (data.status === 'ok') {

          // console.log(data)
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
      <div className='mt-5'>
        <div className="flex items-center justify-center gap-4">
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="p-2 w-96 border-2 border-gray-300 rounded-md" placeholder="Search" />
          <button onClick={seach} className="bg-black text-white p-2 rounded-md">Search</button>
        </div>
      </div>
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
