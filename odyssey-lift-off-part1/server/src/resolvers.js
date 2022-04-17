const fetch = require('node-fetch-commonjs');

const resolvers = {
  Query: {
    nullValue: () => {
      return null;
    },
    tracksForHome: (_parent, _args, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    tracksForHomeFetch: async (_parent, _args, { dataSources }) => {
      const baseUrl = 'https://odyssey-lift-off-rest-api.herokuapp.com';
      const res = await fetch(`${baseUrl}/tracks`);
      return res.json();
    },
    tracksForHomeError: (_parent, _args, { dataSources }) => {
      return [
        {
          id: '1',
          title: 'title',
        },
        {
          id: '2',
          title: 'title',
        },
        {
          id: '3',
          title: 'title',
        },
      ];
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
  TrackError: {
    author: async (parent, _args, { dataSources }) => {
      return {
        id: '1',
        name: null,
      };
    },
  },
};

module.exports = resolvers;
