const fetch = require('node-fetch-commonjs');

const resolvers = {
  Query: {
    nullValue: () => {
      return null;
    },
    gender: (parent) => {
      return parent.prepend + 'male';
    },
    role: (_parent, { userRole }) => {
      console.log('getting role....');
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
  Response: {
    __resolveType(res) {
      if (res.track) return 'IncrementTrackViewsResponse';
    },
    // https://stackoverflow.com/questions/50499900/writing-an-apollo-resolver-for-an-interface
    code: (parent) => {
      /**
       * @notes
       *
       * The parent includes the code of 200.
       * So that means incrementTrackViews mutation
       * runs first. Since this child also returns the code,
       * it uses this child's code instead.
       */
      console.log('parent', parent);
      console.log('code');
      return 12344;
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
    title: ({ title, prepend }) => {
      console.log('prepend', prepend);
      console.log('title', title);
      return title;
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
      return parent;
    },
  },
  AuthorError: {
    id: () => {
      return 1;
    },
    name: () => {
      /**
       * @notes
       *
       * Because of this required field returning null,
       * the final data will return null even if the other
       * fields were able to resolve
       */
      return null;
    },
    photo: () => {
      return 'this is a photo';
    },
  },
};

module.exports = resolvers;
