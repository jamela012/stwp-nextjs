// utils/dateUtils.ts

export const formatDateToFirestore = (date: Date): string => {
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
