import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'portfoliogenerator.ort@gmail.com',
    pass: 'hyuf nkpt bion ioux'
  }
});

export default transporter;
