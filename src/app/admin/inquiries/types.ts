import { Timestamp } from "firebase/firestore";

export interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    eventtype: string;
    eventdate: string;
    subject: string;
    message: string;
    read: boolean;
    createdAt: Timestamp;
}
