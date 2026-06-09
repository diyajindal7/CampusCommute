const express = require("express");
const User = require("../models/User");
const Ride = require("../models/Ride");

const adminMiddleware =
require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/stats",  adminMiddleware, async (req, res) => {

  try {

    const totalUsers = await User.countDocuments();

    const totalRides = await Ride.countDocuments();

    const rides = await Ride.find();

    let totalRequests = 0;

    rides.forEach((ride) => {
      totalRequests += ride.requests.length;
    });

   const admins =
  await User.find({
    roles: "admin",
  });

const totalAdmins =
  admins.length;

    res.json({
      totalUsers,
      totalRides,
      totalRequests,
      totalAdmins,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


router.get("/users",  adminMiddleware, async (req, res) => {

  try {

    const users = await User.find()
      .select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



router.put("/make-admin/:id",  adminMiddleware, async (req, res) => {

  try {

    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

if (!user.roles.includes("admin")) {
  user.roles.push("admin");
}
    await user.save();

    res.json({
      success: true,
      message: "User promoted to admin",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



router.delete("/user/:id",  adminMiddleware, async (req, res) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "User deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



router.put(
  "/assign-role/:id",
  adminMiddleware,
  async (req, res) => {

    try {

      const { role } = req.body;

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (
        !user.roles.includes(role)
      ) {
        user.roles.push(role);
      }

      await user.save();

      res.json({
        success: true,
        message:
          `${role} assigned`,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);



module.exports = router;