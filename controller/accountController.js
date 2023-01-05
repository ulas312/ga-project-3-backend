import Account from '../models/account.js';

const getUserAccount = async (_req, res, next) => {
  try {
    const account = await Account.find();
    return res.status(200).json(account);
  } catch (e) {
    next(e);
  }
};

const updateUserAccount = async (req, res, next) => {
  try {
    if (req.currentUser.isAdmin) {
      const account = await Account.findById(req.params.id);
      account.set(req.body);
      const updatedAccount = await account.save();
      return res.status(200).json(updatedAccount);
    }

    return res.status(301).json({ message: 'Unauthorized' });
  } catch (e) {
    next(e);
  }
};

const deleteUserAccount = async (req, res, next) => {
  try {
    const account = await Account.findById(req.params.id);

    if (req.currentUser.isAdmin) {
      await Account.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Successfully deleted account' });
    }

    return res.status(301).json({ message: 'Unauthorized' });
  } catch (e) {
    next(e);
  }
};

export default {
  getUserAccount,
  updateUserAccount,
  deleteUserAccount,
};
