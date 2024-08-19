import React, { useEffect } from 'react'
// import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// //import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../firebase.config';
//import { toast } from 'react-toastify';

// function AboutPage() {

// }
  

// export default AboutPage

//import React from 'react';
//import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'; // Import custom styles if needed

function AboutPage() {
  // Function to handle a button click
  const handleButtonClick = () => {
    toast.info("Thanks for visiting our About Us page!");
  };

  return (
    <div className="about-page">
      <div className="about-content">
        <h1>About Us</h1>
        <p>Welcome to our website! We are dedicated to providing you with the best service possible.</p>
        <p>Our team is passionate about creating exceptional products and delivering top-notch solutions to our customers.</p>
        <img
          src="../assets/aboutus.jpg" // Replace with your image URL
          alt="About Us"
          className="about-image"
        />
        <button onClick={handleButtonClick} className="about-button">
          Learn More
        </button>
      </div>
      <div className="about-footer">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default AboutPage;
