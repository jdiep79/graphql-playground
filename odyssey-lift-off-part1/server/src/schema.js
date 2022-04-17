const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    tracksForHome: [Track!]!
    tracksForHomeFetch: [TrackFetch!]!
  }

  "A track is a group of Modules that teaches about a spefic topic"
  type Track {
    id: ID!
    "The track's title"
    title: String!
    author: Author!
    thumbnail: String
    length: Int
    modulesCount: Int
  }

  "Author of a complete Track"
  type Author {
    id: ID!
    name: String!
    photo: String
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
`;

module.exports = typeDefs;
