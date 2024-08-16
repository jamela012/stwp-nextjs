// import React from 'react';
// import EventIcon from '@mui/icons-material/Event';
// import { CalendarToday, AccessTime, LocationOn } from '@mui/icons-material';
// import AppointmentHeader from './AppointmentHeader';

// interface AppointmentDetailsProps {
//     selectedDate: Date | null;
//     selectedTime: string | null;
// }

// const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ selectedDate, selectedTime }) => (
//     <div className='h-full'>
//         <div className="p-6 max-w-md bg-white h-full rounded-lg flex flex-col justify-center space-y-4 relative border">
//             <AppointmentHeader />
//             <div className="flex items-center space-x-2 pb-3 border-b md:pt-0 pt-10">
//                 <h1 className="text-3xl font-bold text-gray-900">Shepherd The Wedding Planner</h1>
//             </div>
//             <div className="flex items-center space-x-2">
//                 <CalendarToday className="text-gray-500 text-xl" />
//                 <h1 className="text-2xl font-semibold text-gray-800">Appointment</h1>
//             </div>
//             <div className="flex items-center space-x-2">
//                 <AccessTime className="text-gray-500 text-xl" />
//                 <h3 className="text-base font-normal text-gray-700">1 hour</h3>
//             </div>
//             <div className="flex items-center space-x-2">
//                 <LocationOn className="text-gray-500 text-xl" />
//                 <h3 className="text-base font-normal text-gray-600">
//                     Q38F+C5Q Don Florencio Village, Gov. Antonio Carpio Rd, Batangas, 4200 Batangas
//                 </h3>
//             </div>
//             {selectedDate && (
//                 <div className="flex items-center space-x-2">
//                     <EventIcon className="text-gray-500 text-xl" />
//                     <h3 className="text-base font-normal text-gray-600">
//                         {selectedDate.toDateString()} {selectedTime && `at ${selectedTime}`}
//                     </h3>
//                 </div>
//             )}
//         </div>
//     </div>
// );

// export default AppointmentDetails;
