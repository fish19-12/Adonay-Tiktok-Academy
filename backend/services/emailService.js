const { Resend } = require("resend");

/*
|--------------------------------------------------------------------------
| RESEND CLIENT
|--------------------------------------------------------------------------
*/

if (!process.env.RESEND_API_KEY) {
  console.warn(
    "⚠️ RESEND_API_KEY is not configured. Registration emails will not be sent.",
  );
}

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Adonay TikTok Academy <noreply@adonaytiktokacademy.com>";

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

const escapeHtml = (value = "") => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const formatTrainingType = (value = "") => {
  return String(value)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const baseEmailStyles = `
  body {
    margin: 0;
    padding: 0;
    background: #050505;
    font-family: Arial, Helvetica, sans-serif;
    color: #ffffff;
  }

  .wrapper {
    width: 100%;
    background: #050505;
    padding: 40px 16px;
    box-sizing: border-box;
  }

  .container {
    max-width: 620px;
    margin: 0 auto;
    background: #0b0b0b;
    border: 1px solid #222222;
    border-radius: 24px;
    overflow: hidden;
  }

  .top-line {
    height: 4px;
    background: linear-gradient(
      90deg,
      #25F4EE,
      #ffffff,
      #FE2C55
    );
  }

  .header {
    padding: 34px 32px 20px;
    text-align: center;
  }

  .logo-mark {
    width: 58px;
    height: 58px;
    margin: 0 auto 18px;
    border-radius: 16px;
    background: linear-gradient(
      135deg,
      rgba(37,244,238,0.18),
      rgba(254,44,85,0.18)
    );
    border: 1px solid rgba(255,255,255,0.10);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #25F4EE;
    font-size: 25px;
    font-weight: 800;
  }

  .brand {
    margin: 0;
    font-size: 13px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #ffffff;
  }

  .content {
    padding: 10px 32px 36px;
  }

  .eyebrow {
    margin: 0 0 10px;
    color: #25F4EE;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    color: #ffffff;
    font-size: 30px;
    line-height: 1.2;
  }

  .intro {
    margin: 18px 0 0;
    color: #a6a6a6;
    font-size: 15px;
    line-height: 1.8;
  }

  .highlight {
    margin-top: 26px;
    padding: 20px;
    border-radius: 16px;
    background: rgba(37,244,238,0.05);
    border: 1px solid rgba(37,244,238,0.12);
  }

  .highlight-title {
    margin: 0;
    color: #25F4EE;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .highlight-text {
    margin: 8px 0 0;
    color: #ffffff;
    font-size: 15px;
    line-height: 1.6;
  }

  .details {
    margin-top: 24px;
    border: 1px solid #1d1d1d;
    border-radius: 16px;
    overflow: hidden;
  }

  .detail-row {
    padding: 14px 18px;
    border-bottom: 1px solid #1d1d1d;
  }

  .detail-row:last-child {
    border-bottom: 0;
  }

  .detail-label {
    display: block;
    margin-bottom: 5px;
    color: #666666;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }

  .detail-value {
    color: #eeeeee;
    font-size: 14px;
  }

  .footer {
    padding: 24px 32px 30px;
    border-top: 1px solid #1b1b1b;
    text-align: center;
  }

  .footer-brand {
    margin: 0;
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
  }

  .footer-text {
    margin: 8px 0 0;
    color: #666666;
    font-size: 11px;
    line-height: 1.7;
  }

  .status {
    display: inline-block;
    margin-top: 16px;
    padding: 8px 13px;
    border-radius: 999px;
    background: rgba(37,244,238,0.08);
    border: 1px solid rgba(37,244,238,0.15);
    color: #25F4EE;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }

  @media only screen and (max-width: 600px) {
    .wrapper {
      padding: 20px 10px;
    }

    .header,
    .content,
    .footer {
      padding-left: 22px;
      padding-right: 22px;
    }

    h1 {
      font-size: 25px;
    }
  }
`;

const layout = ({
  eyebrow,
  title,
  intro,
  highlightTitle,
  highlightText,
  details = "",
  status = "",
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>${escapeHtml(title)}</title>

  <style>
    ${baseEmailStyles}
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <div class="top-line"></div>

      <div class="header">
        <div class="logo-mark">A</div>

        <p class="brand">
          Adonay TikTok Academy
        </p>
      </div>

      <div class="content">

        <p class="eyebrow">
          ${escapeHtml(eyebrow)}
        </p>

        <h1>
          ${escapeHtml(title)}
        </h1>

        <p class="intro">
          ${intro}
        </p>

        ${
          highlightText
            ? `
          <div class="highlight">
            <p class="highlight-title">
              ${escapeHtml(highlightTitle)}
            </p>

            <p class="highlight-text">
              ${highlightText}
            </p>
          </div>
        `
            : ""
        }

        ${
          details
            ? `
          <div class="details">
            ${details}
          </div>
        `
            : ""
        }

        ${
          status
            ? `
          <div style="text-align:center;">
            <span class="status">
              ${escapeHtml(status)}
            </span>
          </div>
        `
            : ""
        }

      </div>

      <div class="footer">
        <p class="footer-brand">
          Adonay TikTok Academy
        </p>

        <p class="footer-text">
          Learn. Create. Grow. Go Viral.<br />
          This is an automated message regarding your academy registration.
        </p>
      </div>

    </div>
  </div>
</body>
</html>
`;

/*
|--------------------------------------------------------------------------
| SEND EMAIL
|--------------------------------------------------------------------------
*/

const sendEmail = async ({ to, subject, html, text }) => {
  if (!resend) {
    console.warn(
      `⚠️ Email skipped because RESEND_API_KEY is missing. Recipient: ${to}`,
    );

    return {
      success: false,
      skipped: true,
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
      text,
    });

    if (error) {
      console.error("❌ Resend error:", error);

      return {
        success: false,
        error,
      };
    }

    console.log(`✅ Email sent to ${to}. ID: ${data?.id}`);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("❌ Email service error:", error);

    return {
      success: false,
      error,
    };
  }
};

/*
|--------------------------------------------------------------------------
| REGISTRATION RECEIVED EMAIL
|--------------------------------------------------------------------------
*/

const sendRegistrationReceivedEmail = async (registration) => {
  const name = escapeHtml(registration.name);
  const trainingType = escapeHtml(
    formatTrainingType(registration.trainingType),
  );

  const html = layout({
    eyebrow: "Registration Received",
    title: `You're officially on our list, ${name}.`,
    intro: `
      Thank you for registering with Adonay TikTok Academy.
      We have successfully received your training application and our team
      is now reviewing your information.
    `,
    highlightTitle: "What happens next?",
    highlightText: `
      Our team will review your registration and contact you by phone or email
      with the next steps. Please keep your phone available and watch your inbox.
    `,
    details: `
      <div class="detail-row">
        <span class="detail-label">Student</span>
        <span class="detail-value">${name}</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">Training</span>
        <span class="detail-value">${trainingType}</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">Registration Status</span>
        <span class="detail-value">Pending Review</span>
      </div>
    `,
    status: "Pending Review",
  });

  const text = `
Adonay TikTok Academy

Registration received.

Hello ${registration.name},

Thank you for registering with Adonay TikTok Academy.

We have successfully received your registration for:
${formatTrainingType(registration.trainingType)}

Our team will review your information and contact you by phone or email with the next steps.

Current status: Pending Review

Adonay TikTok Academy
Learn. Create. Grow. Go Viral.
`;

  return sendEmail({
    to: registration.email,
    subject: "Registration Received — Adonay TikTok Academy",
    html,
    text,
  });
};

/*
|--------------------------------------------------------------------------
| APPROVED EMAIL
|--------------------------------------------------------------------------
*/

const sendRegistrationApprovedEmail = async (registration) => {
  const name = escapeHtml(registration.name);
  const trainingType = escapeHtml(
    formatTrainingType(registration.trainingType),
  );

  const html = layout({
    eyebrow: "Registration Approved",
    title: `You're in, ${name}.`,
    intro: `
      Great news. Your registration for Adonay TikTok Academy has been
      approved.
    `,
    highlightTitle: "Your next step",
    highlightText: `
      Our team will contact you with the training schedule, location,
      preparation details, and any additional information you need before
      your training begins.
    `,
    details: `
      <div class="detail-row">
        <span class="detail-label">Student</span>
        <span class="detail-value">${name}</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">Training</span>
        <span class="detail-value">${trainingType}</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">Status</span>
        <span class="detail-value">Approved</span>
      </div>
    `,
    status: "Approved",
  });

  const text = `
Adonay TikTok Academy

Your registration has been approved.

Hello ${registration.name},

Great news! Your registration for ${formatTrainingType(
    registration.trainingType,
  )} has been approved.

Our team will contact you with the training schedule, location, preparation details, and next steps.

Status: Approved

Adonay TikTok Academy
Learn. Create. Grow. Go Viral.
`;

  return sendEmail({
    to: registration.email,
    subject: "You're Approved — Adonay TikTok Academy",
    html,
    text,
  });
};

/*
|--------------------------------------------------------------------------
| REJECTED EMAIL
|--------------------------------------------------------------------------
*/

const sendRegistrationRejectedEmail = async (registration) => {
  const name = escapeHtml(registration.name);
  const trainingType = escapeHtml(
    formatTrainingType(registration.trainingType),
  );

  const html = layout({
    eyebrow: "Registration Update",
    title: `An update regarding your registration, ${name}.`,
    intro: `
      Thank you for your interest in Adonay TikTok Academy and for taking
      the time to register.
    `,
    highlightTitle: "Registration status",
    highlightText: `
      After reviewing your application, we are unable to approve this
      registration at this time.
      We truly appreciate your interest and encourage you to stay connected
      for future training opportunities.
    `,
    details: `
      <div class="detail-row">
        <span class="detail-label">Student</span>
        <span class="detail-value">${name}</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">Training</span>
        <span class="detail-value">${trainingType}</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">Status</span>
        <span class="detail-value">Not Approved</span>
      </div>
    `,
    status: "Registration Update",
  });

  const text = `
Adonay TikTok Academy

Registration update.

Hello ${registration.name},

Thank you for your interest in Adonay TikTok Academy.

After reviewing your application, we are unable to approve this registration at this time.

We appreciate your interest and encourage you to stay connected for future training opportunities.

Training: ${formatTrainingType(registration.trainingType)}

Status: Not Approved

Adonay TikTok Academy
Learn. Create. Grow. Go Viral.
`;

  return sendEmail({
    to: registration.email,
    subject: "Registration Update — Adonay TikTok Academy",
    html,
    text,
  });
};

module.exports = {
  sendRegistrationReceivedEmail,
  sendRegistrationApprovedEmail,
  sendRegistrationRejectedEmail,
};
