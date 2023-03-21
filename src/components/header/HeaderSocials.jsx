import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'
import {FaHackerrank} from 'react-icons/fa'
const HeaderSocials = () => {
  return (
    <div className='header_socials'>
        <a href='https://www.linkedin.com/in/gourav-sarkar-439026191/' target="blank"><BsLinkedin/></a>
        <a href='https://github.com/Gourav2000' target="blank"><FaGithub/></a>
        <a href='https://www.hackerrank.com/sarkargourav000?hr_r=1' target="blank"><FaHackerrank/></a>
    </div>
  )
}

export default HeaderSocials