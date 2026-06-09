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

const sendRideRejectedEmail =
  async (
    email,
    destination
  ) => {

    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "CampusCommute Ride Request Update",

      html: `
        <h2>Ride Request Rejected ❌</h2>

        <p>
          Your request for the ride to
          <b>${destination}</b>
          was not accepted.
        </p>

        <p>
          You can browse other rides
          on CampusCommute.
        </p>
      `,
    });

  };

module.exports =
  sendRideRejectedEmail;