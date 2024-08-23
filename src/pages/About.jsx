import React from 'react'

import { Link, } from 'react-router-dom'


import { toast } from 'react-toastify';

function AboutPage() {
  // Function to handle a button click
  const handleButtonClick = () => {
    toast.info("Thanks for visiting our About Us page!");
  };

  return (
    <div className="about-page mt-10">
      <div className="about-content flex items-center justify-center flex-col">
        <h1 className='uppercase text-5xl font-semibold'>About Us</h1>
        <p className='text-justify'>Welcome to our website! We are dedicated to providing you with the best service possible
          Our team is passionate about creating exceptional products and delivering top-notch solutions to our customers.</p>
        <img
          src="https://st2.depositphotos.com/3591429/6006/i/450/depositphotos_60063963-stock-photo-people-discussing-about-us.jpg" // Replace with your image URL
          loading='lazy'
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
