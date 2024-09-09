import { arrayRemove, arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { auth, firestore } from '../firebase.config'
import { toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { createUniqueIdentifier } from '../utils'

function NewsCard({ news }) {
  // news.url
  console.log(news)
  const [loading, SetLoading] = useState(false)
  const [user, setUser] = useState(null)

  async function add_to_fav() {

    try {
      SetLoading(true)
      const ref = doc(firestore, 'favourites', user.uid)

      const docSnap = await getDoc(ref)
      const d = docSnap.data()


      if (d?.favourites.length > 0) {

        await updateDoc(ref, {
          favourites: arrayUnion({
            id: createUniqueIdentifier(news),
            news: {
              ...news
            }
          }
          )
        })
      } else {
        await updateDoc(ref, {
          favourites: [{
            id: createUniqueIdentifier(news),
            news: {
              ...news
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
      const id = createUniqueIdentifier(news)
      const ref = doc(firestore, 'favourites', user.uid)

      const docSnap = await getDoc(ref)

      await updateDoc(ref, {
        favourites: arrayRemove({
          id: id,
          news: {
            ...news
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

  const [isFav, setIsFav] = useState(false)

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)

      }
    })






  }, [])

  useEffect(() => {

    (async () => {
      const ref = doc(firestore, 'favourites', user?.uid)
      const data = await getDoc(ref)

      if (data.exists()) {
        const d = data.data()
        if (d.favourites.length > 0) {
          const fav = d.favourites.find(fav => fav.id === createUniqueIdentifier(news))
          if (fav) {
            setIsFav(true)
          }
        }
      }

    })()
  }, [user])



  return (
    <div className="container mt-5 grid grid-cols-1 gap-8 my-auto ">
      <div className="relative flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none grid gap-2 item sm:grid-cols-2">
        <div className="relative bg-clip-border  overflow-hidden bg-white text-gray-700 shadow-lg m-0">
          <img src={news?.urlToImage || ''} alt="Revolutionizing Our Production Process" className="object-cover w-full h-full" />

        </div>
        <div className="p-6 px-2 sm:pr-6 sm:pl-4 relative">
          <p className="block antialiased font-sans text-sm font-light leading-normal text-inherit mb-4 !font-semibold">Technology</p><a href="#" className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mb-2 normal-case transition-colors hover:text-gray-700">{news?.title}</a>
          <p className="block antialiased font-sans text-base leading-relaxed text-inherit mb-8 font-normal !text-gray-500">{news.description}.</p>
          <div className="flex items-center gap-4"><img src="https://bucket.material-tailwind.com/magic-ai/6b1c5941d417a2a32baee89c2f3d1975d7d4fb81e486ed43dc1082ac54b0658b.jpg" className="inline-block relative object-cover object-center !rounded-full w-12 h-12 " />
            <div>
              <p className="block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-900 mb-0.5  capitalize">{news?.author
                || ""}</p>
              <p className="block antialiased font-sans text-sm leading-normal text-gray-700 font-normal">{news?.publishedAt}</p>
            </div>
          </div>
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
      </div>

    </div>
  )
}

export default NewsCard
