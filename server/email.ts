import sgMail from '@sendgrid/mail';

interface EmailDetails {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Initialize SendGrid with API key
if (!process.env.SENDGRID_API_KEY) {
  console.error('SendGrid API key is missing. Please set the SENDGRID_API_KEY environment variable.');
  throw new Error('SendGrid API key is missing. Please set the SENDGRID_API_KEY environment variable.');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send email function using SendGrid
export const sendContactEmail = async (details: EmailDetails): Promise<boolean> => {
  try {
    // Determine recipient
    const recipient = process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER;
    if (!recipient) {
      console.error('No recipient email found. Please set EMAIL_RECIPIENT or EMAIL_USER environment variable.');
      return false;
    }

    console.log('Sending email via SendGrid to:', recipient);
    console.log('From:', details.name, details.email);
    
    // With SendGrid, the "from" email must be verified in your SendGrid account
    // So we use your own email as the sender and add reply-to for the contact person
    const msg = {
      to: recipient,
      from: {
        email: process.env.EMAIL_USER || 'bansalwal1996@gmail.com', // Must be your verified sender in SendGrid
        name: "Kanika's Resume Website"
      },
      replyTo: details.email,
      subject: `Portfolio Contact: ${details.subject}`,
      text: `Message from ${details.name} (${details.email}): ${details.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a6cf7;">New Contact Message</h2>
          <p><strong>From:</strong> ${details.name} (${details.email})</p>
          <p><strong>Subject:</strong> ${details.subject}</p>
          <hr style="border: 1px solid #eee;"/>
          <div>
            <p><strong>Message:</strong></p>
            <p>${details.message.replace(/\n/g, '<br/>')}</p>
          </div>
        </div>
      `,
    };

    // Send email
    console.log('Attempting to send email with SendGrid:', JSON.stringify(msg, null, 2));
    await sgMail.send(msg);
    console.log('Email sent successfully via SendGrid');
    return true;
  } catch (error: any) {
    console.error('SendGrid error sending email:', error);
    if (error.response) {
      console.error('SendGrid error details:', error.response.body);
    }
    return false;
  }
};