const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../database/models/user')

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  console.log('*** serializeUser called, user: ')
  console.log(user) // the whole raw user object!
  console.log('---------')
  done(null, { _id: user._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  console.log('DeserializeUser called')
  User.findOne(
    { _id: id },
    'username',
    (err, user) => {
      console.log('*** Deserialize user, user:')
      console.log(user)
      console.log('--------------')
      done(null, user)
    }
  )
})

//  Use Strategies 
passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

module.exports = passport
