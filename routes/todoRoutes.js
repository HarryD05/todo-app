const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');

const User = require('../models/userModel');
const Todo = require('../models/todoModel');

router.get('/count', passport.authenticate('jwt', { session: false }), async (request, response) => {
  const all = await Todo.find();
  const archived = await Todo.find({ archived: true });
  const completed = await Todo.find({ completed: true });

  response.json({ total: all.length, archived: archived.length, completed: completed.length });
});


router.post('/create', passport.authenticate('jwt', { session: false }), (request, response) => {
  const todo = new Todo(request.body);

  todo.save(error => {
    if (error) {
      response.status(500).json({
        message: { msgBody: "Error has occured", msgError: true }
      });
    } else {
      request.user.todos.push(todo);
      request.user.save(error => {
        if (error) {
          response.status(500).json({
            message: { msgBody: "Error has occured", msgError: true }
          });
        } else {
          response.status(200).json({
            message: { msgBody: "Successfully created todo", msgError: false }
          });
        }
      });
    }
  });
});

router.post('/toggle', passport.authenticate('jwt', { session: false }), (request, response) => {
  Todo.findById(request.body.id, (error, doc) => {
    if (error) {
      response.status(500).json({
        message: { msgBody: "Error has occured, todo doesn't exist", msgError: true }
      });
    } else {
      doc.completed = !doc.completed;

      doc.save((error, result) => {
        if (error) {
          response.status(500).json({
            message: { msgBody: "Error has occured", msgError: true }
          });
        } else {
          response.send(result);
        }
      });
    }
  });
});

router.post('/archive', passport.authenticate('jwt', { session: false }), (request, response) => {
  Todo.findById(request.body.id, async (error, doc) => {
    if (error) {
      response.status(500).json({
        message: { msgBody: "Error has occured, todo doesn't exist", msgError: true }
      });
    } else {
      if (request.body.setArchived) {
        doc.completed = true;
        doc.archived = true;
      } else {
        doc.archived = false;
      }

      await doc.save((error, result) => {
        if (error) {
          response.status(500).json({
            message: { msgBody: "Error has occured", msgError: true }
          });
        } else {
          response.send(result);
        }
      });
    }
  });
});

router.get('/todos', passport.authenticate('jwt', { session: false }), (request, response) => {
  User.findById({ _id: request.user._id }).populate('todos').exec((error, document) => {
    if (error) {
      response.status(500).json({
        message: { msgBody: "Error has occured", msgError: true }
      });
    } else {
      response.status(200).json({
        todos: {
          all: document.todos,
          current: document.todos.filter(todo => !todo.archived),
          completed: document.todos.filter(todo => todo.completed),
          archived: document.todos.filter(todo => todo.archived)
        },
        authenticated: true
      })
    }
  }); //gets the data from the ids held in todos
});


module.exports = router;