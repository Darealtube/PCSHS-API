import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const ProfileSchema = new Schema({
  _id: ObjectId,
  lrn: String,
  name: String,
  email: String,
  image: String,
  password: String,
  sex: String,
  dateOfBirth: String,
  currentGrade: String,
  currentSection: String,
  address: String,
  role: String,
  contact: String,
  announcements: [ObjectId],
});

export default mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema);
