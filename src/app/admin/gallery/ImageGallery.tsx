import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IconButton, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Close as CloseIcon, Edit as EditIcon, Save as SaveIcon, ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

interface ImageData {
    id: string;
    url: string;
    name: string;
    group: string;
    createdAt: Date;
}

interface ImageGalleryProps {
    images: ImageData[];
    onDeleteImage: (id: string) => void;
    onUpdateImage: (updatedImage: ImageData) => void;
}

export default function ImageGallery({ images, onDeleteImage, onUpdateImage }: ImageGalleryProps) {
    const [previewImage, setPreviewImage] = useState<ImageData | null>(null);
    const [imageName, setImageName] = useState<string>('');
    const [imageGroup, setImageGroup] = useState<string>('');
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        if (previewImage) {
            const index = images.findIndex(image => image.id === previewImage.id);
            setCurrentIndex(index);
        }
    }, [previewImage, images]);

    const handleImageClick = (image: ImageData) => {
        setPreviewImage(image);
        setIsPreviewOpen(true);
    };

    const handleEditClick = (event: React.MouseEvent, image: ImageData) => {
        event.stopPropagation();
        setImageName(image.name);
        setImageGroup(image.group);
        setPreviewImage(image);
        setEditDialogOpen(true);
    };

    const handleClosePreview = () => {
        setIsPreviewOpen(false);
    };

    const handleSaveChanges = () => {
        if (previewImage) {
            const updatedImage: ImageData = {
                ...previewImage,
                name: imageName,
                group: imageGroup,
            };

            onUpdateImage(updatedImage);
            setEditDialogOpen(false);
        }
    };

    const showPreviousImage = () => {
        if (currentIndex > 0) {
            setPreviewImage(images[currentIndex - 1]);
        }
    };

    const showNextImage = () => {
        if (currentIndex < images.length - 1) {
            setPreviewImage(images[currentIndex + 1]);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="relative group overflow-hidden rounded-lg shadow-lg h-64 cursor-pointer"
                        onClick={() => handleImageClick(image)}
                    >
                        <div className="relative h-full w-full">
                            <Image
                                src={image.url}
                                alt={`Group: ${image.group}`}
                                fill
                                sizes="(max-width: 768px) 100vw,
                                        (max-width: 1200px) 50vw,
                                        25vw"
                                className="object-cover transition-transform transform group-hover:scale-105 duration-300 ease-in-out"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
                            <div className="absolute top-2 right-2 flex gap-2">
                                <IconButton
                                    onClick={(e) => handleEditClick(e, image)}
                                    color="inherit"
                                    className="bg-green-500 text-white"
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteImage(image.id);
                                    }}
                                    color="inherit"
                                    className="bg-red-500 rounded-full"
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                        />
                                    </svg>
                                </IconButton>
                            </div>
                            <span className="text-white text-sm">{`${image.group}`}</span>
                        </div>
                    </div>
                ))}
            </div>

            {isPreviewOpen && previewImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={handleClosePreview}>
                    <div className="relative w-full max-w-5xl max-h-full h-full bg-black p-2" onClick={(e) => e.stopPropagation()}>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleClosePreview}
                            aria-label="close"
                            className="w-full"
                        >
                            <CloseIcon fontSize="large" className='absolute top-0 right-0 z-10 text-slate-50' />
                        </IconButton>
                        <div className="relative w-full h-0 pb-[75%]">
                            <Image
                                src={previewImage.url}
                                alt={`Preview of ${previewImage.group}`}
                                layout="fill"
                                className="object-contain"
                            />
                        </div>
                        <div className="absolute inset-x-0 bottom-4 flex justify-between px-4">
                            <IconButton
                                onClick={showPreviousImage}
                                color="inherit"
                                disabled={currentIndex === 0}
                                className='text-slate-500'
                            >
                                <ArrowBackIcon fontSize="large" className='text-slate-50' />
                            </IconButton>
                            <IconButton
                                onClick={showNextImage}
                                color="inherit"
                                disabled={currentIndex === images.length - 1}
                            >
                                <ArrowForwardIcon fontSize="large" className='text-slate-50' />
                            </IconButton>
                        </div>
                    </div>
                </div>
            )}

            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Image Details</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Image Name"
                        value={imageName}
                        onChange={(e) => setImageName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Group"
                        value={imageGroup}
                        onChange={(e) => setImageGroup(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveChanges} color="primary" startIcon={<SaveIcon />}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
