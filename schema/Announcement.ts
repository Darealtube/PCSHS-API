import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import dayjs from "dayjs";

const announceDate = () => {
  return dayjs().toDate;
};

const AnnouncementSchema = new Schema({
  _id: ObjectId,
  header: String,
  body: String,
  footer: String,
  image: [String],
  video: String,
  authorID: ObjectId,
  author: ObjectId,
  type: String,
  date: {
    type: Date,
    default: announceDate,
  },
});

export default mongoose.models.Chat ||
  mongoose.model("Announcement", AnnouncementSchema);
