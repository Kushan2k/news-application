import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {

  const pathname = useLocation()

  const active = 'bg-blue-700  rounded md:bg-transparent md:text-blue-700'
  return (

    <nav className="bg-white border border-gray-200 dark:border-gray-700 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 shadow h-14">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            News Application
          </span>
        </a>


        <div
          className="w-full flex md:w-auto justify-center items-center "

        >
          <ul className="flex mt-4  md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link
                to="/"
                className={`block text-black py-2 pr-4 pl-3  md:p-0 dark:text-white ${pathname.pathname === '/' ? active : ''}`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                className={`block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={`block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname.pathname === '/login' ? active : ''}`}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className={`block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname.pathname === '/register' ? active : ''}`}
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
