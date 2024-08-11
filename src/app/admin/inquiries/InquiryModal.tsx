import { FC } from 'react';
import { Inquiry } from './types';
import { Timestamp } from 'firebase/firestore';

function formatTimestampToDateString(timestamp: Timestamp) {
    if (timestamp) {
        const date = timestamp.toDate();
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    }
    return '';
}

interface InquiryModalProps {
    inquiry: Inquiry;
    onClose: () => void;
    onDelete: (id: string) => void;
}

const InquiryModal: FC<InquiryModalProps> = ({ inquiry, onClose, onDelete }) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full h-auto overflow-y-auto">
                <div className="border-b border-gray-200 pb-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">{inquiry.name}: {inquiry.subject}</h2>
                    <div className="text-gray-600 mb-2">
                        <div className='flex'>
                            <p className='mr-2 font-semibold'>Sender: </p>
                            <div>
                                <p className="font-medium">{inquiry.name}</p>
                                <p>
                                    <a 
                                        href={`mailto:${inquiry.email}?subject=Inquiry%20Regarding%20${encodeURIComponent(inquiry.subject)}`} 
                                        className="text-gray-600 hover:underline flex"
                                    >
                                        <p>{inquiry.email}</p>
                                        <svg className="p-1 w-6 h-6 text-gray-600 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
</svg>


                                    </a>
                                </p>

                                <p>{inquiry.phone}</p>
                            </div>
                        </div>
                        <div className='flex mt-2'>
                            <p className='mr-2 font-semibold'>Subject: </p>
                            <div>
                                <p className="font-medium">{inquiry.subject}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="text-sm bg-gray-100 p-4 rounded-md shadow-sm">
                        <p className='text-justify'>
                            Event: {inquiry.eventtype}
                        </p>
                        <p className='text-justify mb-1 border-b-2'>
                            Date: {inquiry.eventdate}
                        </p>
                        <p className='text-justify leading-relaxed'>
                            {inquiry.message}
                        </p>
                    </div>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                    <p><strong>Received on:</strong> {formatTimestampToDateString(inquiry.createdAt)}</p>
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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
    