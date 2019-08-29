/* eslint-disable node/no-unsupported-features/es-syntax */

import express from "express";
import { check, validationResult } from "express-validator";
import { ClientRequest } from "http";
import auth from "../../middleware/auth";
import queryData from "../../config/db";

const router = express.Router();
const date = new Date();
// @route  POST /api/v1/user/requests
// @desc  Create Request
// @access Private
router.post(
  "/requests",
  auth,
  [
    check("title", "Please include the title of the request")
      .not()
      .isEmpty(),
    check("description", "A description of the request is needed")
      .not()
      .isEmpty(),
    check("admin", "Admin username is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, admin } = req.body;

      const isAdmin = await queryData(
        "SELECT admin_status FROM users WHERE username = $1",
        [admin]
      );

      if (isAdmin.length === 0 || isAdmin[0].admin_status !== true) {
        return res
          .status(400)
          .json({ msg: "Please include a valid admin username" });
      }

      await queryData(
        "INSERT INTO requests(req_uid, title, description,date_created, admin_incharge, user_uid) values(uuid_generate_v4(),$1,$2,$3,$4,$5)",
        [title, description, date, admin, req.user]
      );
      const request = await queryData(
        "SELECT * FROM requests WHERE user_uid = $1",
        [req.user]
      );
      res.json(request[request.length - 1]);
    } catch (error) {
      console.log(error);

      res.status(500).send("Server Error");
    }
  }
);

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
