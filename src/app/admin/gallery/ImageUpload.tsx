import { ChangeEvent, DragEvent, useState } from 'react';
import { storage, db } from '@/app/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Input,
    Typography,
    LinearProgress
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface ImageUploadProps {
    onUpload: (newImage: ImageData) => void;
}

interface ImageData {
    id: string;
    url: string;
    name: string; // Field for image name
    group: string;
    createdAt: Date;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState<{ file: File; name: string }[]>([]);
    const [group, setGroup] = useState('');
    const [notifications, setNotifications] = useState<{ [key: string]: string }>({});
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setImages(prevImages => [
                ...prevImages,
                ...Array.from(files).map(file => ({ file, name: file.name }))
            ]);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files) {
            setImages(prevImages => [
                ...prevImages,
                ...Array.from(files).map(file => ({ file, name: file.name }))
            ]);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleUpload = async () => {
        if (images.length === 0) return;

        try {
            const uploadPromises = images.map(async ({ file, name }) => {
                const storageRef = ref(storage, `images/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(prevProgress => ({
                            ...prevProgress,
                            [name]: progress
                        }));
                    },
                    (error) => {
                        console.error('Error uploading image:', error);
                        setNotifications(prevNotifications => ({
                            ...prevNotifications,
                            [name]: 'Error uploading image. Please try again.'
                        }));
                    },
                    async () => {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);

                        // Generate a unique ID for the new image
                        const newImageId = new Date().getTime().toString(); // Or use a more robust ID generator

                        const newImage: ImageData = {
                            id: newImageId,
                            url,
                            name, // Use the file name
                            group,
                            createdAt: new Date(),
                        };

                        await addDoc(collection(db, 'images'), newImage);

                        onUpload(newImage);
                        setNotifications(prevNotifications => ({
                            ...prevNotifications,
                            [name]: 'Image uploaded successfully!'
                        }));
                    }
                );

                return uploadTask;
            });

            await Promise.all(uploadPromises);

            setImages([]);
            setGroup('');
            setOpen(false);
        } catch (error) {
            console.error('Error uploading images:', error);
            setNotifications({ general: 'Error uploading images. Please try again.' });
        }
    };

    const handleRemoveImage = (fileName: string) => {
        setImages(images.filter(image => image.file.name !== fileName));
        setUploadProgress(prevProgress => {
            const { [fileName]: _, ...rest } = prevProgress;
            return rest;
        });
        setNotifications(prevNotifications => {
            const { [fileName]: _, ...rest } = prevNotifications;
            return rest;
        });
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
                className="mb-4"
            >
                Upload Images
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle className="flex justify-between items-center">
                    Upload Images
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => setOpen(false)}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer mb-4"
                        role="region"
                        aria-label="Drag and drop images here or click to select"
                        tabIndex={0}
                    >
                        <input
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                            id="fileInput"
                        />
                        <label htmlFor="fileInput" className="cursor-pointer text-blue-500">
                            Drag & drop images here or click to select
                        </label>
                    </div>
                    <Input
                        type="text"
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                        placeholder="Album Name"
                        fullWidth
                        className="mb-4 border-gray-300 rounded-lg"
                    />
                    <div className="flex flex-col gap-4">
                        <Typography variant="h6" className="font-semibold">Selected Images</Typography>
                        {images.map(({ file, name }) => (
                            <div key={file.name} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                                <div className="flex-1">
                                    <Typography variant="subtitle2">
                                        <Input
                                            type="text"
                                            value={name}
                                            onChange={(e) => {
                                                setImages(images.map(img =>
                                                    img.file.name === file.name
                                                        ? { ...img, name: e.target.value }
                                                        : img
                                                ));
                                            }}
                                        />
                                    </Typography>
                                    {uploadProgress[name] !== undefined && (
                                        <div>
                                            <LinearProgress
                                                variant="determinate"
                                                value={uploadProgress[name]}
                                                className="my-2"
                                            />
                                            <Typography variant="caption">
                                                {uploadProgress[name].toFixed(2)}%
                                            </Typography>
                                        </div>
                                    )}
                                    {notifications[name] && (
                                        <Typography variant="caption" color="textSecondary">
                                            {notifications[name]}
                                        </Typography>
                                    )}
                                </div>
                                <IconButton edge="end" onClick={() => handleRemoveImage(file.name)}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} color="primary">
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
