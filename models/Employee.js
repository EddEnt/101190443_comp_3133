const { model, Schema } = require("mongoose");

const employeeSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  gender: {
    type: String,
    required: true,
  },

  salary: {
    type: Number,
    required: true,
  },
});

module.exports = model("employees", employeeSchema);
