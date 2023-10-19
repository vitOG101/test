"use client";
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'; 
import '@/components/slider/styles.css';
import Link from 'next/link';

function Slider({ slides }) {
  return (
    <div className="slider">
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {slides?.length ? slides.map((el, ind) => (
          <SwiperSlide key={ind}>
            <Link href={el.link ?? '#'} target='_blank'>
              <Image src={`/api${el.src}`} width={995} height={326} alt="" />
            </Link>
          </SwiperSlide>
        )): ''}
      </Swiper>
    </div>
  );
};

export default Slider;
