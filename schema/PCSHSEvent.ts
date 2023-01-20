import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema({
  _id: ObjectId,
  title: String,
  description: String,
  day: Number,
  month: Number,
  year: Number,
});

export default mongoose.models.PCSHSEvent ||
  mongoose.model("PCSHSEvent", EventSchema);
