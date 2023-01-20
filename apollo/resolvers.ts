import { GraphQLResolveInfo } from "graphql";
import Announcement from "../schema/Announcement";
import PCSHSEvent from "../schema/PCSHSEvent";
import Profile from "../schema/Profile";
import relayPaginate from "../utils/relayPaginate";

type ResolverFn = (
  parent: any,
  args: any,
  ctx: any,
  info: GraphQLResolveInfo
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}
interface Resolvers {
  [resolver: string]: ResolverMap;
}

export const resolvers: Resolvers = {
  Announcement: {
    author: async (parent, _args, _context, _info) => {
      return await Profile.findById(parent._id);
    },
  },
  Query: {
    getEvents: async (_parent, args, _context, _info) => {
      return await PCSHSEvent.find({ month: args.month, year: args.month });
    },
    getAnnouncements: async (_parent, args, _context, _info) => {
      const announcements = await Announcement.find({
        _id: { $lt: args.after },
      })
        .limit(args.limit)
        .sort({ _id: -1 });
      return relayPaginate({ finalArray: announcements, limit: args.limit });
    },
    getAnnouncement: async (_parent, args, _context, _info) => {
      return await Announcement.findById(args.announcementID);
    },
  },
  Mutation: {
    createAnnouncement: async (_parent, args, _context, _info) => {
      const newAnnouncement = await Announcement.create({ ...args });
      return newAnnouncement;
    },
    editAnnouncement: async (_parent, args, _context, _info) => {
      const { announcementID, ...updatedInfo } = args;
      const editedAnnouncement = await Announcement.findByIdAndUpdate(
        args.announcementID,
        { ...updatedInfo },
        { new: true }
      );
      return editedAnnouncement;
    },
    deleteAnnouncement: async (_parent, args, _context, _info) => {
      await Announcement.deleteOne({ _id: args.announcementID });
      return true;
    },
    createEvents: async (_parent, args, _context, _info) => {
      const newEvent = await PCSHSEvent.create({ ...args });
      return newEvent;
    },
    editEvent: async (_parent, args, _context, _info) => {
      const { eventID, ...updatedInfo } = args;
      const editedEvent = await PCSHSEvent.findByIdAndUpdate(
        eventID,
        { ...updatedInfo },
        { new: true }
      );
      return editedEvent;
    },
    deleteEvent: async (_parent, args, _context, _info) => {
      await PCSHSEvent.deleteOne({ _id: args.eventID });
      return true;
    },
    getProfile: async (_parent, args, _context, _info) => {
      return await Profile.findById(args.profileID);
    },
    editProfile: async (_parent, args, _context, _info) => {
      const { profileID, ...updatedInfo } = args;
      const editedProfile = await PCSHSEvent.findByIdAndUpdate(
        profileID,
        { ...updatedInfo },
        { new: true }
      );
      return editedProfile;
    },
  },
};
