import mongoose from "mongoose";
const participantSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;
