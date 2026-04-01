const mailTemplate = (userName,otp,Otpexpiry)=>{
    return `
         Subject: Your OTP Code – Verify Your Account

<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>OTP Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 10px;">

    <!-- Main Card -->
    <table width="100%" max-width="500px" cellpadding="0" cellspacing="0"
           style="background:#ffffff; border-radius:10px; overflow:hidden;
                  box-shadow:0 10px 25px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#0f766e,#14b8a6);
                   padding:25px; text-align:center; color:#ffffff;">
          <h1 style="margin:0; font-size:24px;">OTP Verification 🔐</h1>
          <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">
            Secure your account
          </p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:30px; color:#334155;">
          <p style="font-size:15px; line-height:1.6; margin-top:0;">
            Hello 👋
          </p>

          <p style="font-size:15px; line-height:1.6;">
            Use the following One-Time Password (OTP) to verify your account.
            This code is valid for <strong>${Otpexpiry}</strong>.
          </p>

          <!-- OTP Box -->
          <div style="text-align:center; margin:30px 0;">
            <div style="display:inline-block; padding:15px 30px;
                        font-size:26px; letter-spacing:6px;
                        font-weight:bold; color:#0f766e;
                        background:#ecfeff; border:2px dashed #14b8a6;
                        border-radius:8px;">
              ${otp}
            </div>
          </div>

          <p style="font-size:14px; line-height:1.6; color:#475569;">
            If you didn’t request this code, please ignore this email.
          </p>

          <p style="font-size:14px; margin-bottom:0;">
            Thanks,<br/>
            <strong>${userName}</strong>
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f1f5f9; padding:14px;
                   text-align:center; font-size:12px; color:#64748b;">
          © 2026 Blog-App · All rights reserved
        </td>
      </tr>

    </table>

  </td>
</tr>

  </table>

</body>
</html>   
    `
}
module.exports = mailTemplate