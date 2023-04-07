const User = require("../../models/User");
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { ApolloError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    user: (_, { ID }) => User.findById(ID),
  },

  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      //Check if user already exists
      const oldUser = await User.findOne({ email });

      //If user already exists, throw error
      if (oldUser) {
        throw new ApolloError(
          "A user is already registered with this email: " + email,
          "USER_ALREADY_EXISTS"
        );
      }

      //Encrypting password entered by User
      var encryptedPassword = await bcrypt.hash(password, 10);

      //Creating a new user with mongoose
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      //Creating a JWT token for the new user
      const token = jwt.sign({ user_id: newUser._id, email }, "secretString", {
        /**
         "secretString" is the secret key used to sign the token. 
         What you store in a safe and secure place, standard practice is not to
            store it in the code! Store in a safe and secure place, hidden
         */
        expiresIn: "1h",
      });

      newUser.token = token;

      //Saving the user to the database
      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async loginUser(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign({ user_id: user._id, email }, "secretString", {
          expiresIn: "2h",
        });

        // Saving the token to the database
        user.token = token;

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new ApolloError(
          "Incorrect email or password, please try again",
          "INCORRECT_PASSWORD"
        );
      }
    },
  },
};
