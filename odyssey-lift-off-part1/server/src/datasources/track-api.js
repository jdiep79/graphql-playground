const { RESTDataSource } = require('apollo-datasource-rest');

class TrackAPI extends RESTDataSource {
  constructor() {
    super();
    // https://odyssey-lift-off-rest-api.herokuapp.com/docs/#/Tracks/get_tracks
    this.baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/';
  }

  getTracksForHome() {
    return this.get('tracks');
  }

  getAuthor(authorId) {
    console.log('authorId', authorId);
    return this.get(`author/${authorId}`);
  }
}

module.exports = TrackAPI;
