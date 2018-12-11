// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express');        // call express
const app = express();                 // define our app using express
const bodyParser = require('body-parser');
const morgan = require('morgan')

const dbConnection = require('./database')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const passport = require('./passport');
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: 'mr-potato-head',
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls serializeUser and deserializeUser
//serialize saves user id to req.session.passport.user = {id:'...'}
//deserialize chekcs to see if user is saved in db, and if found it assigns
//it to the request as req.user = {user object}

const apiRoutes = require('./routes')

app.use(apiRoutes)

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api


// Starting Server 
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});