import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IconButton, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Close as CloseIcon, Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';

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
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
    const [imageName, setImageName] = useState<string>('');
    const [imageGroup, setImageGroup] = useState<string>('');
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    // Opens the image preview
    const handleImageClick = (image: ImageData) => {
        setPreviewImage(image);
        setImageDimensions(null); // Clear dimensions if they were set for a different image
    };

    // Opens the edit dialog
    const handleEditClick = (event: React.MouseEvent, image: ImageData) => {
        event.stopPropagation(); // Prevent the click event from propagating to the image click handler
        setImageName(image.name);
        setImageGroup(image.group);
        setPreviewImage(image); // Set the current image to edit
        setEditDialogOpen(true);
    };

    // Closes the preview
    const handleClosePreview = () => {
        setPreviewImage(null);
        setImageDimensions(null);
    };

    // Saves the changes made in the edit dialog
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

    useEffect(() => {
        if (previewImage) {
            const img = document.createElement('img');
            img.src = previewImage.url;
            img.onload = () => {
                setImageDimensions({ width: img.width, height: img.height });
            };
        }
    }, [previewImage]);

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="relative group overflow-hidden rounded-lg shadow-lg h-64 cursor-pointer"
                        onClick={() => handleImageClick(image)}
                    >
                        <Image
                            src={image.url}
                            alt={`Group: ${image.group}`}
                            fill
                            sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    25vw"
                            className="object-cover transition-transform transform group-hover:scale-105 duration-300 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
                            <div className="absolute top-2 right-2 flex gap-2">
                                <IconButton
                                    onClick={(e) => handleEditClick(e, image)}
                                    color="inherit"
                                    className='bg-green-500 text-white'
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteImage(image.id);
                                    }}
                                    color="inherit"
                                    className='bg-red-500 rounded-full'
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24">
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

            {previewImage && imageDimensions && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={handleClosePreview}
                >
                    <div
                        className="relative max-w-full max-h-full flex flex-col items-center justify-center bg-white p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleClosePreview}
                            aria-label="close"
                            className="absolute top-4 right-4 z-10"
                        >
                            <CloseIcon fontSize="large" />
                        </IconButton>
                        <div
                            style={{
                                maxWidth: '90vw',
                                maxHeight: '90vh',
                                overflow: 'hidden'
                            }}
                        >
                            <Image
                                src={previewImage.url}
                                alt={`Preview of ${previewImage.group}`}
                                width={imageDimensions.width}
                                height={imageDimensions.height}
                                style={{ objectFit: 'contain' }}
                            />
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
