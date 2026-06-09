const express = require("express");
const Report = require("../models/Report");

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const report =
      await Report.create(
        req.body
      );

    res.status(201).json(
      report
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

router.get("/", async (req, res) => {

  try {

    const reports =
      await Report.find()
        .sort({
          createdAt: -1,
        });

    res.json(reports);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



router.delete("/:id", async (req, res) => {

  try {

    await Report.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Report deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



module.exports = router;