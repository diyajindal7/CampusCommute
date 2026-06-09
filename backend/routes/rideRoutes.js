const express = require("express");
const Ride = require("../models/Ride");

const router = express.Router();
const sendRideAcceptedEmail =
require(
  "../utils/sendRideAcceptedEmail"
);


const sendRideRejectedEmail =
require(
  "../utils/sendRideRejectedEmail"
);
// CREATE RIDE
router.post("/create", async (req, res) => {

  try {

    const { destination, date, seats, createdBy, } = req.body;

    if (!destination || !date || !seats) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const ride = await Ride.create({
      destination,
      date,
      seats,
      createdBy,
    });

    res.status(201).json({
      success: true,
      ride,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

const Notification =
  require(
    "../models/Notification"
  );



  
// GET ALL RIDES
router.get("/", async (req, res) => {

  try {

    const rides = await Ride.find();

    res.json(rides);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});


router.get("/myrides/:email", async (req, res) => {

  try {

    const rides = await Ride.find({
      createdBy: req.params.email,
    });

    res.json(rides);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});


// JOIN RIDE
router.post("/:id/join", async (req, res) => {
  console.log("JOIN REQUEST");
console.log("Ride ID:", req.params.id);
console.log("Body:", req.body);

  try {

    const { email } = req.body;

    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    ride.requests.push({
      email,
      status: "pending",
    });

    await Notification.create({
  email:
    ride.createdBy,

  message:
    `${email} requested to join your ride to ${ride.destination}`,
});

    await ride.save();

    res.json({
      success: true,
      message: "Request Sent",
    });

  } catch (error) {

  console.error("JOIN ERROR:");
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });

}

});



router.put("/:rideId/request/:requestId", async (req, res) => {

  try {

    const { status } = req.body;

    const ride = await Ride.findById(req.params.rideId);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }


    console.log("Ride ID:", req.params.rideId);
console.log("Request ID:", req.params.requestId);
console.log("Requests:", ride.requests);

    const request = ride.requests.id(req.params.requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

   if (
  status === "accepted"
) {

  if (ride.seats <= 0) {

    return res.status(400).json({
      success: false,
      message:
        "No seats available",
    });

  }

  ride.seats -= 1;

}
await sendRideAcceptedEmail(
  request.email,
  ride.destination
);
if (
  status === "rejected"
) {

  await sendRideRejectedEmail(
    request.email,
    ride.destination
  );

}

request.status = status;
if (
  status ===
  "accepted"
) {

  await Notification.create({
    email:
      request.email,

    message:
      `Your ride request for ${ride.destination} was accepted ✅`,
  });

}

if (
  status ===
  "rejected"
) {

  await Notification.create({
    email:
      request.email,

    message:
      `Your ride request for ${ride.destination} was rejected ❌`,
  });

}

    await ride.save();

    res.json({
      success: true,
      message: `Request ${status}`,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});


router.get("/profile-stats/:email", async (req, res) => {

  try {

    const rides = await Ride.find({
      createdBy: req.params.email,
    });

    const ridesCreated = rides.length;

    let requestsReceived = 0;

    rides.forEach((ride) => {

      requestsReceived += ride.requests.length;

    });

    res.json({
      ridesCreated,
      requestsReceived,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});




router.get(
  "/requests/:email",
  async (req, res) => {

    try {

      const rides =
        await Ride.find();

      const requests = [];

      rides.forEach((ride) => {

        ride.requests.forEach(
          (request) => {

            if (
              request.email ===
              req.params.email
            ) {

              requests.push({
                rideId: ride._id,
                destination:
                  ride.destination,
                date: ride.date,
                status:
                  request.status,
              });

            }

          }
        );

      });

      res.json(requests);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);



router.delete("/:id", async (req, res) => {
  try {

    await Ride.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Ride deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});



module.exports = router;