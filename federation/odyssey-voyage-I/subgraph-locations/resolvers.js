const resolvers = {
  Query: {
    locations: (_, __, { dataSources }) => {
      return dataSources.locationsAPI.getAllLocations();
    },
    location: (_, { id }, { dataSources }) => {
      return dataSources.locationsAPI.getLocation(id);
    },
  },
  Location: {
    __resolveReference(ref, { dataSources }, _info) {
      return dataSources.locationsAPI.getLocation(ref.id);
    },
  },
};

module.exports = resolvers;
