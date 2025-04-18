const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  email: String,
  hash: String,
  salt: String
});

// Hashing password
userSchema.methods.setPassword = function(password) {
  this.salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, this.salt);
};

// Validating password
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.hash);
};

// Generating JWT
userSchema.methods.generateJwt = function() {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username
    },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '1h', algorithm: 'HS256' }
  );
};

mongoose.model('User', userSchema);
