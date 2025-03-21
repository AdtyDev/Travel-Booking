const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Booking {
    id: ID!
    name: String!
    destination: String!
    date: String!
    price: Float!
  }

  type Query {
    getBookings: [Booking]
  }

  type Mutation {
    addBooking(name: String!, destination: String!, date: String!, price: Float!): Booking
    deleteBooking(id: ID!): String
    updateBooking(id: ID!, name: String, destination: String, date: String, price: Float, aadhar_card: String): Booking
  }
`;

module.exports = typeDefs;
