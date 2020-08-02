const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('./models/userModel');

const cookieExtractor = req => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }

  return token;
}

// Authorisation 
passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.secretOrKey
}, (payload, done) => {
  User.findById({ _id: payload.sub }, (error, user) => {
    if (error) return done(error, false);

    if (user) return done(null, user);
    else return done(null, false);
  });
}
))


// Authenticarted local Strategy using username & password (login)
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (error, user) => {
    //Error with database
    if (error) return done(error);

    //If no user exists with given username
    if (!user) return done(null, false); //no error, but no user

    //If user exists, check if the password is correct
    user.comparePassword(password, done);
  });
}))
