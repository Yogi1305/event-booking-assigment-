import express from "express";
import { isLoggedIn } from "../middleware/isloggedin.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { bookEvent, cancelBooking, eventRegister, getAllEvents } from "../controller/event.js";
const router = express.Router();
router.route("/createEvent").post(isLoggedIn,isAdmin,eventRegister);
router.route("/bookEvent").post(isLoggedIn,bookEvent);
router.route("/cancelBooking").post(isLoggedIn,cancelBooking);
router.route("/getAllEvent").get(isLoggedIn,getAllEvents)

export default router;