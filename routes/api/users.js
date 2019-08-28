/* eslint-disable node/no-unsupported-features/es-syntax */

import express from "express";
import auth from "../../middleware/auth";
import queryData from "../../config/db";

const router = express.Router();

// @route  GET /api/v1/user/requests
// @desc  Get User Request
// @access Private
router.get("/requests", auth, async (req, res) => {
  try {
    const requests = await queryData(
      "SELECT * FROM requests WHERE user_uid = $1",
      [req.user]
    );
    res.json(requests);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET /api/v1/user/requests/:id
// @desc  Get User Request
// @access Private
router.get("/requests/:id", auth, async (req, res) => {
  try {
    const request = await queryData(
      "SELECT * FROM requests WHERE user_uid = $1 AND req_uid = $2",
      [req.user, req.params.id]
    );
    if (!request) {
      return res.status(404).json({ msg: "Request Not Found" });
    }
    res.json(request);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

export default router;
