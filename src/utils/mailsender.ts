import nodemailer from "nodemailer";

export async function sendVerificationEmail(
  recipientEmail: string,
  requesterName: string,
  requestText: string,
  verificationId: number
) {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIl_PROVIDER, // Change based on your provider
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password (if using Gmail)
      },
    });

    // Construct approval and rejection links
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const approveLink = `${baseUrl}/api/verifications/approve?verificationId=${verificationId}`;
    const rejectLink = `${baseUrl}/api/verifications/reject?verificationId=${verificationId}`;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: "Student Verification Request",
      html: `
        <h2>Verification Request from ${requesterName}</h2>
        <p><strong>Request Details:</strong> ${requestText}</p>
        <p>Please approve or reject the verification request:</p>
        <a href="${approveLink}" style="display: inline-block; padding: 10px 20px; background-color: green; color: white; text-decoration: none; border-radius: 5px;">Approve</a>
        &nbsp;
        <a href="${rejectLink}" style="display: inline-block; padding: 10px 20px; background-color: red; color: white; text-decoration: none; border-radius: 5px;">Reject</a>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.messageId);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
}
