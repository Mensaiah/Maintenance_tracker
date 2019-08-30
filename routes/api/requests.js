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

    // Check user admin status
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

// @route  PUT /api/v1/requests/:id/approve
// @desc  Approve user request
// @access Private
router.put("/:id/approve", auth, async (req, res) => {
  try {
    const isAdmin = await queryData("SELECT * FROM users WHERE user_uid = $1", [
      req.user
    ]);
    const request = await queryData(
      "SELECT * FROM requests WHERE req_uid = $1",
      [req.params.id]
    );

    // Check Admin status of User
    if (isAdmin[0].admin_status === false) {
      return res.status(400).json({ msg: "User Not Authorised" });
    }

    // Check if Request Exists
    if (request.length === 0) {
      return res.status(404).json({ msg: "Request Not Found" });
    }

    // CHECK IF REQUEST IS PENDING
    if (request[0].request_status !== "Pending") {
      return res.status(400).json({ msg: "Not a Pending Request" });
    }

    // Approve Request
    await queryData(
      "UPDATE requests SET request_status = $1 WHERE req_uid = $2",
      ["Approved", req.params.id]
    );

    // Get Approved Request
    const approvedRequest = await queryData(
      "SELECT * FROM requests WHERE req_uid = $1",
      [req.params.id]
    );

    res.json(approvedRequest);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// @route  PUT /api/v1/requests/:id/disapprove
// @desc  disapprove user request
// @access Private
router.put("/:id/disapprove", auth, async (req, res) => {
  try {
    const isAdmin = await queryData("SELECT * FROM users WHERE user_uid = $1", [
      req.user
    ]);
    const request = await queryData(
      "SELECT * FROM requests WHERE req_uid = $1",
      [req.params.id]
    );

    // Check Admin status of User
    if (isAdmin[0].admin_status === false) {
      return res.status(400).json({ msg: "User Not Authorised" });
    }

    // Check if Request Exists
    if (request.length === 0) {
      return res.status(404).json({ msg: "Request Not Found" });
    }

    // CHECK IF REQUEST IS PENDING
    if (request[0].request_status !== "Pending") {
      return res.status(400).json({ msg: "Not a Pending Request" });
    }

    // disapprove Request
    await queryData(
      "UPDATE requests SET request_status = $1 WHERE req_uid = $2",
      ["Disapproved", req.params.id]
    );

    // Get disapproved Request
    const disapprovedRequest = await queryData(
      "SELECT * FROM requests WHERE req_uid = $1",
      [req.params.id]
    );

    res.json(disapprovedRequest);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}); // @route  PUT /api/v1/requests/:id/resolve
// @desc  resolve user request
// @access Private
router.put("/:id/resolve", auth, async (req, res) => {
  try {
    const isAdmin = await queryData("SELECT * FROM users WHERE user_uid = $1", [
      req.user
    ]);
    const request = await queryData(
      "SELECT * FROM requests WHERE req_uid = $1",
      [req.params.id]
    );

    // Check Admin status of User
    if (isAdmin[0].admin_status === false) {
      return res.status(400).json({ msg: "User Not Authorised" });
    }

    // Check if Request Exists
    if (request.length === 0) {
      return res.status(404).json({ msg: "Request Not Found" });
    }

    // CHECK IF REQUEST IS PENDING
    if (request[0].request_status !== "Approved") {
      return res
        .status(400)
        .json({ msg: "Request needs to be approved before it is resolved" });
    }

    // resolve Request
    await queryData(
      "UPDATE requests SET request_status = $1 WHERE req_uid = $2",
      ["Resolved", req.params.id]
    );

    // Get resolved Request
    const resolvedRequest = await queryData(
      "SELECT * FROM requests WHERE req_uid = $1",
      [req.params.id]
    );

    res.json(resolvedRequest);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});
export default router;
