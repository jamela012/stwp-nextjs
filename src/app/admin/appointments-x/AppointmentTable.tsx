// import React, { useState, useMemo } from 'react';
// import { Appointment } from './type';

// interface AppointmentTableProps {
//     appointments: Appointment[];
//     onView: (appointment: Appointment) => void;
//     onEdit: (appointment: Appointment) => void;
//     onDelete: (appointmentId: string) => void;
//     loading: boolean;
//     error: string | null;
// }

// const AppointmentTable: React.FC<AppointmentTableProps> = ({
//     appointments,
//     onView,
//     onEdit,
//     onDelete,
//     loading,
//     error,
// }) => {
//     const [filterMonth, setFilterMonth] = useState<string | null>(null);
//     const [filterEvent, setFilterEvent] = useState<string | null>(null);
//     const [filterStatus, setFilterStatus] = useState<string | null>(null);
//     const [searchQuery, setSearchQuery] = useState<string>('');
//     const [sortColumn, setSortColumn] = useState<string>('date');
//     const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
//     const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);
//     const [isSortOpen, setIsSortOpen] = useState<boolean>(true);
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const rowsPerPage = 10;

//     const eventTypes = useMemo(() => {
//         const types = new Set<string>();
//         appointments.forEach((appointment) => types.add(appointment.event));
//         return Array.from(types).sort();
//     }, [appointments]);

//     const statuses = useMemo(() => {
//         const statusSet = new Set<string>();
//         appointments.forEach((appointment) => statusSet.add(appointment.status));
//         return Array.from(statusSet).sort();
//     }, [appointments]);

//     const filtered = useMemo(() => {
//         let filtered = [...appointments];

//         if (filterMonth) {
//             filtered = filtered.filter((appointment) => {
//                 const appointmentDate = new Date(appointment.date + ' ' + appointment.time);
//                 const filterDate = new Date(filterMonth);
//                 return appointmentDate.getMonth() === filterDate.getMonth() &&
//                     appointmentDate.getFullYear() === filterDate.getFullYear();
//             });
//         }

//         if (filterEvent) {
//             filtered = filtered.filter((appointment) =>
//                 appointment.event.toLowerCase() === filterEvent.toLowerCase()
//             );
//         }

//         if (filterStatus) {
//             filtered = filtered.filter((appointment) =>
//                 appointment.status.toLowerCase() === filterStatus.toLowerCase()
//             );
//         }

//         if (searchQuery) {
//             const query = searchQuery.toLowerCase();
//             filtered = filtered.filter((appointment) =>
//                 appointment.name.toLowerCase().includes(query) ||
//                 appointment.email.toLowerCase().includes(query) ||
//                 appointment.event.toLowerCase().includes(query) ||
//                 appointment.status.toLowerCase().includes(query)
//             );
//         }

//         filtered.sort((a, b) => {
//             const aDate = new Date(a.date + ' ' + a.time);
//             const bDate = new Date(b.date + ' ' + b.time);
//             const sortFactor = sortOrder === 'asc' ? 1 : -1;

//             if (sortColumn === 'date') {
//                 return (aDate.getTime() - bDate.getTime()) * sortFactor;
//             }

//             if (sortColumn === 'status') {
//                 return a.status.toLowerCase().localeCompare(b.status.toLowerCase()) * sortFactor;
//             }

//             if (sortColumn === 'event') {
//                 return a.event.toLowerCase().localeCompare(b.event.toLowerCase()) * sortFactor;
//             }

//             return 0;
//         });

//         return filtered;
//     }, [appointments, filterMonth, filterEvent, filterStatus, searchQuery, sortColumn, sortOrder]);


//     const totalPages = Math.ceil(filtered.length / rowsPerPage);

//     const paginatedAppointments = useMemo(() => {
//         const startIndex = (currentPage - 1) * rowsPerPage;
//         const endIndex = startIndex + rowsPerPage;
//         return filtered.slice(startIndex, endIndex);
//     }, [filtered, currentPage, rowsPerPage]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className="p-4">
//             {/* Filters, Sorting, and Search Components */}
//             <div className="mb-4">
//                 <button
//                     onClick={() => setIsFilterOpen(!isFilterOpen)}
//                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded mb-2 mr-2"
//                 >
//                     {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
//                 </button>
//                 {isFilterOpen && (
//                     <div className="mb-4 border rounded p-4 flex flex-wrap gap-4">
//                         <div className="mb-2 flex flex-col">
//                             <label className="mr-2">Filter by Month:</label>
//                             <input
//                                 type="month"
//                                 value={filterMonth || ''}
//                                 onChange={(e) => setFilterMonth(e.target.value || null)}
//                                 className="border rounded p-1"
//                             />
//                         </div>
//                         <div className="mb-2 flex flex-col">
//                             <label className="mr-2">Filter by Event Type:</label>
//                             <select
//                                 value={filterEvent || ''}
//                                 onChange={(e) => setFilterEvent(e.target.value || null)}
//                                 className="border rounded p-1"
//                             >
//                                 <option value="">All Events</option>
//                                 {eventTypes.map((type) => (
//                                     <option key={type} value={type}>{type}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="mb-2 flex flex-col">
//                             <label className="mr-2">Filter by Status:</label>
//                             <select
//                                 value={filterStatus || ''}
//                                 onChange={(e) => setFilterStatus(e.target.value || null)}
//                                 className="border rounded p-1"
//                             >
//                                 <option value="">All Statuses</option>
//                                 {statuses.map((status) => (
//                                     <option key={status} value={status}>{status}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//                 )}

//                 <button
//                     onClick={() => setIsSortOpen(!isSortOpen)}
//                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded mb-2"
//                 >
//                     {isSortOpen ? 'Hide Sorting' : 'Show Sorting'}
//                 </button>
//                 {isSortOpen && (
//                     <div className="mb-4 border rounded p-4">
//                         <select
//                             value={sortColumn}
//                             onChange={(e) => setSortColumn(e.target.value)}
//                             className="border rounded p-1 mb-2"
//                         >
//                             <option value="date">Date</option>
//                             <option value="status">Status</option>
//                             <option value="event">Event Type</option>
//                         </select>
//                         <select
//                             value={sortOrder}
//                             onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
//                             className="border rounded p-1"
//                         >
//                             <option value="asc">Ascending</option>
//                             <option value="desc">Descending</option>
//                         </select>
//                     </div>
//                 )}

//                 <div className="mb-4">
//                     <label className="mr-2">Search:</label>
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search..."
//                         className="border rounded p-1"
//                     />
//                 </div>
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white">
//                     <thead>
//                         <tr>
//                             <th className="py-2">Name</th>
//                             <th className="py-2">Email</th>
//                             <th className="py-2">Appointment</th>
//                             <th className="py-2">Event Type</th>
//                             <th className="py-2">Created At</th>
//                             <th className="py-2">Status</th>
//                             <th className="py-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {paginatedAppointments.map((appointment) => (
//                             <tr key={appointment.id}>
//                                 <td className="border px-4 py-2">{appointment.name}</td>
//                                 <td className="border px-4 py-2">{appointment.email}</td>
//                                 <td className="border px-4 py-2">
//                                     {new Date(appointment.date + ' ' + appointment.time).toLocaleString('en-US', {
//                                         month: '2-digit',
//                                         day: '2-digit',
//                                         year: 'numeric',
//                                         hour: '2-digit',
//                                         minute: '2-digit',
//                                         hour12: true,
//                                     })}
//                                 </td>
//                                 <td className="border px-4 py-2">{appointment.event}</td>
//                                 <td className="border px-4 py-2">
//                                     {new Date(appointment.createdAt).toLocaleString('en-US', {
//                                         month: '2-digit',
//                                         day: '2-digit',
//                                         year: 'numeric',
//                                         hour: '2-digit',
//                                         minute: '2-digit',
//                                         hour12: true,
//                                     })}
//                                 </td>
//                                 <td className="border px-4 py-2">{appointment.status}</td>
//                                 <td className="border px-4 py-2 flex space-x-2">
//                                     <button
//                                         onClick={() => onView(appointment)}
//                                         className="px-2 py-1 bg-green-500 text-white rounded"
//                                     >
//                                         View
//                                     </button>
//                                     <button
//                                         onClick={() => onEdit(appointment)}
//                                         className="px-2 py-1 bg-blue-500 text-white rounded"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => onDelete(appointment.id)}
//                                         className="px-2 py-1 bg-red-500 text-white rounded"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="flex justify-between items-center mt-4">
//                 <button
//                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
//                 >
//                     Previous
//                 </button>
//                 <div>
//                     Page {currentPage} of {totalPages}
//                 </div>
//                 <button
//                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>

//     );
// };

// export default AppointmentTable;