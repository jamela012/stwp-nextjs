'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './styles.css';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { db } from '@/app/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Box, Tabs, Tab, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ImageData {
    src: string;
    alt: string;
    group: string;
    groupImage?: string;
}

const DEFAULT_IMAGE_URL = '/shepherd-the-wedding-planner-logo.jpg';

export default function Gallery() {
    const [images, setImages] = useState<ImageData[]>([]);
    const [heroImages, setHeroImages] = useState<ImageData[]>([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [groupCoverImages, setGroupCoverImages] = useState<{ [key: string]: string }>({});
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [currentImageSet, setCurrentImageSet] = useState<ImageData[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'images'), (snapshot) => {
            const imageList = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    src: data.url || DEFAULT_IMAGE_URL,
                    alt: data.name || 'Image',
                    group: data.group || 'Default'
                };
            });

            setImages(imageList);

            const coverImages: { [key: string]: string } = {};
            imageList.forEach(image => {
                if (!coverImages[image.group]) {
                    coverImages[image.group] = image.src;
                }
            });
            setGroupCoverImages(coverImages);

            const shuffledImages = [...imageList].sort(() => Math.random() - 0.5);
            setHeroImages(shuffledImages.slice(0, 3));
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
        setSelectedGroup(null);
    };

    const handleGroupClick = (group: string) => {
        setSelectedGroup(group);
    };

    const handleBackClick = () => {
        setSelectedGroup(null);
    };

    const handleImageClick = (index: number, imageSet: ImageData[]) => {
        setPreviewIndex(index);
        setCurrentImageSet(imageSet);
        setIsPreviewOpen(true);
    };

    const handleClosePreview = () => {
        setIsPreviewOpen(false);
    };

    const handlePrevImage = () => {
        setPreviewIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : currentImageSet.length - 1));
    };

    const handleNextImage = () => {
        setPreviewIndex((prevIndex) => (prevIndex < currentImageSet.length - 1 ? prevIndex + 1 : 0));
    };

    const renderAllImages = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {images.map((image, index) => (
                <div key={index} className="relative w-full aspect-w-1 aspect-h-1 group cursor-pointer" onClick={() => handleImageClick(index, images)}>
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE_URL)}
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );

    const renderAlbums = () => {
        if (selectedGroup) {
            const filteredImages = images.filter((image) => image.group === selectedGroup);
            return (
                <div>
                    <div className="flex items-center mb-4">
                        <button onClick={handleBackClick} className="text-2xl text-gray-700 hover:text-gray-900">
                            &larr;
                        </button>
                        <h2 className="font-bold text-xl ml-2">{selectedGroup}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {filteredImages.map((image, index) => (
                            <div key={index} className="relative w-full aspect-w-1 aspect-h-1 group cursor-pointer" onClick={() => handleImageClick(index, filteredImages)}>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE_URL)}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else {
            const groups = Array.from(new Set(images.map((image) => image.group)));
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {groups.map((group) => {
                        const groupImage = groupCoverImages[group] || DEFAULT_IMAGE_URL;
                        return (
                            <div
                                key={group}
                                className="relative w-full h-48 cursor-pointer group"
                                onClick={() => handleGroupClick(group)}
                            >
                                <Image
                                    src={groupImage}
                                    alt={group}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE_URL)}
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold p-4">
                                    <span>{group}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
    };

    return (
        <div>
            {/* Hero Section */}
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
                    {heroImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative h-full w-full">
                                <div className="overlay"></div>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    quality={100}
                                    className="fixed-image"
                                    onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE_URL)}
                                    loading="lazy"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                
                <div className="absolute top-[60%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center">
                    <h1 className="text-white sm:text-5xl text-4xl font-medium">Our Gallery</h1>
                </div>
                <div className="custom-pagination swiper-pagination"></div>
            </div>

            {/* Tab Interface */}
            <Box className="container mx-auto p-4">
                <Box className="flex justify-center mb-5">
                    <Tabs value={selectedTab} onChange={handleChange} aria-label="gallery tabs">
                        <Tab label="All" />
                        <Tab label="Album" />
                    </Tabs>
                </Box>
                <div>
                    {selectedTab === 0 && renderAllImages()}
                    {selectedTab === 1 && renderAlbums()}
                </div>
            </Box>

            {/* Image Preview Modal */}
            <Dialog open={isPreviewOpen} onClose={handleClosePreview} maxWidth="lg" fullWidth className='relative'>
                {currentImageSet[previewIndex] ? (
                    <div className="h-svh bg-black">
                        <IconButton onClick={handleClosePreview} className="absolute top-4 right-4 text-white z-10">
                            <CloseIcon />
                        </IconButton>
                        <IconButton onClick={handlePrevImage} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white z-10">
                            <ArrowBackIosIcon />
                        </IconButton>
                        <IconButton onClick={handleNextImage} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white z-10">
                            <ArrowForwardIosIcon />
                        </IconButton>
                        <Image
                            src={currentImageSet[previewIndex].src}
                            alt={currentImageSet[previewIndex].alt}
                            fill
                            style={{ objectFit: 'contain' }}
                            className="absolute inset-0 w-full h-full"
                            onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE_URL)}
                            loading="lazy"
                        />
                    </div>
                ) : (
                    <div className="p-4">Image not found</div>
                )}
            </Dialog>
        </div>
    );
}
