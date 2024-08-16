// import React, { useState } from 'react';
// import AppointmentForm from './AppointmentForm';

// interface AppointmentFormSectionProps {
//     date: Date;
//     time: string;
//     appointmentId: string;
//     onClose: () => void;
//     onSubmit: (formData: any) => Promise<void>;
//     disabled: boolean; // Add this line
// }

// const AppointmentFormSection: React.FC<AppointmentFormSectionProps> = ({ date, time, appointmentId, onClose, onSubmit, disabled }) => {
//     const [loading, setLoading] = useState(false); // State to manage loading

//     const handleAppointmentSubmission = async (formData: any): Promise<void> => {
//         try {
//             setLoading(true); // Set loading to true before submission
//             await onSubmit(formData); // Call the passed onSubmit function
//             window.location.reload(); // Reload the page after successful submission
//         } catch (error) {
//             console.error('Error handling form submission:', error);
//         } finally {
//             setLoading(false); // Set loading to false after submission is complete
//         }
//     };
    

//     return (
//         <div className="flex justify-end items-end">
//             <AppointmentForm
//                 date={date}
//                 time={time}
//                 appointmentId={appointmentId}
//                 onClose={onClose}
//                 onSubmit={handleAppointmentSubmission} // Passing the function here
//                 disabled={loading} // Pass the loading state to the form
//             />
//             {loading && <div className="absolute inset-0 bg-gray-500 opacity-50 z-10"> {/* Loading overlay */} </div>}
//         </div>
//     );
// };

// export default AppointmentFormSection;
