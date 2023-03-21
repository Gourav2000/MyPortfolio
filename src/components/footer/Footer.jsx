import React from 'react'
import './footer.css'
import {FaFacebook} from 'react-icons/fa'
import {FiInstagram} from 'react-icons/fi'
import {IoLogoTwitter} from 'react-icons/io'

const Footer = () => {
  return (
    <footer>
      <a href="#" className='footer__logo'>Gourav Sarkar</a>
      <ul className='permalinks'>
        <li><a href='#'>Home</a></li>
        <li><a href='#about'>About</a></li>
        <li><a href='#experience'>Experience</a></li>
        <li><a href='#certifications'>Certifications</a></li>
        <li><a href='#portfolio'>Portfolio</a></li>
        <li><a href='#testimonials'>Testimonials</a></li>
        <li><a href='#contact'>Contact</a></li>
      </ul>

      <div className="footer__socials">
        <a href='https://www.facebook.com/gourav.sarkar.391/'><FaFacebook/></a>
        <a href='https://www.instagram.com/gouravsarkar.391/'><FiInstagram/></a>
        <a href='https://twitter.com/GouravS52630387'><IoLogoTwitter/></a>
      </div>

      <div className="footer__copyright">
        <small>All Rights Reserved.</small>
      </div>
    </footer>
  )
}

export default Footer