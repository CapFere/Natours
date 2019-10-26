const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const { catchAsync } = require('./errorController');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).map(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateCurrentUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password update.', 400));
  }
  const filterdObj = filterObj(req.body, 'name', 'email');
  const user = await User.findByIdAndUpdate(req.user._id, filterdObj, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ status: 'success', data: { user } });
});

exports.deleteCurrentUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({ status: 'success', data: null });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitField()
    .paginate();
  const users = await features.query;

  res
    .status(200)
    .json({ status: 'success', results: users.length, data: { users } });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Api end point is not ready'
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Api end point is not ready'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Api end point is not ready'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Api end point is not ready'
  });
};
