import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div>
      login page
      <Link to={'/register'}>Register</Link>
    </div>

  )
}

export default LoginPage
