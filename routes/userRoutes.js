const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');

const User = require('../models/userModel');
const Todo = require('../models/todoModel');

const signToken = userID => {
  return JWT.sign({
    iss: "HarryD",
    sub: userID
  }, process.env.secretOrKey, { expiresIn: "1h" });
}

router.post('/register', (request, response) => {
  const { username, password, role } = request.body;

  User.findOne({ username }, (error, user) => {
    if (error) {
      return response.status(500).json({
        message: { msgBody: "Error has occured", msgError: true }
      });
    } if (user) {
      return response.status(400).json({
        message: { msgBody: "Username is already taken", msgError: true }
      });
    } else {
      const newUser = new User({ username, password, role });

      newUser.save(error => {
        if (error) {
          return response.status(500).json({
            message: { msgBody: "Error has occured", msgError: true }
          });
        } else {
          return response.status(201).json({
            message: { msgBody: "Account successfully created", msgError: false }
          });
        }
      })
    }
  });
});

router.post('/login', passport.authenticate('local', { session: false }), (request, response) => {
  if (request.isAuthenticated()) {
    const { _id, username, role } = request.user;
    const token = signToken(_id);

    response.cookie('access_token', token, { httpOnly: true, sameSite: true });
    response.status(200).json({
      isAuthenticated: true, user: { username, role }
    });
  } else {
    response.status(400).json({
      message: { msgBody: "Login failed", msgError: true }
    });
  }
});

//the password authenticate just ensures the user is logged in when using this route
router.get('/logout', passport.authenticate('jwt', { session: false }), (request, response) => {
  response.clearCookie('access_token');
  response.json({ user: { username: "", role: "" }, success: true });
});

router.get('/admin', passport.authenticate('jwt', { session: false }), (request, response) => {
  if (request.user.role === 'admin') {
    response.status(200).json({
      message: { msgBody: 'You are an admin', msgError: false }
    });
  } else {
    response.status(403).json({
      message: { msgBody: 'You are not an admin - attempt failed', msgError: true }
    });
  }
});

router.get('/authenticated', passport.authenticate('jwt', { session: false }), (request, response) => {
  const { username, role } = request.user;

  response.status(200).json({
    isAuthenticated: true, user: { username, role }
  });
});

router.get('/count', passport.authenticate('jwt', { session: false }), async (request, response) => {
  if (request.user.role === 'admin') {
    const all = await User.find();
    const admins = await User.find({ role: "admin" });
    const users = await User.find({ role: "user" });

    response.json({
      total: all.length,
      admins: admins.length,
      users: users.length
    });
  } else {
    response.status(403).json({
      message: { msgBody: 'You are not an admin - attempt failed', msgError: true }
    });
  }
});

router.get('/users', passport.authenticate('jwt', { session: false }), async (request, response) => {
  if (request.user.role === 'admin') {
    const all = await User.find();
    const admins = await User.find({ role: "admin" });
    const users = await User.find({ role: "user" });

    response.json({
      all: all,
      admins: admins,
      users: users
    });
  } else {
    response.status(403).json({
      message: { msgBody: 'You are not an admin - attempt failed', msgError: true }
    });
  }
});

router.post('/change-role', passport.authenticate('jwt', { session: false }), async (request, response) => {
  if (request.user.role === 'admin') {
    if (request.body.role !== 'user' && request.body.role !== 'admin') {
      return response.status(400).json({
        message: { msgBody: "Role doesn't exist", msgError: true }
      });
    }

    const user = await User.findById(request.body._id);

    if (!user) {
      return response.status(400).json({
        message: { msgBody: "Change failed", msgError: true }
      });
    }

    user.role = request.body.role;
    const result = await user.save();

    return response.json({
      message: { msgBody: 'Succesfully changed', msgError: false },
      body: result
    });
  } else {
    response.status(403).json({
      message: { msgBody: 'You are not an admin - attempt failed', msgError: true }
    });
  }
});

router.post('/reset', passport.authenticate('jwt', { session: false }), async (request, response) => {
  if (request.user.role === 'admin') {
    const user = await User.findById(request.body._id);

    if (!user) {
      return response.status(400).json({
        message: { msgBody: "Change failed", msgError: true }
      });
    }

    user.todos = [];
    const result = await user.save();

    return response.json({
      message: { msgBody: 'Succesfully changed', msgError: false },
      body: result
    });
  } else {
    response.status(403).json({
      message: { msgBody: 'You are not an admin - attempt failed', msgError: true }
    });
  }
});

module.exports = router;