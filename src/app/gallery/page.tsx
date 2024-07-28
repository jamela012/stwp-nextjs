'use client';

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

export default function Gallery() {

    const images = [
        { src: '/thumbnail.jpg', alt: 'Photo 1' },
        { src: '/home/cover.png', alt: 'Photo 2' },
        { src: '/services/services-cover.jpg', alt: 'Photo 3' },
    ];

    return (
        <div>
            <div className="hero-container">
                <Swiper
                    spaceBetween={0}
                    centeredSlides={true}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        el: '.custom-pagination'
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation, EffectFade]}
                    effect="fade"
                    speed={1000}
                    className="mySwiper h-full"
                >
                    <SwiperSlide>
                        <div className="relative h-full w-full">
                            <div className="overlay"></div>
                            <Image
                                src="/services/services-cover.jpg"
                                alt="Cover Image"
                                fill
                                style={{ objectFit: 'cover' }}
                                quality={100}
                                className="fixed-image"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative h-full w-full">
                            <div className="overlay"></div>
                            <Image
                                src="/thumbnail.jpg"
                                alt="Thumbnail Image"
                                fill
                                style={{ objectFit: 'cover' }}
                                quality={100}
                                className="fixed-image"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative h-full w-full">
                            <div className="overlay"></div>
                            <Image
                                src="/home/cover.png"
                                alt="Another Image"
                                fill
                                style={{ objectFit: 'cover' }}
                                quality={100}
                                className="fixed-image"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
                
                <div className="absolute top-[60%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center">
                    <h1 className="text-white sm:text-5xl text-4xl font-medium">Our Gallery</h1>
                </div>
                <div className="custom-pagination swiper-pagination"></div>

            </div>

            <div className="image-grid-container">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative w-full aspect-w-1 aspect-h-1">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
