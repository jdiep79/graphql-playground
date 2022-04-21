const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasources/track-api');
const upperDirectiveTransformer = require('./directives');

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  inheritResolversFromInterfaces: true,
});

schema = upperDirectiveTransformer(schema, 'upper');

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      trackAPI: new TrackAPI(),
    };
  },
});

server.listen().then(() => {
  console.log(`🚀 Service is running`);
});
