const express = require('express');
const fs = require('fs').promises;
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', async (req, res) => {
  try {
    const content = await fs.readFile('emails.txt', 'utf-8');
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css">
        <title>Emails</title>
      </head>
      <body>
        <h1>Email Content</h1>
        <p>${content}</p>
  
        <form action="/send-email" method="post">
          <button type="submit">Send Email</button>
        </form>
      </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    res.status(500).send('Error reading the file.');
  }
});

// Handle sending email
app.post('/send-email', async (req, res) => {
  try {
    const content = await fs.readFile('emails.txt', 'utf-8');

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ak3259507714@gmail.com', // Replace with your Gmail address
        pass: 'npdmpufbsidwzilh' // Replace with your Gmail password
      }
    });

  
    const mailOptions = {
      from: 'ak3259507714@gmail.com',
      to: '22pwbcs0906@gmail.com',
      subject: 'Read data from the Text file',
      text: content
    };

    
    await transporter.sendMail(mailOptions);

    
    const notificationHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Notification</title>
      </head>
      <body>
        <p>Email sent successfully!</p>
      </body>
      </html>
    `;
    res.send(notificationHtml);
  } catch (error) {
    console.error('Error sending the email:', error);
    const errorHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error</title>
      </head>
      <body>
        <p>Error sending the email......</p>
      </body>
      </html>
    `;
    res.status(500).send(errorHtml);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
