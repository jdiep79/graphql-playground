const resolvers = {
  Query: {
    latestReviews: (_, __, { dataSources }) => {
      return dataSources.reviewsAPI.getLatestReviews();
    },
  },
  Mutation: {
    submitReview: (_, { locationReview }, { dataSources }) => {
      const newReview =
        dataSources.reviewsAPI.submitReviewForLocation(locationReview);
      return {
        code: 200,
        success: true,
        message: 'success',
        locationReview: newReview,
      };
    },
  },
  Review: {
    location: ({ locationId: id }) => {
      return { id };
    },
  },
  Location: {
    /**
     * This is optional with apollo server
     * also the data returned here, goes to the parent
     * for reviewsForLocation and overallRating. If
     * nothing is defined here, the resolvers below
     * will get a ref object with the typename and id
     * only
     */
    __resolveReference(ref, _ctx, _info) {
      console.log('ref', ref);
      return ref;
    },
    reviewsForLocation(parent, _args, { dataSources }) {
      /**
       * Parent is the reference object.
       * Is the id from the argument from
       * the location query?
       */
      console.log('reviews for location', parent);
      return dataSources.reviewsAPI.getReviewsForLocation(parent.id);
    },
    overallRating({ id }, _args, { dataSources }) {
      return dataSources.reviewsAPI.getOverallRatingForLocation(id);
    },
  },
};

module.exports = resolvers;
