import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

interface ImageModalProps {
    imageUrl: string;
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export default function ImageModal({ imageUrl, isOpen, onClose, onDelete }: ImageModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative bg-white p-4 rounded-lg shadow-lg">
                <Image
                    src={imageUrl}
                    alt="Image Preview"
                    width={800}
                    height={600}
                    className="object-contain"
                />
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded"
                >
                    Close
                </button>
                <button
                    onClick={onDelete}
                    className="absolute bottom-2 right-2 bg-red-600 text-white p-1 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
