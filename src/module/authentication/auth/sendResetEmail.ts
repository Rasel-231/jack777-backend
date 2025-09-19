import nodemailer from 'nodemailer';
import config from '../../../config';


export async function sendEmail(
    to: string,
    html: string
) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: config.email,
            pass: config.send_email_pass,
        },
    });

    await transporter.sendMail({
        from: config.email,
        to: "halifax980@gmail.com",
        subject: "Reset Password Link",
        html,
    });
}