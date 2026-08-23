const { Resend } = require("resend");

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail =
  process.env.RESEND_FROM_EMAIL ||
  "Adonay TikTok Academy <noreply@adonaytiktokacademy.com>";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatNumber(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return escapeHtml(value);
  }

  return new Intl.NumberFormat("en-US").format(number);
}

/*
|--------------------------------------------------------------------------
| BASE EMAIL TEMPLATE
|--------------------------------------------------------------------------
*/

function emailLayout({
  previewText,
  eyebrow,
  title,
  intro,
  content,
  footerText = "Adonay TikTok Academy",
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>${escapeHtml(title)}</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #050506;
      color: #ffffff;
      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Helvetica,
        Arial,
        sans-serif;
    }

    table {
      border-collapse: collapse;
    }

    a {
      color: inherit;
    }

    .wrapper {
      width: 100%;
      background: #050506;
      padding: 40px 16px;
    }

    .container {
      width: 100%;
      max-width: 620px;
      margin: 0 auto;
    }

    .card {
      background: #0d0d10;
      border: 1px solid rgba(255,255,255,0.09);
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

    .content {
      padding: 42px 38px;
    }

    .brand {
      margin-bottom: 34px;
    }

    .brand-name {
      font-size: 17px;
      font-weight: 800;
      color: #ffffff;
      margin: 0;
    }

    .brand-subtitle {
      margin: 5px 0 0;
      color: rgba(255,255,255,0.38);
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .eyebrow {
      display: inline-block;
      padding: 7px 11px;
      border-radius: 999px;
      background: rgba(37,244,238,0.07);
      border: 1px solid rgba(37,244,238,0.15);
      color: #25F4EE;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.6px;
    }

    h1 {
      margin: 20px 0 0;
      font-size: 34px;
      line-height: 1.15;
      letter-spacing: -1px;
      color: #ffffff;
    }

    .intro {
      margin: 18px 0 0;
      color: rgba(255,255,255,0.55);
      font-size: 15px;
      line-height: 1.7;
    }

    .panel {
      margin-top: 28px;
      padding: 20px;
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px;
    }

    .panel-title {
      margin: 0 0 14px;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
    }

    .row {
      padding: 10px 0;
      border-bottom: 1px solid rgba(255,255,255,0.055);
    }

    .row:last-child {
      border-bottom: 0;
    }

    .label {
      color: rgba(255,255,255,0.3);
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .value {
      margin-top: 4px;
      color: rgba(255,255,255,0.82);
      font-size: 13px;
      line-height: 1.5;
    }

    .callout {
      margin-top: 24px;
      padding: 18px;
      border-radius: 15px;
      background: rgba(37,244,238,0.045);
      border: 1px solid rgba(37,244,238,0.12);
    }

    .callout-title {
      margin: 0;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
    }

    .callout-text {
      margin: 7px 0 0;
      color: rgba(255,255,255,0.48);
      font-size: 12px;
      line-height: 1.7;
    }

    .footer {
      padding: 24px 38px 30px;
      border-top: 1px solid rgba(255,255,255,0.06);
      text-align: center;
    }

    .footer-text {
      margin: 0;
      color: rgba(255,255,255,0.22);
      font-size: 10px;
      line-height: 1.7;
    }

    .footer-brand {
      margin-top: 8px;
      color: rgba(255,255,255,0.38);
      font-size: 11px;
      font-weight: 700;
    }

    @media only screen and (max-width: 600px) {
      .wrapper {
        padding: 20px 10px;
      }

      .content {
        padding: 30px 22px;
      }

      .footer {
        padding: 20px 22px 26px;
      }

      h1 {
        font-size: 28px;
      }
    }
  </style>
</head>

<body>
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${escapeHtml(previewText)}
  </div>

  <table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
  >
    <tr>
      <td class="wrapper">
        <div class="container">
          <div class="card">

            <div class="top-line"></div>

            <div class="content">

              <div class="brand">
                <p class="brand-name">Adonay</p>
                <p class="brand-subtitle">TikTok Academy</p>
              </div>

              <span class="eyebrow">
                ${escapeHtml(eyebrow)}
              </span>

              <h1>
                ${title}
              </h1>

              <p class="intro">
                ${intro}
              </p>

              ${content}

            </div>

            <div class="footer">
              <p class="footer-text">
                ${escapeHtml(footerText)}
              </p>

              <p class="footer-brand">
                Adonay TikTok Academy
              </p>
            </div>

          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

/*
|--------------------------------------------------------------------------
| REGISTRATION DETAILS
|--------------------------------------------------------------------------
*/

function registrationDetails(registration) {
  const hasTikTok = registration.hasTikTok;

  return `
    <div class="panel">
      <p class="panel-title">Registration details</p>

      <div class="row">
        <div class="label">Name</div>
        <div class="value">${escapeHtml(registration.name)}</div>
      </div>

      <div class="row">
        <div class="label">Phone</div>
        <div class="value">${escapeHtml(registration.phone)}</div>
      </div>

      <div class="row">
        <div class="label">Email</div>
        <div class="value">${escapeHtml(registration.email)}</div>
      </div>

      <div class="row">
        <div class="label">Company / Agency</div>
        <div class="value">
          ${escapeHtml(registration.realEstateCompany)}
        </div>
      </div>

      <div class="row">
        <div class="label">Training</div>
        <div class="value">
          ${escapeHtml(registration.trainingType)}
        </div>
      </div>

      <div class="row">
        <div class="label">TikTok account</div>
        <div class="value">
          ${hasTikTok ? "Yes" : "No"}
        </div>
      </div>

      ${
        hasTikTok
          ? `
            <div class="row">
              <div class="label">TikTok username</div>
              <div class="value">
                @${escapeHtml(
                  String(registration.tiktokUsername || "").replace(/^@/, ""),
                )}
              </div>
            </div>

            <div class="row">
              <div class="label">Followers</div>
              <div class="value">
                ${formatNumber(registration.followers)}
              </div>
            </div>
          `
          : ""
      }
    </div>
  `;
}

/*
|--------------------------------------------------------------------------
| SEND EMAIL
|--------------------------------------------------------------------------
*/

async function sendEmail({ to, subject, html, idempotencyKey }) {
  if (!resend) {
    console.warn(
      "[EmailService] RESEND_API_KEY is not configured. Email skipped.",
    );

    return {
      success: false,
      skipped: true,
    };
  }

  try {
    const { data, error } = await resend.emails.send(
      {
        from: fromEmail,
        to: [to],
        subject,
        html,
      },
      idempotencyKey
        ? {
            idempotencyKey,
          }
        : undefined,
    );

    if (error) {
      console.error("[EmailService] Resend error:", error);

      return {
        success: false,
        error,
      };
    }

    console.log("[EmailService] Email sent:", data?.id);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("[EmailService] Failed to send email:", error);

    return {
      success: false,
      error,
    };
  }
}

/*
|--------------------------------------------------------------------------
| 1. REGISTRATION RECEIVED
|--------------------------------------------------------------------------
*/

async function sendRegistrationReceivedEmail(registration) {
  const firstName =
    String(registration.name || "")
      .trim()
      .split(/\s+/)[0] || "there";

  const html = emailLayout({
    previewText: "Your Adonay TikTok Academy registration has been received.",
    eyebrow: "Registration received",
    title: `You're on the list, ${escapeHtml(firstName)}. 🎉`,
    intro:
      "Your registration has been successfully received. Our academy team will review your information and contact you shortly with the next steps.",
    content: `
      ${registrationDetails(registration)}

      <div class="callout">
        <p class="callout-title">
          What happens next?
        </p>

        <p class="callout-text">
          Your registration is currently <strong>pending review</strong>.
          Our team will call you using the phone number you provided to
          confirm your registration and share the next important details.
        </p>
      </div>

      <div class="callout">
        <p class="callout-title">
          Please keep an eye on your inbox
        </p>

        <p class="callout-text">
          We'll use this email address for important updates about your
          registration and training.
        </p>
      </div>
    `,
  });

  return sendEmail({
    to: registration.email,
    subject: "Registration received — Adonay TikTok Academy",
    html,
    idempotencyKey: `registration-received-${registration._id}`,
  });
}

/*
|--------------------------------------------------------------------------
| 2. APPROVED
|--------------------------------------------------------------------------
*/

async function sendRegistrationApprovedEmail(registration) {
  const firstName =
    String(registration.name || "")
      .trim()
      .split(/\s+/)[0] || "there";

  const html = emailLayout({
    previewText: "Your Adonay TikTok Academy registration has been approved.",
    eyebrow: "Registration approved",
    title: `You're officially approved, ${escapeHtml(firstName)}. 🚀`,
    intro:
      "Great news — your registration for Adonay TikTok Academy has been approved.",
    content: `
      <div class="callout">
        <p class="callout-title">
          Your place is confirmed
        </p>

        <p class="callout-text">
          We're excited to have you join the academy. Your registration
          has been reviewed and approved by our team.
        </p>
      </div>

      ${registrationDetails(registration)}

      <div class="callout">
        <p class="callout-title">
          What's next?
        </p>

        <p class="callout-text">
          Our team will contact you with the training schedule, location,
          arrival information and any additional instructions you need
          before the session.
        </p>
      </div>
    `,
  });

  return sendEmail({
    to: registration.email,
    subject: "You're approved! — Adonay TikTok Academy",
    html,
    idempotencyKey: `registration-approved-${registration._id}`,
  });
}

/*
|--------------------------------------------------------------------------
| 3. REJECTED
|--------------------------------------------------------------------------
*/

async function sendRegistrationRejectedEmail(registration, reason = "") {
  const firstName =
    String(registration.name || "")
      .trim()
      .split(/\s+/)[0] || "there";

  const reasonBlock = reason
    ? `
      <div class="callout">
        <p class="callout-title">
          Review note
        </p>

        <p class="callout-text">
          ${escapeHtml(reason)}
        </p>
      </div>
    `
    : "";

  const html = emailLayout({
    previewText:
      "There is an update regarding your Adonay TikTok Academy registration.",
    eyebrow: "Registration update",
    title: `An update about your registration, ${escapeHtml(firstName)}`,
    intro:
      "Thank you for your interest in Adonay TikTok Academy. Our team has completed the review of your registration.",
    content: `
      <div class="callout">
        <p class="callout-title">
          Registration status
        </p>

        <p class="callout-text">
          Unfortunately, we are unable to approve this registration
          for the current training intake.
        </p>
      </div>

      ${reasonBlock}

      <div class="callout">
        <p class="callout-title">
          This isn't the end
        </p>

        <p class="callout-text">
          Training availability can change between intakes. If you would
          like more information or would like to be considered for a
          future intake, please contact our academy team.
        </p>
      </div>
    `,
  });

  return sendEmail({
    to: registration.email,
    subject: "An update about your academy registration",
    html,
    idempotencyKey: `registration-rejected-${registration._id}`,
  });
}

module.exports = {
  sendRegistrationReceivedEmail,
  sendRegistrationApprovedEmail,
  sendRegistrationRejectedEmail,
};
