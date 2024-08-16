import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { id, status, email, date, time } = await request.json();

        // Ensure environment variables are set
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error('Email configuration is missing');
        }

        // Configure nodemailer transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Base URL for links (adjust according to your environment)
        const baseURL = process.env.NEXT_PUBLIC_DEV_URL;

        const mailOptions = {
            from: `"Shepherd The Wedding Planner" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Appointment Status Updated`,
            html: `
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background-color: #f4f4f4;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
            line-height: 1.6;
        }
        .footer {
            font-size: 14px;
            color: #777;
            text-align: center;
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            padding: 12px 20px;
            color: #ffffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
            margin-top: 20px;
            text-align: center;
            font-weight: bold;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .section-content {
            font-size: 16px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="${baseURL}/shepherd-the-wedding-planner-logo.jpg" alt="Shepherd The Wedding Planner Logo" />
        </div>
        <div class="content">
            <h2 class="section-title">Appointment Status Updated</h2>
            <p class="section-content">Your appointment with us has been updated!</p>
            <p class="section-content"><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
            <p class="section-content"><strong>Time:</strong> ${time}</p>
            <p class="section-content"><strong>Location:</strong> Q38F+C5Q Don Florencio Village, Gov. Antonio Carpio Rd, Batangas, 4200 Batangas</p>
            <p class="section-content"><strong>Status:</strong> ${status}</p>
            <p class="section-content">Thank you for your attention.</p>
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

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Status update email sent successfully' });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error sending status update email:', error);
            return NextResponse.json({ message: 'Error sending email', error: error.message }, { status: 500 });
        } else {
            console.error('Unknown error sending status update email:', error);
            return NextResponse.json({ message: 'Unknown error sending email' }, { status: 500 });
        }
    }
}
