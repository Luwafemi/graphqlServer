const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const axios = require("axios");

/*
//  METHOD 1: USING HARD CODED DATA
----------------------------------------------------------------------------------------------------------------------------------------
// Hardcoded data
const customers = [
  { id: "1", name: "John Doe", email: "jdoe@gmail.com", age: 35 },
  { id: "2", name: "Steve Smith", email: "smith@gmail.com", age: 25 },
  { id: "3", name: "Sara Williams", email: "sara@gmail.com", age: 32 },
];

//Customer Type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    Customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id == args.id) {
            return customers[i];
          }
        }
      },
    },
    Customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return customers;
      },
    },
  },
});
----------------------------------------------------------------------------------------------------------------------------------------
*/

// METHOD 2: USING  A REST API
// ----------------------------------------------------------------------------------------------------------------------------------------

//Customer Type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    Customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        let resp = await axios.get(
          `http://localhost:3000/customers/${args.id}`
        );
        return resp.data;
      },
    },
    Customers: {
      type: new GraphQLList(CustomerType),
      async resolve(parentValue, args) {
        let resp = await axios.get(`http://localhost:3000/customers`);
        return resp.data;
      },
    },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parentValue, args) {
        let resp = await axios.post(`http://localhost:3000/customers`, args);
        return resp.data;
      },
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      async resolve(parentValue, args) {
        let resp = await axios.patch(
          `http://localhost:3000/customers/${args.id}`,
          args
        );
        return resp.data;
      },
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, args) {
        let resp = await axios.delete(
          `http://localhost:3000/customers/${args.id}`
        );
        return resp.data;
      },
    },
  },
});
// ----------------------------------------------------------------------------------------------------------------------------------------

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
