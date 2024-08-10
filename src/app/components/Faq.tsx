'use client';

import { useState } from "react";

// Define the types for the props
interface AccordionItemProps {
    title: string;
    content: string;
    isOpen: boolean;
    toggleAccordion: () => void;
}

const AccordionItem = ({ title, content, isOpen, toggleAccordion }: AccordionItemProps) => (
    <div className="w-full border rounded-md mb-4">
        {/* Accordion Header */}
        <button
            className="w-full flex justify-between items-center p-4 text-left border-b bg-slate-50 border border-orange-300 hover:bg-orange-100 transition-colors duration-300 active:bg-orange-100"
            onClick={toggleAccordion}
        >
            <span>{title}</span>
            <svg
                className={`w-4 h-4 transition-transform duration-300 transform ${
                isOpen ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                />
            </svg>
        </button>
        
        {/* Accordion Content */}
        {isOpen && (
            <div className="p-4 bg-slate-50">
                <p className="text-gray-700">{content}</p>
            </div>
        )}
    </div>
);

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            title: 'Do you provide event planning and services for locations outside of Batangas City?',
            content: 'Yes, We provide event planning and services outside Batangas City but that will depend on location.',
        },
        {
            title: 'Are there options available to customize the packages you offer to better suit specific preferences or requirements for our event?',
            content: 'We do customize packages depending on the needs, requirements & budget of the client. For more info, visit our office at "Don Florencio Village, Gov. Antonio Carpio Rd, Batangas, 4200 Batangas, Batangas City, Philippines, 4200."',
        },
        {
            title: 'What are your operating hours, and until what time are you typically open and available for inquiries or appointments??',
            content: 'We are open 8:00 am in the morning until 7:00 pm in the evening and may go beyond when there are scheduled appointments',
        },
        {
            title: 'What payment methods do you accept for your services?',
            content: 'We accept cash, Gcash or Online Banking transactions.',
        },
    ];

    const toggleAccordion = (index: number) => {
        setOpenIndex(prevIndex => prevIndex === index ? null : index);
    };

    return (
        <div className="sm:w-[70%] w-[90%]">
            {faqs.map((faq, index) => (
                <AccordionItem
                    key={index}
                    title={faq.title}
                    content={faq.content}
                    isOpen={openIndex === index}
                    toggleAccordion={() => toggleAccordion(index)}
                />
            ))}
        </div>
    );
}
