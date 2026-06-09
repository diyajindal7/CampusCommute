const User = require("../models/User");

const requireRole = (role) => {

  return async (req, res, next) => {

    try {

      const email =
        req.headers["user-email"];

      if (!email) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const user =
        await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (
        !user.roles.includes(role)
      ) {
        return res.status(403).json({
          success: false,
          message: `Requires ${role} role`,
        });
      }

      next();

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

};

module.exports = requireRole;