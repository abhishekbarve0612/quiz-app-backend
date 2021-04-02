import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized User!' });
  }
};

const register = (req, res) => {
  const newUser = new User(req.body);
  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({ message: err });
    } else {
      user.hashPassword = undefined;
      return res.json(user);
    }
  });
};

const login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(404).json({ message: 'Authorization Failed! User not found' });
    } else if (user) {
      if (!user.comparePassword(req.body.password, user.hashPassword)) {
        res.status(401).json({ message: 'Wrong Password' });
      } else {
        return res.json({
          token: jwt.sign(
            {
              email: user.email,
              username: user.username,
              _id: user.id,
            },
            'ASecretWord'
          ),
        });
      }
    }
  });
};

export { loginRequired, register, login };
