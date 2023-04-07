/**
 * Not the main index.js file, but the one in the resolvers folder
 * This file is used to combine all the resolvers into one file,
 * then imported into the main index.js file, and used to call our resolvers.
 */

const usersResolvers = require("./Users");
const employeesResolvers = require("./Employees");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...employeesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...employeesResolvers.Mutation,
  },
};
