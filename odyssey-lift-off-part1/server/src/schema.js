const { gql } = require('apollo-server');

const typeDefs = gql`
  directive @upper(prepend: String!) on FIELD_DEFINITION | OBJECT

  type Query {
    tracksForHome: [Track!]!
    track(id: ID!): Track
    tracksForHomeFetch: [TrackFetch!]!
    tracksForHomeError: [TrackError!]!
    nullValue: String!
    role(userRole: Role!): String!
    user(userInfo: UserInfoInput!): String!
    gender: String! @upper(prepend: "gender: ")
  }

  input UserInfoInput {
    name: String!
    sex: String!
  }

  type Mutation {
    incrementTrackViews(id: ID!): Response!
  }

  enum Role {
    ADMIN
    USER
  }

  interface Response {
    code: Int!
    success: Boolean!
    message: String!
  }

  type IncrementTrackViewsResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    track: Track
  }

  "A track is a group of Modules that teaches about a spefic topic"
  type Track @upper(prepend: "track: ") {
    id: ID!
    "The track's title"
    title: String!
    author: Author!
    thumbnail: String
    length: Int @deprecated(reason: "Use durationInSeconds")
    durationInSeconds: Int
    modulesCount: Int
    description: String
    numberOfViews: Int
    modules: [Module!]!
    module(id: ID!): Module
  }

  "Author of a complete Track"
  type Author {
    id: ID!
    name: String!
    photo: String
  }

  type Module {
    id: ID!
    title: String!
    length: Int
  }

  "A track is a group of Modules that teaches about a spefic topic"
  type TrackFetch {
    id: ID!
    "The track's title"
    title: String!
    author: AuthorFetch!
    thumbnail: String
    length: Int
    modulesCount: Int
  }

  "Author of a complete Track"
  type AuthorFetch {
    id: ID!
    name: String!
    photo: String
  }

  "A track is a group of Modules that teaches about a spefic topic"
  type TrackError {
    id: ID!
    "The track's title"
    title: String!
    author: AuthorError!
    thumbnail: String
    length: Int
    modulesCount: Int
  }

  "Author of a complete Track"
  type AuthorError {
    id: ID!
    name: String!
    photo: String
  }
`;

module.exports = typeDefs;
