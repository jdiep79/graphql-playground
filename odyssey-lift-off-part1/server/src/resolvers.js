const fetch = require('node-fetch-commonjs');

const resolvers = {
  Query: {
    tracksForHome: (_parent, _args, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    tracksForHomeFetch: async (_parent, _args, { dataSources }) => {
      const baseUrl = 'https://odyssey-lift-off-rest-api.herokuapp.com';
      const res = await fetch(`${baseUrl}/tracks`);
      return res.json();
    },
  },
  Track: {
    author: (parent, _args, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(parent.authorId);
    },
  },
  TrackFetch: {
    author: async (parent, _args, { dataSources }) => {
      const baseUrl = 'https://odyssey-lift-off-rest-api.herokuapp.com';
      const res = await fetch(`${baseUrl}/author/${parent.authorId}`);
      return res.json();
    },
  },
};

module.exports = resolvers;
