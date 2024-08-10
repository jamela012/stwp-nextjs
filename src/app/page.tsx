'use client';
import Image from "next/image";
import Link from "next/link";
import Faq from "./components/Faq"
import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './styles.css';

import { Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';


export default function Home() {

  const images = [
    '/home/GLE_6600.jpg',
    '/home/2.jpg',
    '/home/DSC_1916.jpg',
    '/home/DSC_9783.jpg',
    '/home/JPV01766.jpg',
    '/home/JPV01784.jpg',
    '/home/lightss.jpg',
  ]

  return (
    <main>
      {/* Hero Section */}
      <div className="relative h-screen">
        <Image
          src={'/home/cover.png'}
          alt={'cover'}
          fill
          style={{objectFit: 'cover'}}
          quality={100}
          className="z-0"
        />
        <div className="bg-[rgba(165,126,87,0.9)] rounded-bottom-left w-[100%] sm:w-[510px] h-[550px] sm:h-[550px] absolute bottom-0 left-0 z-10 p-5 text-left">
          <div className="absolute top-24 sm:left-9 left-5 text-white z-10">
            <h1 className="hero-heading">
              Your Perfect
              <span className="text-block">Moment</span>
              <span className="text-block">Deserves A</span>
              <span className="text-block">Perfect Place</span>
            </h1>
            <p className="text-lg mt-5">We will ensure that your special <span className="text-block">day shines the brightest.</span></p>
            <Link href={'/contact-us'}>
              <button type="button" className="rounded-full mt-7 p-3 bg-white text-black text-sm flex items-center">
                <p>Learn More</p>
                <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-1 mt-16">
        <h1 className="text-3xl font-semibold text-center">Our Services</h1>
        <p className="text-center sm:text-base text-sm mt-5">
          Whether you are hosting a wedding, a birthday party, or any other milestone event, our dedicated team of expert planners
          <span className="lg:block inline">is here to turn your vision into a reality.</span>
        </p>

        <div className="flex flex-wrap items-center justify-center mt-5">
          {/* Card 1 */}
          <div className="md:w-[382px] md:h-[478px] w-[350px] h-[400px] relative bg-gray-900 group m-2">
            <Image
              src="/home/social.jpg"
              alt="Cover Image"
              fill
              style={{objectFit: 'cover'}}
              className="absolute inset-0 w-full h-full group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <div className="text-justify text-white p-5">
                <p className="text-lg uppercase">Social Celebration</p>
                <p className="py-2 mt-2 text-sm text-white">
                  Elevate your social events to new heights with our different packages for Social Celebrations. From Men Suits to Bridal & Evening Gowns, we offer a range of services tailored to make your celebration extraordinary.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="md:w-[382px] md:h-[478px] w-[350px] h-[400px] relative bg-gray-900 group m-2">
            <Image
              src="/home/wedding.jpg"
              alt="Cover Image"
              fill
              style={{objectFit: 'cover'}}
              className="absolute inset-0 w-full h-full group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <div className="text-left text-white p-5">
                <p className="text-lg uppercase">Wedding</p>
                <p className="px-4 py-2 mt-2 text-sm text-white">
                  Indulge in a wedding celebration like no other with our different all-inclusive packages. Elevate your special day with top-notch photo and video services, immersive visuals, and delightful decorations.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="md:w-[382px] md:h-[478px] w-[350px] h-[400px] relative bg-gray-900 group m-2">
            <Image
              src="/home/event.jpg"
              alt="Cover Image"
              fill
              style={{objectFit: 'cover'}}
              className="absolute inset-0 w-full h-full group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <div className="text-justify text-white p-5">
                <p className="text-lg uppercase">Shepherd&apos;s Event Garden</p>
                <p className="px-4 py-2 mt-2 text-sm text-white">
                  Enjoy your outdoor celebrations at Shepherd Event&apos;s Garden. Whether it&apos;s a wedding, social gathering, or corporate event, our picturesque venue provides the perfect backdrop for unforgettable moments.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/services" className="flex items-center justify-center mt-4">
          <p>Learn More</p>
          <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 12H5m14 0-4 4m4-4-4-4"/>
          </svg>
        </Link>
      </div>

      {/* LBYITL */}
      <div className="w-full h-auto z-0 bg-orange-50 py-10 mt-16">
        <div className="container mx-auto lg:px-32 px-5 flex flex-col md:flex-row">
          <div className="flex w-full md:w-[500px] mb-10 md:mb-0">
            <div className="flex flex-auto flex-col justify-center z-40">
              <h1 className="text-3xl font-bold flex flex-col justify-center pl-5 pr-3 text-center md:text-left">
                <span className="text-logo-color">Let&apos;s Bring </span>
                <span className="pl-3">Your Ideas To Life</span>
              </h1>
              <p className="pl-5 pr-2 mt-5 text-base font-light text-center md:text-left">
                Transform your vision into reality. Let us bring your ideas to life and create cherished memories that will be treasured for years to come.
              </p>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[500px] flex flex-1">
            <div className="w-[200px] h-[250px] md:w-[300px] md:h-[400px] absolute top-0 right-10 md:right-10 z-10 overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-110 sm:hover:z-30">
              <Image
                src={'/home/JPV01766.jpg'}
                alt="stwp image"
                fill
                style={{objectFit: 'cover'}}
              />
            </div>
            <div className="w-[240px] h-[200px] md:w-[360px] md:h-[350px] absolute bottom-0 left-[-300px] xl:left-10 z-20 overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-110">
              <Image
                src={'/home/GLE_7219.jpg'}
                alt="stwp image"
                fill
                style={{objectFit: 'cover'}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Event Section */}
      <div className="w-full flex flex-col items-center sm:mt-14 mt-64 px-1">
        <h1 className="text-3xl font-semibold text-center">Events</h1>
        <p className="text-center sm:text-base text-sm mt-5">
          Whether you&apos;re hosting a wedding, a birthday party, or any other milestone event, our dedicated team of expert planners
          <span className="lg:block inline">is here to turn your vision into a reality.</span>
        </p>
        <div className="h-[500px] w-10/12 mt-10">
          <Swiper
            slidesPerView={'auto'}
            centeredSlides={true}
            spaceBetween={15}
            loop={true}
            speed={800}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <Image 
                  src={src}
                  alt={`Cover Image ${index + 1}`}
                  width={400}
                  height={300}
                  quality={100}
                  className="block stroke-black"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* FAQ */}
      <div className="w-full bg-orange-50 flex flex-col justify-center items-center mt-14 px-1">
        <h1 className="text-3xl font-semibold text-center py-10">Frequently Asked Questions</h1>
        <Faq />
      </div>

    </main>
  );
}
