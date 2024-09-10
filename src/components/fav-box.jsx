import React, { useEffect, useState } from 'react'
import { auth, firestore } from '../firebase.config';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AlertCircleIcon, CircleCheck, X } from 'lucide-react';
import { arrayRemove, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { createUniqueIdentifier } from '../utils';

function FavoriteBox() {

  const [favourites, setFavourites] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const fetch_fav = async () => {


    const ref = doc(firestore, 'favourites', user.uid)

    const data = await getDoc(ref)

    if (data.exists()) {
      setFavourites(data.data().favourites)
    }

    onSnapshot(ref, (doc) => {
      setFavourites(doc.data().favourites)
    })
    setLoading(false)


  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  useEffect(() => {


    fetch_fav()

  }, [user])

  // useEffect(() => [
  //   fetch_fav()
  // ], [user])

  return (
    <div>
      <h2 className='text-3xl uppercase font-bold text-end'>My Favourites</h2>

      {
        user ? (
          <div className="w-full mt-5">
            {
              loading && (
                <div className='w-full h-20 flex items-center justify-center'>
                  <svg className="animate-spin border-b-2 rounded-full border-green-600 h-5 w-5 " viewBox="0 0 24 24">

                  </svg>
                </div>
              )
            }
            {
              !loading && favourites.length === 0 && (
                <p className='text-center font-semibold capitalize text-yellow-500'>No favourites found!</p>
              )
            }
            <ul className="space-y-3 flex items-center justify-end flex-col">
              {
                !loading && favourites.length > 0 && favourites.map((news, index) => (

                  <ListItem user={user} key={index} art={news.news} />

                ))
              }
            </ul>
          </div>
        ) : (
          <div className="mt-5 w-full">
            <p className='text-yellow-600 text-md'>You need to login first to view your favourites</p>
            <p>you can login in <Link to={'/login'} className='text-blue-600'>Here</Link></p>
          </div>
        )
      }
    </div>

  )
}

export default FavoriteBox


const ListItem = ({ art, user }) => {

  async function remove_from_fav() {

    try {

      const id = createUniqueIdentifier(art)
      const ref = doc(firestore, 'favourites', user.uid)

      await updateDoc(ref, {
        favourites: arrayRemove({
          id: id,
          news: {
            ...art
          }
        })
      })

      toast.success("Removed from favourites")

    } catch (error) {
      toast.warn("Something went wrong")
    }
  }

  return (
    <li className="flex text-base text-body-color dark:text-dark-6">
      <span className="mr-2.5 mt-0.5 text-secondary ">

        <button onClick={() => {
          remove_from_fav()
        }} className='border-none bg-transparent  transition-colors hover:bg-red-500 '>
          <X size={25} className='text-red-600 hover:text-white' />
        </button>


      </span>


      {art.title}
    </li>
  );
};
