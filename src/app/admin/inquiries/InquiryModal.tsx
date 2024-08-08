import { FC } from 'react';
import { Inquiry } from './types';

interface InquiryModalProps {
    inquiry: Inquiry;
    onClose: () => void;
    onDelete: (id: string) => void;
}

const InquiryModal: FC<InquiryModalProps> = ({ inquiry, onClose, onDelete }) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-semibold mb-4">Inquiry Details</h2>
                <div className="mb-4">
                    <p><strong>Name:</strong> {inquiry.name}</p>
                    <p><strong>Subject:</strong> {inquiry.subject}</p>
                    <p><strong>Status:</strong> {inquiry.read ? 'Read' : 'Unread'}</p>
                    {/* Add other inquiry details here */}
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => onDelete(inquiry.id)}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InquiryModal;
