import React from 'react'
import './experience.css'
import { RxTriangleRight } from 'react-icons/rx'
import { useState } from 'react'

const data = [
    {
        title: "Software Engineer",
        work: [
            "Working in backend for a product that consumes user provided excel to surveys for NORC at the University of Chicago(National Opinion Research Center).",
            "Designed and implemented scalable APIs and background workers using java Spring Boot, MySQL and Cron.",
            "Continuous Integration/Deployment Pipeline Integration, pull requests, code reviews, load/stress testing."
        ],
        place: "Nagpur, India",
        time: "02/2022 - Current"
    },
    {
        title: "Software Developer, Intern",
        work: [
            "Adorae: Mobile social application development (Flutter/ Android Native). Worked on a social fashion networking app that allows users to share photos of their outfits and tag the brands they are wearing so that other users can browse and also purchase from the linked website. <a href='https://play.google.com/store/apps/details?id=in.applore.adorae'>Playstore link</a>",
            "JK Maintenance App: Dashboard development(Flutter/ React/ MongoDB/ Nodejs). Worked on an application developed for the convenience of the JK tyres employees. Assigning tasks, creating checklists, maintaining the calendar, raising tickets and much more in one place."
        ],
        place: "Noida, India",
        time: "03/2021 - 09/2021"
    },
    {
        title: "Backend Developer, Intern",
        work: [
            "Researched and Architected to build an internal tool that creates personalized first lines for cold emailing based on LinkedIn profiles.",
            "Led a team of interns, including FrontEnd and Backend, to create an end-to-end working product deployed on GCP."
        ],
        place: "Kolkata, India",
        time: "12/2020 - 03/2021"
    }
]

const Experience = () => {
    const [index, setIndex]=  useState(0);

    window.addEventListener('load', function() {
        document.querySelectorAll('.experience__details')[0].classList.add('active');
      });

    

    const updateIndex= (i)=>{
        document.querySelectorAll('.experience__details').forEach(function(element,key) {
            element.classList.remove('active');
            
          }); 
        
          document.querySelectorAll('.experience__details')[i].classList.add('active');
          setIndex(i);
    }

    return (

        <section id='experience'>
            <h5>Where I've Worked</h5>
            <h2>My experience</h2>

            <div className="container experience__container">
                <div className="experience__company__names">
                    <div className="experience__content">
                        <article className='experience__details' onClick={() => updateIndex(0,this)}>
                            <div>
                                <h4>Persistent Systems</h4>
                            </div>
                        </article>
                        <article className='experience__details' onClick={() => updateIndex(1, this)}>
                            <div>
                                <h4>Applore Technologies</h4>
                            </div>
                        </article>
                        <article className='experience__details' onClick={() => updateIndex(2, this)}>
                            <div>
                                <h4>Bizamps</h4>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="experience__company_work">
                    <div className="experience__content">
                        <article className='experience__details__work'>
                            <div className='experience__details__points'>
                                <div className="experience__details_title_place_time">
                                    <h4>{data[index].title}</h4>
                                    <div className="experience__details_place_time">
                                        <h5><i>{data[index].place}</i></h5>
                                        <h5>{data[index].time}</h5>
                                    </div>
                                </div>
                                <ul className='custom-bullets'>
                                    {data[index].work.map((item, indexi) => (
                                        <li key={indexi}><small>{item}</small></li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience