import React from 'react'
import { Link } from 'react-router-dom'
import '../login.css'

function LoginPage() {
  return (
    // <div>
    //   login page
    //   <Link to={'/register'}>Register</Link>
    // </div>
    <div className="login-page">
      <div className="login-page-container">
        {/* Left side for image */}
        <div className="login-image">
          <img src="../assets/login.png" alt="Login" />
        </div>

        {/* Right side for form */}
        <div className="login-form">
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default LoginPage
