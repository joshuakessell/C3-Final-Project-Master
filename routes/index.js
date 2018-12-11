const express = require("express");
const router = express.Router();
const passport = require('../passport')

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
router.post('api/signup',
  passport.authenticate('local-signup', { 
    failureRedirect: '/signup',
    successRedirect: '/',
    failureFlash: true
  }));

  //Sign in and authenticate
router.post('api/login', 
  passport.authenticate('local', { 
    failureRedirect: '/',
    successRedirect: '/dashboard',
    failureFlash: true
  }));

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
