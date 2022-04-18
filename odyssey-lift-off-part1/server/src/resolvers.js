const fetch = require('node-fetch-commonjs');

const resolvers = {
  Query: {
    nullValue: () => {
      return null;
    },
    role: (_parent, { userRole }) => {
      return userRole === 'ADMIN'
        ? 'user is an admin'
        : 'user is a regular user';
    },
    user: (_parent, { userInfo }) => {
      return `${userInfo.name}: ${userInfo.sex}`;
    },
    tracksForHome: (_parent, _args, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    track: (_parent, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
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
  Mutation: {
    incrementTrackViews: async (_parent, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
  },
  Track: {
    author: (parent, _args, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(parent.authorId);
    },
    modules: (parent, _args, { dataSources }) => {
      return dataSources.trackAPI.getModules(parent.id);
    },
    module: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getModule(id);
    },
    durationInSeconds: ({ length }) => {
      return length;
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
