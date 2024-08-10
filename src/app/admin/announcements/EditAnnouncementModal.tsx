'use client';

import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/app/lib/firebase';
import Image from 'next/image';
import { Editor } from '@tinymce/tinymce-react';

interface EditAnnouncementModalProps {
    announcement: any;
    onClose: () => void;
    onAnnouncementUpdated: () => void;
}

const ImagePreview: FC<{ url: string; onDelete: () => void }> = ({ url, onDelete }) => (
    <div className="relative inline-block w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shadow-md">
        <Image
            src={url}
            width={96}
            height={96}
            alt="Image Preview"
            className="object-cover w-full h-full"
        />
        <button
            type="button"
            onClick={onDelete}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
        >
            &times;
        </button>
    </div>
);

const EditAnnouncementModal: FC<EditAnnouncementModalProps> = ({ announcement, onClose, onAnnouncementUpdated }) => {
    const [editTitle, setEditTitle] = useState<string>(announcement.title);
    const [editContent, setEditContent] = useState<string>(announcement.content);
    const [editImages, setEditImages] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>(announcement.imageUrls || []);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setEditImages((prev) => [...prev, ...files]);

            const previews = files.map(file => URL.createObjectURL(file));
            setImagePreviews((prev) => [...prev, ...previews]);
        }
    };

    const handleImageDelete = async (index: number) => {
        const urlToDelete = existingImages[index];
        if (urlToDelete) {
            try {
                const pathToDelete = extractPathFromUrl(urlToDelete);
                if (pathToDelete) {
                    const imageRef = ref(storage, pathToDelete);
                    await deleteObject(imageRef);
                }
                setExistingImages((prev) => prev.filter((_, i) => i !== index));
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const uploadedImageUrls: string[] = await uploadNewImages(editImages);
            const allImages = [...existingImages, ...uploadedImageUrls];
            
            await updateDoc(doc(db, 'announcements', announcement.id), {
                title: editTitle,
                content: editContent,
                imageUrls: allImages,
            });

            onAnnouncementUpdated();
            onClose();
        } catch (error) {
            console.error('Error updating announcement:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteImages(existingImages);
            await deleteDoc(doc(db, 'announcements', announcement.id));
            onAnnouncementUpdated();
            onClose();
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    const uploadNewImages = async (images: File[]): Promise<string[]> => {
        const urls = await Promise.all(
            images.map(async (image) => {
                const imageRef = ref(storage, `announcements/${image.name}`);
                await uploadBytes(imageRef, image);
                return await getDownloadURL(imageRef);
            })
        );
        return urls;
    };

    const deleteImages = async (urls: string[]) => {
        await Promise.all(
            urls.map(async (url) => {
                const pathToDelete = extractPathFromUrl(url);
                if (pathToDelete) {
                    const imageRef = ref(storage, pathToDelete);
                    await deleteObject(imageRef);
                }
            })
        );
    };

    const extractPathFromUrl = (url: string) => url.replace(/^gs:\/\/[^\/]+\/([^\/]+\/.+)$/, '$1');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full h-4xl max-w-5xl max-h-screen relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-6">Edit Announcement</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-4">
                        <label htmlFor="editTitle" className="block text-sm font-medium text-gray-700">Title:</label>
                        <input
                            id="editTitle"
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            required
                            className="mt-1 block p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="editContent" className="block text-sm font-medium text-gray-700">Content:</label>
                        <Editor
                            apiKey={process.env.TINYMCE_API_KEY}
                            value={editContent}
                            onEditorChange={(content) => setEditContent(content)}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
                                toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="editImage" className="block text-sm font-medium text-gray-700">Images:</label>
                        <input
                            id="editImage"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:rounded-lg file:p-2 file:text-sm file:text-white file:font-medium file:bg-blue-500 hover:file:bg-gray-100"
                        />
                        <div className="mt-4 flex flex-wrap gap-4">
                            {imagePreviews.map((preview, index) => (
                                <ImagePreview
                                    key={`preview-${index}`}
                                    url={preview} 
                                    onDelete={() => {
                                        setImagePreviews(prev => prev.filter((_, i) => i !== index));
                                        setEditImages(prev => prev.filter((_, i) => i !== index));
                                    }}
                                />
                            ))}
                            {existingImages.map((url, index) => (
                                <ImagePreview
                                    key={`existing-${index}`}
                                    url={url}
                                    onDelete={() => handleImageDelete(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAnnouncementModal;
