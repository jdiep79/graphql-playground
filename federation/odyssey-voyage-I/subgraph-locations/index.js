const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const resolvers = require('./resolvers');
const LocationsAPI = require('./datasources/LocationsApi');
const typeDefs = gql(
  readFileSync('./locations.graphql', { encoding: 'utf-8' })
);

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
  dataSources: () => {
    return { locationsAPI: new LocationsAPI() };
  },
});

server
  .listen({ port: 4001 })
  .then(({ url }) => {
    console.log(`Subgraph location running at ${url}`);
  })
  .catch((err) => console.error(err));
