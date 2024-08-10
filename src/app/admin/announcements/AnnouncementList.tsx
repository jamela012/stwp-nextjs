import { FC } from 'react';
import { Announcement } from './types';

interface AnnouncementListProps {
    announcements: Announcement[];
    onAnnouncementClick: (announcement: Announcement) => void;
    onEditClick: (announcement: Announcement) => void;
}

const AnnouncementList: FC<AnnouncementListProps> = ({ announcements, onAnnouncementClick, onEditClick }) => {
    const handleEditClick = (event: React.MouseEvent, announcement: Announcement) => {
        event.stopPropagation();
        onEditClick(announcement);
    };

    return (
        <div className="space-y-4">
            {announcements.map(announcement => (
                <div
                    key={announcement.id}
                    className="border relative p-4 rounded shadow-sm cursor-pointer hover:bg-gray-100"
                    onClick={() => onAnnouncementClick(announcement)}
                >
                    <h2 className="text-xl font-semibold">{announcement.title}</h2>
                    <p className="mt-2" dangerouslySetInnerHTML={{ __html: `${announcement.content.slice(0, 100)}...` }} />
                    <button
                        onClick={(event) => handleEditClick(event, announcement)}
                        className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    >
                        Edit
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AnnouncementList;
