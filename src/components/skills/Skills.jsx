import React from 'react'
import './skills.css'
import { BsPatchCheckFill } from 'react-icons/bs'

const data_f =
  [
    {
      skill: "HTML",
      level: "Experienced"
    },
    {
      skill: "CSS",
      level: "Intermediate"
    },
    {
      skill: "Javascript",
      level: "Experienced"
    },
    {
      skill: "Bootstrap",
      level: "Intermediate"
    },
    {
      skill: "React.js",
      level: "Intermediate"
    },
    {
      skill: "Flutter",
      level: "Experienced"
    },
    {
      skill: "Android",
      level: "Intermediate"
    },
    {
      skill: "Tailwind",
      level: "Intermediate"
    },
    {
      skill: "Npm",
      level: "Intermediate"
    }
  ];

const data_b =
  [
    {
      skill: "Java",
      level: "Experienced"
    },
    {
      skill: "Node.js",
      level: "Experienced"
    },
    {
      skill: "MySQL",
      level: "Experienced"
    },
    {
      skill: "Python",
      level: "Experienced"
    },
    {
      skill: "GCP",
      level: "Experienced"
    },
    {
      skill: "Spring Boot",
      level: "Experienced"
    },
    {
      skill: "Docker",
      level: "Experienced"
    },
    {
      skill: "Jenkins",
      level: "Intermediate"
    },
    {
      skill: "MongoDB",
      level: "Intermediate"
    },
  ]

const Skills = () => {
  return (
    <section id='skills'>
      <h5>What skills I have</h5>
      <h2>My Skills</h2>

      <div className="container skills__container">
        <div className="skills__frontend">
          <h3>Frontend Development</h3>
          <div className="skills__content">
            {
              data_f.map(({ skill, level }) => {
                return (
                  <article className='skills__details'>
                    <BsPatchCheckFill className='skills__details-icon' />
                    <div>
                      <h4>{skill}</h4>
                      <small className='text-light'>{level}</small>
                    </div>
                  </article>
                )
              })
            }
          </div>
        </div>
        <div className="skills__backend">
          <h3>Backend Development</h3>
          <div className="skills__content">
          {
              data_b.map(({ skill, level }) => {
                return (
                  <article className='skills__details'>
                    <BsPatchCheckFill className='skills__details-icon' />
                    <div>
                      <h4>{skill}</h4>
                      <small className='text-light'>{level}</small>
                    </div>
                  </article>
                )
              })
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills