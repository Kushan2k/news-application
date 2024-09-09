import React, { useEffect, useState } from 'react'
import { auth, firestore } from '../firebase.config';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AlertCircleIcon } from 'lucide-react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

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

                  <ListItem key={index} text={news.news.title} />

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


const ListItem = ({ text }) => {
  return (
    <li className="flex text-base text-body-color dark:text-dark-6">
      <span className="mr-2.5 mt-0.5 text-secondary">
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_980_24852)">
            <path
              d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.78125 19.4688 10 19.4688C15.2188 19.4688 19.4688 15.2188 19.4688 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.59375 18.0625 10.0312C18.0625 14.4375 14.4375 18.0625 10 18.0625Z"
              fill="currentColor"
            />
            <path
              d="M12.6875 7.09375L8.96875 10.7188L7.28125 9.0625C7 8.78125 6.5625 8.8125 6.28125 9.0625C6 9.34375 6.03125 9.78125 6.28125 10.0625L8.28125 12C8.46875 12.1875 8.71875 12.2813 8.96875 12.2813C9.21875 12.2813 9.46875 12.1875 9.65625 12L13.6875 8.125C13.9688 7.84375 13.9688 7.40625 13.6875 7.125C13.4063 6.84375 12.9688 6.84375 12.6875 7.09375Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_980_24852">
              <rect width={20} height={20} fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>
      {text}
    </li>
  );
};
