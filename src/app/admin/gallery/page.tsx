'use client';
import { useState, useEffect } from 'react';
import ImageGallery from '../components/ImageGallery';
import ImageUpload from '../components/ImageUpload';
import { db } from '@/app/lib/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Tab, Tabs, Box } from '@mui/material';

interface ImageData {
    id: string;
    url: string;
    name: string;
    group: string;
    createdAt: Date;
}

export default function AdminGallery() {
    const [images, setImages] = useState<ImageData[]>([]);
    const [selectedTab, setSelectedTab] = useState(0);

    const fetchImages = async () => {
        const querySnapshot = await getDocs(collection(db, 'images'));
        const imageList = querySnapshot.docs.map((doc) => {
            const data = doc.data() as ImageData;
            return { ...data, id: doc.id }; // Ensure each image has an ID
        });
        setImages(imageList);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleUpload = (newImage: ImageData) => {
        setImages((prevImages) => [...prevImages, newImage]);
    };

    const handleDeleteImage = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'images', id));
            setImages(images.filter(image => image.id !== id));
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleUpdateImage = async (updatedImage: ImageData) => {
        try {
            await updateDoc(doc(db, 'images', updatedImage.id), {
                group: updatedImage.group,
                name: updatedImage.name
                // Add other fields that need to be updated
            });
            setImages(images.map(image => image.id === updatedImage.id ? updatedImage : image));
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const renderAllImages = () => (
        <ImageGallery images={images} onDeleteImage={handleDeleteImage} onUpdateImage={handleUpdateImage} />
    );

    const renderAlbums = () => {
        const groups = Array.from(new Set(images.map((image) => image.group)));
        return (
            <div className="space-y-4">
                {groups.map((group) => (
                    <div key={group} className="border rounded-lg p-4 shadow-lg">
                        <h2 className="font-bold text-xl mb-2">{group}</h2>
                        <ImageGallery images={images.filter((image) => image.group === group)} onDeleteImage={handleDeleteImage} onUpdateImage={handleUpdateImage} />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className='font-bold text-3xl mb-5 text-center'>Gallery</h1>
            <Box className="flex justify-center mb-5">
                <Tabs value={selectedTab} onChange={handleChange} aria-label="gallery tabs">
                    <Tab label="All" className="text-lg" />
                    <Tab label="Album" className="text-lg" />
                </Tabs>
            </Box>
            <div className="mb-5">
                <ImageUpload onUpload={handleUpload} />
            </div>
            {selectedTab === 0 && renderAllImages()}
            {selectedTab === 1 && renderAlbums()}
        </div>
    );
}
