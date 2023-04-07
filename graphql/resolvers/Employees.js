const Employee = require("../../models/Employee");
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { ApolloError } = require("apollo-server-errors");

module.exports = {
  Query: {
    async viewAllEmployees() {
      return await Employee.find();
    },
  },

  Mutation: {
    // Create a new employee
    async createEmployee(
      _,
      { employeeInput: { first_name, last_name, email, gender, salary } }
    ) {
      const newEmployee = new Employee({
        first_name: first_name,
        last_name: last_name,
        email: email.toLowerCase(),
        gender: gender,
        salary: salary,
      });

      // Saving the employee to the database
      const result = await newEmployee.save();
      console.log(result);

      return {
        id: result.id,
        ...result._doc,
      };
    },
  },
};
