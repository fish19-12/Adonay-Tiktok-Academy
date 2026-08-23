const express = require("express");

const {
  createRegistration,
  getRegistrationStats,
  getRegistrations,
  getRegistration,
  approveRegistration,
  rejectRegistration,
} = require("../controllers/registerController");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| REGISTRATION
|--------------------------------------------------------------------------
*/

/*
POST
/api/register

Used by your registration page.
*/
router.post("/", createRegistration);

/*
|--------------------------------------------------------------------------
| REGISTRATION STATS
|--------------------------------------------------------------------------
*/

/*
GET
/api/register/stats

Returns:

{
  registeredStudents: 10,
  approved: 5,
  pending: 4,
  rejected: 1
}
*/
router.get("/stats", getRegistrationStats);

/*
|--------------------------------------------------------------------------
| GET ALL REGISTRATIONS
|--------------------------------------------------------------------------
*/

/*
GET
/api/register
*/
router.get("/", getRegistrations);

/*
|--------------------------------------------------------------------------
| GET ONE REGISTRATION
|--------------------------------------------------------------------------
*/

/*
GET
/api/register/:id
*/
router.get("/:id", getRegistration);

/*
|--------------------------------------------------------------------------
| APPROVE REGISTRATION
|--------------------------------------------------------------------------
*/

/*
PUT
/api/register/:id/approve
*/
router.put("/:id/approve", approveRegistration);

/*
|--------------------------------------------------------------------------
| REJECT REGISTRATION
|--------------------------------------------------------------------------
*/

/*
PUT
/api/register/:id/reject
*/
router.put("/:id/reject", rejectRegistration);

module.exports = router;
