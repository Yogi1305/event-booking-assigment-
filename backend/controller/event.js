import Event from "../model/event.js";
import Participant from "../model/participatant.js";

export const eventRegister=async(req,res)=>{
    try {
        const { title,description,venue,date,price,seats } = req.body;
        if (!title || !date || !venue || !description || !price || !seats) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const event = new Event({ title,description,venue,date,price,seats });
        await event.save();
        return res.status(201).json({ message: "Event created successfully" ,success:true});
    } catch (error) {
        console.log("error in event register",error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// to book in event
export const bookEvent=async(req,res)=>{
    try {
        const { eventId } = req.body;
        const userId=req.user.id;
        if (!eventId) {
            return res.status(400).json({ message: "Event ID is required" });
        }
        const  event =await Participant.findOne({eventId});
        const eventDetails=await Event.findOne({_id:eventId});
        if(!eventDetails){
            return res.status(404).json({ message: "Event not found" });
        }
        if (event) {
            const isRegistered = event.userId.includes(userId);
            if (isRegistered) {
                return res.status(400).json({ message: "User already registered for this event" });
            }
            if (event.seat >= eventDetails.availableSeats) {
                return res.status(400).json({ message: "No seats available" });
            }
            event.userId.push(userId);
            event.seat += 1;
            await event.save();
            return res.status(200).json({ message: "Event booked successfully" ,success:true});
        }
        const participant = new Participant({ eventId, userId:[userId], seat:1});
        await participant.save();
        return res.status(201).json({ message: "Event booked successfully" ,success:true});
    } catch (error) {
        console.log("error in booking event",error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// cancel the booking

export const cancelBooking=async(req,res)=>{
    try {
        const { eventId } = req.body;
        const userId = req.user.id;
        if (!eventId) {
            return res.status(400).json({ message: "Event ID is required" });
        }
        const event = await Participant.findOne({ eventId });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        const isRegistered = event.userId.includes(userId);
        if (!isRegistered) {
            return res.status(400).json({ message: "User not registered for this event" });
        }
        event.userId = event.userId.filter(id => id !== userId);
        event.seat -= 1;
        await event.save();
        return res.status(200).json({ message: "Booking cancelled successfully", success: true });
    } catch (error) {
        console.log("error in cancelling booking", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// get all events
export const getAllEvents=async(req,res)=>{
    try {
        const events= await Event.find({});
        return res.status(200).json({ events, success: true });
    } catch (error) {
        console.log("error in getting all events", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
// get all my booked events
export const getMyEvents=async(req,res)=>{
    try {
        const userId=req.user.id;
        const myEvents= await Participant.find({ userId: { $in: [userId] } }).populate('eventId');
        return res.status(200).json({ myEvents, success: true });
    } catch (error) {
        console.log("error in getting my events", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}