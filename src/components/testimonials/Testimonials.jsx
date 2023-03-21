import React from 'react'
import './testimonials.css'
import AVTR1 from '../../assets/avatar1.jpg'
import AVTR2 from '../../assets/avatar2.jpg'
import AVTR3 from '../../assets/avatar3.jpg'
import AVTR4 from '../../assets/avatar4.jpg'

// import Swiper core and required modules
import {Pagination} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


const data = [
  {
    avatar: AVTR1,
    name: 'Paraj Bhattacharya',
    review: 'I had the privilege of being acquainted with Gourav during our time in college, where he consistently demonstrated a strong work ethic, exceptional communication skills, and an unyielding commitment to achieving excellence.'
  },
  {
    avatar: AVTR2,
    name: 'Earnest Achiever',
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam illo distinctio asperiores autem consequuntur reiciendis odio voluptatem molestias. Ex, temporibus.'
  },
  {
    avatar: AVTR3,
    name: 'Earnest Achiever',
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam illo distinctio asperiores autem consequuntur reiciendis odio voluptatem molestias. Ex, temporibus.'
  },
  {
    avatar: AVTR4,
    name: 'Earnest Achiever',
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam illo distinctio asperiores autem consequuntur reiciendis odio voluptatem molestias. Ex, temporibus.'
  }
]

const Testimonials = () => {
  return (
    <section id='testimonials'>
      <h5>Review from clients</h5>
      <h2>Testimonials</h2>

      <Swiper className="container testimonials__container"
      // install Swiper modules
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {
          data.map(({ avatar, name, review }) => {
            return (
              <SwiperSlide className='testimonial'>
                <div className="client__avatar">
                  <img src={avatar} alt='Avatar One' />
                </div>
                <h5 className='client__name'>{name}</h5>
                <small className='client__review'>
                  {review}
                </small>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </section>
  )
}

export default Testimonials