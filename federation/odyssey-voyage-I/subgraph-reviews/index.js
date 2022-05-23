const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const resolvers = require('./resolvers');
const ReviewsAPI = require('./datasources/ReviewsApi');
const typeDefs = gql(readFileSync('./reviews.graphql', { encoding: 'utf-8' }));

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
  dataSources: () => {
    return { reviewsAPI: new ReviewsAPI() };
  },
});

server
  .listen({ port: 4002 })
  .then(({ url }) => {
    console.log(`Subgraph reviews running at ${url}`);
  })
  .catch((err) => console.error(err));
