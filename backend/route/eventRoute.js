import express from "express";
import { isLoggedIn } from "../middleware/isloggedin.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { bookEvent, cancelBooking, eventRegister, getAllEvents, getEventbyId, getMyEvents } from "../controller/event.js";
const router = express.Router();
router.route("/createEvent").post(isLoggedIn,isAdmin,eventRegister);
router.route("/id/:eventId").get(isLoggedIn,getEventbyId)
router.route("/bookEvent").post(isLoggedIn,bookEvent);
router.route("/cancelBooking").post(isLoggedIn,cancelBooking);
router.route("/getAllEvent").get(isLoggedIn,getAllEvents)
router.route("/mybooking").get(isLoggedIn,getMyEvents)

export default router;