import { sendEmailVerification, User } from 'firebase/auth';
import Swal from 'sweetalert2';

export const useEmailVerification = () => {
    const handleEmailVerification = async (user: User) => {
        try {
            await sendEmailVerification(user);
            Swal.fire({
                icon: 'info',
                title: 'Email Verification Sent',
                text: 'Please check your email to verify your account.',
            });
        } catch (error) {
            console.error('Error sending email verification:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to send email verification.',
            });
        }
    };

    return { handleEmailVerification };
};
