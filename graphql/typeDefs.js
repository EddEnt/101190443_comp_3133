const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    username: String
    email: String
    password: String
    token: String
  }

  type Employee {
    first_name: String
    last_name: String
    email: String
    gender: String
    salary: Float
  }

  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input EmployeeInput {
    first_name: String
    last_name: String
    email: String
    gender: String
    salary: Float
  }

  input updateEmployeeInput {
    first_name: String
    last_name: String
    email: String
  }

  type Query {
    user(id: ID!): User
    employeeByID(id: ID!): Employee
    viewAllEmployees: [Employee!]!
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    createEmployee(employeeInput: EmployeeInput): Employee
    updateEmployee(id: ID!, employeeInput: EmployeeInput): Employee
    deleteEmployee(id: ID!): Boolean
  }
`;
