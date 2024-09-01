import { useEffect } from 'react'
import { toast } from 'react-toastify';

// function ContactPage() {
//   return (
//     <div>
//       contact us
//     </div>
//   )
// }

// export default ContactPage
import React, { useState } from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom'
import '../App.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('There was an error sending your message!', error);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-image">
        <img 
         src="https://depositphotos.com/photo/selective-focus-cheerful-blonde-operator-headset-looking-camera-285780842.html"
         loading='lazy' 
         alt="Contact" 
         className='contact-page'/>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Message:</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
