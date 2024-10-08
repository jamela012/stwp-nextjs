import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const {
            name,
            email,
            phone,
            event,
            address,
            church,
            receptionArea,
            numberOfGuests,
            message,
            date,
            time,
            appointmentId  // Ensure this is included in the request body
        } = await request.json();

        // Check if appointmentId is defined
        if (!appointmentId) {
            throw new Error('Appointment ID is missing');
        }

        // Ensure environment variables are set
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error('Email configuration is missing');
        }

        // Format the date
        const formattedDate = new Date(date).toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Configure nodemailer transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // const baseURL = process.env.NODE_ENV === 'production'
        // ? process.env.NEXT_PUBLIC_PROD_URL
        // : process.env.NEXT_PUBLIC_DEV_URL;

        // const baseURL = process.env.NEXT_PUBLIC_DEV_URL; //for dev
        const baseURL = process.env.NEXT_PUBLIC_PROD_URL; //for PROD
        // const baseURL = process.env.NEXT_PUBLIC_DEV_URL; //for LOCAL


        const mailOptions = {
            from: `"Shepherd The Wedding Planner" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Appointment Confirmation at Shepherd The Wedding Planner',
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background-color: #f4f4f4;
        }
        .container {
            width: 90%;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            max-width: 150px;
            height: auto;
        }
        .content {
            margin-bottom: 20px;
        }
        .content h2 {
            font-size: 18px;
            color: #333;
        }
        .content p {
            font-size: 14px;
            line-height: 1.6;
        }
        .content ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .content ul li {
            margin-bottom: 10px;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            color: #fff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 14px;
            margin-top: 10px;
            text-align: center;
            display: block;
        }
        .footer {
            font-size: 12px;
            color: #777;
            text-align: center;
            margin-top: 20px;
            border-top: 1px solid #e0e0e0;
            padding-top: 10px;
        }
        .footer p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="${baseURL}/shepherd-the-wedding-planner-logo.jpg" alt="Shepherd The Wedding Planner Logo" />
        </div>
        <div class="content">
            <h2>Dear ${name},</h2>
            <p>Your appointment has been successfully booked!</p>
            <p><strong>Date:</strong> ${formattedDate} - ${time}</p>
            <p><strong>Location:</strong> Q38F+C5Q Don Florencio Village, Gov. Antonio Carpio Rd, Batangas, 4200 Batangas</p>
            <h3>Details:</h3>
            <ul>
                <li><strong>Event:</strong> ${event}</li>
                <li><strong>Address:</strong> ${address}</li>
                <li><strong>Church:</strong> ${church}</li>
                <li><strong>Reception Area:</strong> ${receptionArea}</li>
                <li><strong>Number of Guests:</strong> ${numberOfGuests}</li>
                <li><strong>Message:</strong> ${message}</li>
            </ul>
            <p>Thank you for booking with us!</p>
            <p><a href="${baseURL}/cancel-appointment?appointmentId=${appointmentId}" class="button">Cancel Appointment</a></p>
            <p><a href="${baseURL}/reschedule-appointment?appointmentId=${appointmentId}" class="button">Reschedule Appointment</a></p>
        </div>
        <div class="footer">
            <p>Shepherd The Wedding Planner<br />
            Q38F+C5Q Don Florencio Village, Gov. Antonio Carpio Rd<br />
            Batangas, 4200 Batangas</p>
        </div>
    </div>
</body>
</html>
`,
        };

        console.log('Submitting appointment with ID:', appointmentId);
        console.log('Received appointment ID:', appointmentId);


        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Email sent successfully', appointmentId });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error sending email:', error);
            return NextResponse.json({ message: 'Error sending email', error: error.message }, { status: 500 });
        } else {
            console.error('Unknown error sending email:', error);
            return NextResponse.json({ message: 'Unknown error sending email' }, { status: 500 });
        }
    }
}
