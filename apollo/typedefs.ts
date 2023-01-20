const typeDefs = `#graphql
    type Announcement {
        _id: ID!    
        header: String!    
        body: String! 
        footer: String  
        image: [String]  
        video: String
        author: Profile
        type: String!   
        date: String!    
    }

    type Profile {
        _id: ID!
        lrn: String!
        name: String!
        email: String
        image: String
        password: String!
        sex: String
        dateOfBirth: String
        currentGrade: String
        currentSection: String
        address: String
        role:String!
        contact:String
        announcements: [ID!]
    }

    type Event {
        _id: String
        title: String
        description: String
        day: Int
        month: Int
        year: Int
    }

    type EventConnection {
        edges: [EventEdge]
        totalCount: Int
        pageInfo: PageInfo
    }

    type EventEdge {
        node: Event
    }

    type AnnouncementConnection {   
        edges: [AnnouncementEdge]
        totalCount: Int
        pageInfo: PageInfo
    }

    type AnnouncementEdge {
        node: Announcement
    }

    type PageInfo {
        hasNextPage: Boolean
        endCursor: Int
    }

    type Query {
        getEvents(month: Int!, year: Int!): [Events]
        getAnnouncements(limit: Int, after: String, type: Announcement!): AnnouncementConnection
        getAnnouncement(announcementID: ID!): Announcement
    }

    type Mutation {
        createAnnouncement(
            header: String!
            body: String!
            footer: String
            image: [String]
            video: String
            type: String!
            author: ID!
            date: ID!
        ): Announcement
        deleteAnnouncement(announcementID: ID!): Boolean
        editAnnouncement(
            announcementID: ID!
            header: String!
            body: String!
            footer: String
            image: [String]
            video: String
        ): Announcement
       createEvents(
            title: String!
            description: String!
            day: Int!
            month: Int!
            year: Int!
       ): Event 
       editEvent(
            eventID: ID!
            title: String!
            description: String!
       ): Event
       deleteEvent(eventID:ID!): Boolean
       getProfile(profileID: ID!): Profile
       editProfile(
            profileID: ID!
            image: String
            currentGrade: String
            currentSection: String
            dateOfBirth: String
            email: String
            sex: String
            contact: String
            address: String
        ) 
    }
`;
