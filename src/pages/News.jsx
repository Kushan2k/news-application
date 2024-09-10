import axios from 'axios'
import { onAuthStateChanged } from 'firebase/auth'
import { ArrowLeft, Heart, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useNavigation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, firestore } from '../firebase.config'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { createUniqueIdentifier } from '../utils'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
function News() {

  const { newsID } = useParams()

  const [news, setNews] = useState([])

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {

    (async () => {

      try {


        const resp = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${newsID}&apiKey=${API_KEY}`, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })

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
      <div className='flex items-center justify-start'>
        <Link to={'/'} className='flex items-center justify-center gap-3'>
          <ArrowLeft size={30} />
          Back to Home
        </Link>
      </div>
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
            <HorNewsCard key={index} article={article} />
          )
        })
      }
    </div>
  )
}

export default News


function HorNewsCard({ article }) {

  const [isFav, setIsFav] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, SetLoading] = useState(false)

  async function add_to_fav() {

    try {
      SetLoading(true)
      const ref = doc(firestore, 'favourites', user.uid)

      const docSnap = await getDoc(ref)
      const d = docSnap.data()


      if (d?.favourites.length > 0) {

        await updateDoc(ref, {
          favourites: arrayUnion({
            id: createUniqueIdentifier(article),
            news: {
              ...article
            }
          }
          )
        })
      } else {
        await updateDoc(ref, {
          favourites: [{
            id: createUniqueIdentifier(article),
            news: {
              ...article
            }
          }]
        })
      }
      setIsFav(true)
      toast.success("Added to favourites")
    } catch (error) {
      console.log(error)
      toast.warn("Something went wrong")
    } finally {
      SetLoading(false)
    }
  }

  async function remove_from_fav() {

    try {
      SetLoading(true)
      const id = createUniqueIdentifier(article)
      const ref = doc(firestore, 'favourites', user.uid)

      const docSnap = await getDoc(ref)

      await updateDoc(ref, {
        favourites: arrayRemove({
          id: id,
          news: {
            ...article
          }
        })
      })

      toast.success("Removed from favourites")
      setIsFav(false)


    } catch (error) {
      toast.warn("Something went wrong")
    } finally {
      SetLoading(false)
    }
  }

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)

      }
    })

  }, [])

  return (
    <div className="bg-white p-5 rounded-md my-2  shadow-md relative">
      <div className="absolute top-1 right-1">
        {
          user && (
            isFav ? (
              <button disabled={loading} onClick={() => {
                remove_from_fav()
              }} className='bg-transparent hover:scale-105 border-none p-3 absolute top-2 right-2 z-40'>
                {
                  loading ? (
                    <svg className="animate-spin border-b-2 rounded-full border-green-600 h-5 w-5" viewBox="0 0 24 24">

                    </svg>
                  ) : (
                    <Heart size={30} color='red' fill='red' className='hover:fill-white' />
                  )
                }

              </button>
            ) : (
              <button disabled={loading} onClick={
                () => {
                  add_to_fav()
                }
              } className='bg-transparent hover:scale-105 border-none p-3 absolute top-2 right-2 z-40'>
                {
                  loading ? (
                    <svg className="animate-spin border-b-2 rounded-full border-green-600 h-5 w-5" viewBox="0 0 24 24" >

                    </svg>
                  ) : (
                    <Heart size={30} color='red' className='hover:fill-red-600' />
                  )
                }

              </button>
            )
          )
        }
      </div>
      <small className='text-gray-500'>{article.publishedAt.split('T')[0]}</small>
      <br />
      <small className='text-gray-600 capitalize font-semibold'>{article.author}</small>
      <h1 className="text-xl font-bold">{article.title}</h1>
      <p className="text-gray-500">{article.description}</p>
      <a href={article.url} target="_blank" rel="noreferrer" className="text-blue-500">Read More</a>
    </div>
  )
}
