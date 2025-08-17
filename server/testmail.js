import nodemailer from "nodemailer";

console.log("User:", process.env.SMTP_USER);
console.log("Pass:", process.env.SMTP_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

try {
  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: "lloydgutierrez24@gmail.com",
    subject: "Gmail SMTP Test",
    text: "If you see this, Gmail SMTP works!",
  });

  console.log("Message sent:", info.messageId);
} catch (err) {
  console.error("Auth failed:", err);
}