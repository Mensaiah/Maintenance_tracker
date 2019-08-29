/* eslint-disable node/no-unsupported-features/es-syntax */
import express from "express";
import auth from "../../middleware/auth";
import queryData from "../../config/db";

const router = express.Router();

// @route  GET /api/v1/requests/
// @desc  Get all user request
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const isAdmin = await queryData("SELECT * FROM users WHERE user_uid = $1", [
      req.user
    ]);

    if (isAdmin[0].admin_status === false) {
      return res.status(400).json({ msg: "User Not Authorised" });
    }
    const requests = await queryData(
      "SELECT * FROM requests WHERE admin_incharge = $1",
      [isAdmin[0].username]
    );
    res.json(requests);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET /api/v1/requests/
// @desc  Get all user request
// @access Private

export default router;
