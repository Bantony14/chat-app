interface SendOtpEmailParams {
  email: string;
  otp: string;
}

export const sendOtpEmail = async ({
  email,
  otp,
}: SendOtpEmailParams): Promise<void> => {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME;

  if (!apiKey || !senderEmail || !senderName) {
    throw new Error("Brevo configuration missing");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [{ email }],
      subject: "Chat App - Email Verification",
      htmlContent: `
          <div style="font-family: Arial; padding: 20px;">
            <h2>Email Verification</h2>
            <p>Your verification OTP is:</p>
            <h1 style="letter-spacing: 8px;">${otp}</h1>
            <p>This OTP expires in 5 minutes.</p>
            <p>Please do not share this OTP with anyone.</p>
          </div>
        `,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Brevo API Error: ${error}`);
  }
};
