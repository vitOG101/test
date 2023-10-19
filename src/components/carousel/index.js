"use client";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '@/components/carousel/styles.css';
import Link from 'next/link';

function Carousel({ items }) {
    return (
        <section className="carousel">
            <h2>Sponsored by:</h2>
            <Swiper
                spaceBetween={50}
                slidesPerView={7}
            >
                {items?.length ? items.map((el, ind) => (
                <SwiperSlide key={ind}>
                    <Link href={el.link ?? '#'} target='_blank'>
                        <Image src={`/api${el.src}`} width={115} height={115} alt={`slide${ind}`} />
                    </Link>
                </SwiperSlide>
                )): ''}
            </Swiper>
        </section>
    )
}

export default Carousel;
