'use client';

import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { db, storage } from '@/app/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Editor } from '@tinymce/tinymce-react';

interface CreateAnnouncementModalProps {
    onClose: () => void;
    onAnnouncementCreated: () => void;
}

const CreateAnnouncementModal: FC<CreateAnnouncementModalProps> = ({ onClose, onAnnouncementCreated }) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [images, setImages] = useState<File[]>([]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedImages = Array.from(e.target.files);
            setImages(prevImages => [...prevImages, ...selectedImages]);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const imageUrlsPromises = images.map(async (image) => {
            const imageRef = ref(storage, `announcements/${image.name}`);
            await uploadBytes(imageRef, image);
            return await getDownloadURL(imageRef);
        });

        const urls = await Promise.all(imageUrlsPromises);

        await addDoc(collection(db, 'announcements'), {
            title,
            content,
            imageUrls: urls,
            timestamp: new Date(),
        });

        setTitle('');
        setContent('');
        setImages([]);
        onAnnouncementCreated();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full h-4xl max-w-5xl max-h-screen relative overflow-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                    &times;
                </button>
                <h2 className="text-3xl font-semibold mb-6">Create Announcement</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
                        <Editor
                            apiKey={process.env.TINYMCE_API_KEY}
                            value={content}
                            onEditorChange={(content) => setContent(content)}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
                                toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images:</label>
                        <input
                            id="images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:border-none file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded-lg file:cursor-pointer hover:file:bg-blue-600 transition-colors"
                        />
                        {images.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-4">
                                {images.map((image, index) => (
                                    <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Selected File ${index}`}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAnnouncementModal;
