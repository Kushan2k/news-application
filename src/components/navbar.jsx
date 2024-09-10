import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify'
import { LogOut, Plus } from 'lucide-react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';

function Navbar() {

  const pathname = useLocation()
  const router = useNavigate()

  async function logout() {

    try {
      await signOut(auth)
      toast.success('Logged out successfully')
      localStorage.removeItem('user')
      router('/', { replace: true })
    } catch (error) {
      toast.warn('Failed to logout')
    }
  }

  const active = 'bg-blue-700 text-white hover:bg-blue-600  rounded md:bg-transparent md:text-blue-700'

  const [loggedin, SetLoggedIn] = useState(false)

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'))

    onAuthStateChanged(auth, (user) => {

      if (user) {
        SetLoggedIn(true)
        return
      }
    })


    if (user) {
      SetLoggedIn(true)
      return
    }

  }, [])
  return (

    <nav className="bg-white mb-10 md:mb-0  px-2 sm:px-4 py-2.5 dark:bg-gray-800 h-16">
      <div className="container relative flex flex-wrap justify-between items-center mx-auto md:pt-5">
        <a href="/" className="flex items-center">
          <span className="self-center flex items-center gap-2 text-xl font-semibold whitespace-nowrap dark:text-white">
            <img src='https://png.pngtree.com/png-vector/20221127/ourmid/pngtree-digital-media-play-button-gradient-color-hexagon-marketing-agency-mobile-app-png-image_6482499.png' width={50} height={50} alt='logo' loading='lazy' />
            <span className='font-bold'>NewsPulse</span> <Plus />
          </span>
        </a>


        <div
          className="w-full flex md:w-auto justify-center items-center "

        >
          <ul className="flex mt-4  md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link
                to="/"
                className={`block  py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname.pathname === '/' ? active : ''}`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block py-2  pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname.pathname === '/about' ? active : ''}`}
              >
                About
              </Link>
            </li>
            {
              !loggedin && (
                <>
                  <li>
                    <Link
                      to="/login"
                      className={`block py-2  pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname.pathname === '/login' ? active : ''}`}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className={`block py-2 pr-4  pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname.pathname === '/register' ? active : ''}`}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )
            }
            <li>
              <Link
                to="/contact"
                className={`block py-2 pr-4 pl-3  text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname.pathname === '/contact' ? active : ''}`}
              >
                Contact
              </Link>
            </li>
            {
              loggedin && (
                <>
                  <li>
                    <button
                      onClick={() => {
                        confirmAlert(
                          {
                            title: 'Logout',
                            message: 'Are you sure you want to logout?',
                            buttons: [
                              {
                                label: 'Yes',
                                onClick: () => {
                                  logout()
                                  SetLoggedIn(false)
                                }
                              },
                              {
                                label: 'No',
                                onClick: () => { }
                              }
                            ]
                          }
                        )
                      }}
                      className={`block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname.pathname === '/login' ? active : ''}`}
                    >
                      <LogOut />
                    </button>
                  </li>

                </>
              )
            }
          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
