const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasources/track-api');

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    inheritResolversFromInterfaces: true,
  }),
  dataSources: () => {
    return {
      trackAPI: new TrackAPI(),
    };
  },
});

server.listen().then(() => {
  console.log(`🚀 Service is running`);
});
