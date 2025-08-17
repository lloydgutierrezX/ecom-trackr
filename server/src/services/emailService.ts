import nodemailer from "nodemailer";
import { logger } from "../utils/utils";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const loadTemplate = (templateName: string, replacements = {}) => {
  const filePath = path.join(process.cwd(), "templates", `${templateName}.html`);
  const source = fs.readFileSync(filePath, "utf-8");
  const template = handlebars.compile(source);
  return template(replacements);
}; 111

export async function sendEmail(params: { to: string, subject: string, template: string, data: {} }) {
  const { to, subject, template, data } = params;

  logger.traceIn('Send Email');

  try {
    const html = loadTemplate(template, data);
    logger.info(`Sending email to user: ${process.env.SMTP_USER} with password length: ${process.env.SMTP_PASS?.length}`);

    const info = await transporter.sendMail({
      from: `"ECOM-TRACKER " <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    });
    return {
      success: true,
      id: info.messageId
    };
  } catch (error) {
    logger.error(`Send Email Error: ${error}`);
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
  } finally {
    logger.traceOut('Send Email');
  }
}