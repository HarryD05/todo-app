const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true
  },
  todos: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo'
    }]
  }
});
//use of enum means the role can be one of the items in the array

//Mongoose middleware - this is called whenever a user is saved to the database
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
    //ensures the password is only hashed once
  }

  bcrypt.hash(this.password, 10, (error, passwordHash) => {
    if (error) return next(error);

    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) return cb(error);

    if (!isMatch) return cb(null, isMatch);

    return cb(null, this); //this is the user object

  })
}

module.exports = User = mongoose.model('User', UserSchema);