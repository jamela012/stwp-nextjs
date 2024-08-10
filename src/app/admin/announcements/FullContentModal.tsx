import { FC, Key } from 'react';
import { Announcement } from './types';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface FullContentModalProps {
    announcement: Announcement;
    onClose: () => void;
}

const FullContentModal: FC<FullContentModalProps> = ({ announcement, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full h-4xl max-w-5xl max-h-screen overflow-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">{announcement.title}</h2>
                {announcement.imageUrls && announcement.imageUrls.length > 0 && (
                    <div className="m-4 flex justify-center flex-wrap gap-2">
                        {announcement.imageUrls.map((url: string | StaticImport, index: Key | null | undefined) => (
                            <div key={index} className="relative w-60 h-60">
                                <Image
                                    src={url}
                                    alt={`Announcement Image ${index}`}
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div
                    className="prose p-10 m-4 border"
                    dangerouslySetInnerHTML={{ __html: announcement.content }}
                />
            </div>
        </div>
    );
};

export default FullContentModal;
