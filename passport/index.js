const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
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
passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},function (req, username, password, done) {
    process.nextTick = () => {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (user) { return done(null, false, req.flash('signupMessage', 'That email is already taken.')); }
      else { 
        var newUser=new User();
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.save(function(err){
          if (err) { throw err }
          return (null, newUser);
        })
      }
    });
  }}
));

passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function (req, username, password, done) {
    process.nextTick = () => {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, req.flash('loginMessage','No user found.')); }
        if (!user.validPassword(password)) {return done(null, false, req.flash('loginMessage', 'Wrong Password.'))}
        return (null, newUser);
        });
      };
    }));  

module.exports = passport
