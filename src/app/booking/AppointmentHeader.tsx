import React from 'react';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';

const AppointmentHeader = () => (
    <div className="absolute top-5">
        <Link href={'/contact-us'}>
            <ArrowBack className='text-black' />
        </Link>
    </div>
);

export default AppointmentHeader;
