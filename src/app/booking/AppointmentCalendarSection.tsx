import React from 'react';
import AppointmentCalendar from './AppointmentCalendar';

interface AppointmentCalendarSectionProps {
    selectedDate: Date | null;
    disabledDates: Set<string>;
    onDateClick: (date: Date | null) => void;
    disabled: boolean; // Add this line
}

const AppointmentCalendarSection: React.FC<AppointmentCalendarSectionProps> = ({
    selectedDate,
    disabledDates,
    onDateClick,
    disabled // Add this line
}) => (
    <div className="p-4 bg-white rounded-lg border shadow-md w-full">
        <AppointmentCalendar
            selectedDate={selectedDate}
            setSelectedDate={onDateClick}
            disabledDates={disabledDates}
            onDateClick={onDateClick}
            disabled={disabled} // Pass the disabled prop
        />
    </div>
);

export default AppointmentCalendarSection;
