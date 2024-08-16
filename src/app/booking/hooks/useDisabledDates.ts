// ./booking/hooks/useDisabledDates.ts

import { useState, useEffect } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export const useDisabledDates = () => {
    const [disabledDates, setDisabledDates] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchDisabledDates = async () => {
            const appointmentsRef = collection(db, 'appointments');
            const q = query(appointmentsRef);
            const querySnapshot = await getDocs(q);

            const dateCountMap: Record<string, number> = {};

            querySnapshot.forEach(doc => {
                const data = doc.data();
                const dateStr = data.date;
                dateCountMap[dateStr] = (dateCountMap[dateStr] || 0) + 1;
            });

            const disabled = new Set(
                Object.keys(dateCountMap).filter(dateStr => dateCountMap[dateStr] >= 2)
            );

            setDisabledDates(disabled);
        };

        fetchDisabledDates();
    }, []);

    return disabledDates;
};
