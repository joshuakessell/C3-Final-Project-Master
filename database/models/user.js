const MongoClient = require('mongoose');
const Schema = MongoClient.Schema;
const bcrypt = require('bcryptjs');

// Create a new Schema object
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: false,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  buddies: Array
});

// Define schema methods
userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
  if (!this.password) {
    console.log('models/user.js =======NO PASSWORD PROVIDED=======')
    next()
  } else {
    console.log('models/user.js hashPassword in pre save');
    this.password = this.hashPassword(this.password)
    next()
  }
})


// This creates our model from the above schema, using Mongoose's model method
const User = MongoClient.model('User', userSchema);

// Export the model
module.exports = User;