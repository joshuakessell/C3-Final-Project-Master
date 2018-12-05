//Connect to Mongo database
const MongoClient = require('mongoose')
MongoClient.Promise = global.Promise

const uri = process.env.MONGODB_URI || "mongodb://heroku_twlt8q9p:q9relo0d4o5n9lk3u0umr0qbo2@ds121483.mlab.com:21483/heroku_twlt8q9p"

MongoClient.connect(uri).then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Connected to Mongo');
        
    },
    err => {
         /** handle initial connection error */ 
         console.log('error connecting to Mongo: ')
         console.log(err);
         
        }
  );


module.exports = MongoClient.connection