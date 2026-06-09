const nodemailer =
  require("nodemailer");

const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:
        process.env.EMAIL_USER,
      pass:
        process.env.EMAIL_PASS,
    },
  });

const sendRideAcceptedEmail =
  async (
    email,
    destination
  ) => {

    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "CampusCommute Ride Request Accepted",

     html: `
<h2>🎉 Ride Request Accepted</h2>

<p>Hello,</p>

<p>
Your request to join the ride to
<b>${destination}</b>
has been accepted by the ride owner.
</p>

<p>
Please log in to CampusCommute for further details.
</p>

<hr>

<p>
CampusCommute Team 🚗
</p>
      `,
    });

  };

module.exports =
  sendRideAcceptedEmail;