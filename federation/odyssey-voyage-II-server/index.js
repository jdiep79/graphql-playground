const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');

require('dotenv').config();

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    if (context.userId) {
      request.http.headers.set('userid', context.userId);
      request.http.headers.set('userrole', context.userRole);
    }
  }
}

const server = new ApolloServer({
  gateway: new ApolloGateway({
    buildService: ({ url, name }) => {
      console.log('url', url);
      console.log('name', name);
      return new AuthenticatedDataSource({ url });
    },
  }),
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const userId = token.split(' ')[1]; // get the user name after 'Bearer '
    if (userId) {
      const { data } = await axios
        .get(`http://localhost:4011/login/${userId}`)
        .catch((error) => {
          throw new AuthenticationError(error.message);
        });

      return { userId: data.id, userRole: data.role };
    }
  },
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
