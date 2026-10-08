const express = require("express");

const {
  createRegistration,
  getRegistrationStats,
  getRegistrations,
  getRegistration,
  approveRegistration,
  rejectRegistration,
  deleteRegistration,
} = require("../controllers/registerController");

const router = express.Router();
const protect = require("../middleware/authMiddleware");

/*
|--------------------------------------------------------------------------
| REGISTRATION
|--------------------------------------------------------------------------
*/

/*
POST
/api/register

Create a new student registration.
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

router.get("/", protect, getRegistrations);

/*
|--------------------------------------------------------------------------
| GET ONE REGISTRATION
|--------------------------------------------------------------------------
*/

/*
GET
/api/register/:id
*/

router.get("/:id", protect, getRegistration);

/*
|--------------------------------------------------------------------------
| APPROVE REGISTRATION
|--------------------------------------------------------------------------
*/

/*
PUT
/api/register/:id/approve

Automatically sends the student an approval email.
*/

router.put("/:id/approve", protect, approveRegistration);

/*
|--------------------------------------------------------------------------
| REJECT REGISTRATION
|--------------------------------------------------------------------------
*/

/*
PUT
/api/register/:id/reject

Optional body:

{
  "reason": "The current intake is full."
}

Automatically sends the student a rejection email.
*/

router.put("/:id/reject", protect, rejectRegistration);

/*
|--------------------------------------------------------------------------
| DELETE REGISTRATION
|--------------------------------------------------------------------------
*/

/*
DELETE
/api/register/:id

Permanently deletes the registration.
*/

router.delete("/:id", protect, deleteRegistration);

module.exports = router;
