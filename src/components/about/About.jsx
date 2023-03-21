import React from 'react'
import './about.css'
import ME from '../../assets/me-about.jpg'
import { FaAward } from 'react-icons/fa'
import { TbCertificate } from 'react-icons/tb'
import { VscFolderLibrary } from 'react-icons/vsc'

const About = () => {
  return (
    <section id='about'>
      <h5>Get to know</h5>
      <h2>About me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <a href='#experience'>
              <article className='about__card'>

                <FaAward className='about__icon' />
                <h5>Experience</h5>
                <small>1+ year Working</small>
              </article>
            </a>

            <a href='#certifications'>
            <article className='about__card'>
              <TbCertificate className='about__icon' />
              <h5>Certifications</h5>
              <small>3x certfied</small>
            </article>
            </a>

            <a href='#portfolio'>
            <article className='about__card'>
              <VscFolderLibrary className='about__icon' />
              <h5>Projects</h5>
              <small>80+ Completed</small>
            </article>
            </a>
          </div>
          <p>
            I’m a software engineer specializing in building  robust and scalable software systems.
            With my expertise in designing and implementing server-side architecture, I am committed to delivering high-quality,
            reliable, and efficient solutions. I am passionate about leveraging the latest technologies and
            best practices to create exceptional digital experiences for end-users.
          </p>

          <a href='#contact' className='btn btn-primary'>Let's Talk</a>


        </div>
      </div>
    </section>
  )
}

export default About