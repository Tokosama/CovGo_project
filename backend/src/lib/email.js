import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // ou autre service SMTP
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendOTPByEmail = async (to, otp) => {
  const mailOptions = {
    from: `"Covoiturage" <${process.env.MAIL_USER}>`,
    to,
    subject: "Code OTP de vérification",
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Vérification de votre compte</h2>
        <p>Voici votre code OTP :</p>
        <p style="font-size: 20px; font-weight: bold;">${otp}</p>
        <p>Ce code est valide pendant 5 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
