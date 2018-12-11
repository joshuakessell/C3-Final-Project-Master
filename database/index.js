//Connect to Mongo database
const MongoClient = require('mongoose')
MongoClient.Promise = global.Promise

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"

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