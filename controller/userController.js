import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { SECRET } from '../config/environment.js';

async function registerUser(req, res, next) {
  try {
    if (req.body.password !== req.body.passwordConfirmation) {
      return res.status(422).json({ message: 'Passwords do not match' });
    }

    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}

async function loginUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'Unauthorized, user not found' });
    }

    const isValidPassword = user.validatePassword(req.body.password);

    if (!isValidPassword) {
      return res
        .status(403)
        .json({ message: 'Unauthorized, invalid password' });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      SECRET,
      { expiresIn: '6h' }
    );

    return res.status(202).send({ token, message: 'Login Successful!' });
  } catch (e) {
    next(e);
  }
}

const getUserAccount = async (req, res, next) => {
  try {
    const account = await Account.find();
    return res.status(200).json(account);
  } catch (e) {
    next(e);
  }
};

export default { registerUser, loginUser };
