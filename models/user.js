import mongoose from 'mongoose';
import bcrypt from 'brcypt';
import uniqueValidator from 'mongoose-unique-validator';
import mongooseHidden from 'mongoose-hidden';
import { emailRegex } from '../lib/stringTesters.js';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  // isAdmin: { type: Boolean },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (email) => emailRegex.test(email),
  },

  password: {
    type: String,
    required: true,
    validate: (pw) =>
      /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(pw),
  },
});

userSchema.pre('save', function encryptPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSynch(this.password, bcrypt.genSaltSync());
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(
  mongooseHidden({ defaultHidden: { password: true, email: true } })
);

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
