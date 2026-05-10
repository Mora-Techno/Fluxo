import nodemailer from 'nodemailer';
import { env } from '@/config/env.config';

export const sendResetPasswordEmail = async (to: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });

  const resetLink = `${env.FRONTEND_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Fluxo Support" <${env.SMTP_USER}>`,
    to,
    subject: 'Atur Ulang Kata Sandi Anda',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #333;">Permintaan Atur Ulang Kata Sandi</h2>
        <p>Kami menerima permintaan untuk mengatur ulang kata sandi akun Fluxo Anda.</p>
        <p>Silakan klik tombol di bawah ini untuk melanjutkan:</p>
        <a href="${resetLink}" 
           style="background-color: #e63946; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
           Atur Ulang Kata Sandi
        </a>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #888;">
          Jika Anda tidak merasa melakukan permintaan ini, abaikan email ini. 
          Link ini hanya berlaku selama 60 menit.
        </p>
      </div>
    `,
  });
};
