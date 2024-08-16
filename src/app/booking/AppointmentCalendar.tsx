import Calendar, { CalendarProps } from 'react-calendar';

interface AppointmentCalendarProps {
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    disabledDates: Set<string>;
    onDateClick: (date: Date | null) => void;
    disabled: boolean; // Add this line
}

const AppointmentCalendar = ({
    selectedDate,
    setSelectedDate,
    disabledDates,
    onDateClick,
    disabled // Add this line
}: AppointmentCalendarProps) => {

    const formatDateToFirestore = (date: Date): string => {
        const philippineOffset = 8 * 60; // Philippines is UTC+8
        const localOffset = date.getTimezoneOffset();
        const offsetDifference = philippineOffset - localOffset;
    
        // Convert date to Philippine Time
        const localDate = new Date(date.getTime() + offsetDifference * 60 * 1000);
    
        // Set to midnight in Philippine time
        localDate.setUTCHours(0, 0, 0, 0);
    
        // Convert to local date string in YYYY-MM-DD format
        return localDate.toISOString().split('T')[0];
    };

    const handleDateChange: CalendarProps['onChange'] = (value) => {
        if (!disabled) { // Only allow date change if not disabled
            if (value instanceof Date) {
                onDateClick(value); // Call onDateClick when a date is clicked
                setSelectedDate(value);
            } else if (Array.isArray(value) && value.length === 2) {
                onDateClick(value[0]); // Call onDateClick when a date is clicked
                setSelectedDate(value[0]);
            } else {
                onDateClick(null); // Call onDateClick with null
                setSelectedDate(null);
            }
        }
    };

    const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            return (
                date < today ||
                date.toDateString() === today.toDateString() ||
                date.toDateString() === tomorrow.toDateString()
            );
        }
        return false;
    };

    const tileClassName = ({ date }: { date: Date }) => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const dateStr = formatDateToFirestore(date);
    
        if (date.toDateString() === today.toDateString()) {
            // Today: special styling, disabled but with a different text color
            return 'calendar-tile calendar-tile--today';
        }
    
        if (date < today || date.toDateString() === tomorrow.toDateString()) {
            // Previous dates and tomorrow: gray text, no background
            return 'calendar-tile calendar-tile--disabled';
        }
    
        if (disabledDates.has(dateStr)) {
            // Fully booked dates: red background
            return 'calendar-tile calendar-tile--fully-booked';
        }
    
        return 'calendar-tile';
    };
    

    return (
        <div className="w-full">
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileDisabled={tileDisabled} // Disable specific dates
                tileClassName={tileClassName}
                className="w-full"
                calendarType='gregory'
            />
        </div>
    );
};

export default AppointmentCalendar;
