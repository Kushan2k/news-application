import React, { useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'

function LoginPage() {


  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const router = useNavigate()

  async function login() {

    if (!data.email || !data.password) {
      toast.error('Please fill all the fields')
      return
    }

    try {
      setLoading(true)

      const user = await signInWithEmailAndPassword(auth, data.email, data.password)
      localStorage.setItem('user', JSON.stringify(user))
      toast.success('Logged in successfully')
      router('/')
    } catch (error) {
      toast.error(error.message)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    if (auth.currentUser || localStorage.getItem('user')) {
      router('/')
    }
  }, [])
  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg overflow-hidden mx-auto lg:w-[90%]">
        <div className="hidden lg:block lg:w-1/2 bg-cover"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')` }}>
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input value={data.email} onChange={e => setData({ ...data, email: e.target.value })} className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>

            </div>
            <input value={data.password} onChange={e => setData({ ...data, password: e.target.value })} className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" />
          </div>
          <div className="mt-8">
            <button disabled={loading} onClick={() => {
              login()
            }} type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign In</button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link to="/register" className="text-xs text-gray-500 uppercase">or sign up</Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>

  )
}

export default LoginPage
