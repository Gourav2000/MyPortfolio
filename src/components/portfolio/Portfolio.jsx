import React from 'react'
import './portfolio.css'
import IMG1 from '../../assets/portfolio1.jpg'
import IMG2 from '../../assets/portfolio2.jpg'
import IMG3 from '../../assets/portfolio3.jpg'
import IMG4 from '../../assets/portfolio4.jpg'
import IMG5 from '../../assets/portfolio5.jpg'
import IMG6 from '../../assets/portfolio6.jpg'
import IMG7 from '../../assets/portfolio7.jpg'
import IMG8 from '../../assets/portfolio8.jpg'
import IMG9 from '../../assets/portfolio9.jpg'

//data
const data=[
  {
    id:1,
    image: IMG1,
    title: 'Covid-19_status',
    github:'https://github.com/Gourav2000/Covid-19_status',
    demo:'https://github.com/Gourav2000/Covid-19_status'
  },
  {
    id:2,
    image: IMG2,
    title: 'doc_scanner',
    github:'https://github.com/Gourav2000/doc_scanner',
    demo:'https://github.com/Gourav2000/doc_scanner'
  },
  {
    id:3,
    image: IMG3,
    title: 'Spring to Flask',
    github:'https://github.com/Gourav2000/Spring2Flask.git',
    demo:'https://github.com/Gourav2000/Spring2Flask.git'
  },
  {
    id:4,
    image: IMG4,
    title: 'Api_toxicity',
    github:'https://github.com/Gourav2000/Api_toxicity',
    demo:'https://github.com/Gourav2000/Api_toxicity'
  },
  {
    id:5,
    image: IMG5,
    title: 'KeyLogger-Spyware--Python',
    github:'https://github.com/Gourav2000/KeyLogger-Spyware--Python',
    demo:'https://github.com/Gourav2000/KeyLogger-Spyware--Python'
  },
  {
    id:6,
    image: IMG6,
    title: 'Windows_Wifi_Password_Extraction',
    github:'https://github.com/Gourav2000/Windows_Wifi_Password_Extraction',
    demo:'https://github.com/Gourav2000/Windows_Wifi_Password_Extraction'
  },
  {
    id:7,
    image: IMG7,
    title: 'Chat-app_using_firebase',
    github:'https://github.com/Gourav2000/Chat-app_using_firebase',
    demo:'https://github.com/Gourav2000/Chat-app_using_firebase'
  },
  {
    id:8,
    image: IMG8,
    title: 'MorseCode_translator',
    github:'https://github.com/Gourav2000/MorseCode_translator',
    demo:'https://github.com/Gourav2000/MorseCode_translator'
  },
  {
    id:9,
    image: IMG9,
    title: 'autotype',
    github:'https://github.com/Gourav2000/autotype',
    demo:'https://github.com/Gourav2000/autotype'
  },
]



const Portfolio = () => {
  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio__container">
        {
          data.map(({id, image, title, github, demo})=> {
          return (
            <article key={id} className='portfolio__item'>
              <div className="portfolio__item-image">
                <img src={image} alt={title} />
              </div>
              <h3>{title}</h3>
              <div className="portfolio__item-cta">
                <a href={github} className='btn'>Github</a>
                <a href={demo} className='btn btn-primary' target='_blank'>Live Demo</a>
              </div>
            </article>
          )
          })
        }
        
      </div>
    </section>
  )
}

export default Portfolio