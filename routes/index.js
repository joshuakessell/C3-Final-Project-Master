const express = require("express");
const router = express.Router();
const passport = require('../passport')
const User = require('../database/models/user');

// middleware to use for all requests
router.use(function (req, res, next) {
  console.log('===API CALL===');
  next(); // make sure we go to the next routes and don't stop here
});

// Grab current/previous logged in user session if available
router.get("/", (req, res, next) => {
  console.log('==== user!!====')
  console.log(req.user)
  if (req.user){
    res.json({ user: req.user })
  } else {
    res.json({ user: null })
  }
})

//Sign up
router.post('/api/signup', (req, res) => {
  let checkUser = req.body;
  console.log(checkUser);
  User.findOne({ username: checkUser.username }, (err, user) => {
    if (err) {
      console.log('User.js post error: ', err)
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${checkUser.username}`
      })
    }
    else {
      newUser = new User({
        username: username,
        password: password,
        email: email
      })
      newUser.save()
      .then(item => {
        res.send('item saved to database');
        this.setState({ redirectTo: '/' })
          .catch(err => {
            res.status(400).send('unable to save to database');
          });
        });
      };
  })
})


  //Sign in and authenticate
router.post('api/login', 
  passport.authenticate('local', { failureRedirect: '/'}),
  (req, res,) => {
    console.log('logged in', req.user); 
    var userInfo = {
      username: req.user.username
    };
    res.send(userInfo);
  }
)

  // Log out
  router.post('/api/logout', (req, res) => {
    if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
    } else {
      res.send({ msg: 'no user to log out' })
    }
  })



module.exports = router;
