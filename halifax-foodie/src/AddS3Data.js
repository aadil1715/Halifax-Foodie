const AWS = require('aws-sdk')
const fs = require('fs')
const { type } = require('os')
const ACCESS_KEY_ID = "ASIAUOKAFNQPUDEDFHWQ"
const SECRET_ACCESS_KEY = "wBctDj2SmrMBWxXn5mkj+tvP/+lm1fiSbvYWdh0Q"
const BUCKET_NAME = "serverlessprojectfeedback"
const SESSION_TOKEN = "FwoGZXIvYXdzEEAaDGxA57f3kbLFH6bENCK/AZoMtlSiOqfOTgc5k9LJUjv4HEDU28CpHHvc6AdHOW2Oj+K6A8ch485P0z3P11ru9SS2aPwjyn1fdKxWy2Bpv5lqz7A6bCbLr8rh/mzxbR6Pz/6fx64x9g1BSiMS5NEoP687WYpa88KpUZCau5HUrEeJ30cPBRjC8XqinLFbZGtJmyByY1DAiYa6lQN7PtBQUoUDQ1IqjDveq3st2p8lPi6Zabf6/7FsHrOK/oWm2h/z5+k/uAzNYyUlrBl3MVJ2KPnQ94cGMi30GEDPLBorNWqUwqw9WnLoI9LKKCV3EIeZZOZn/qPsaD9CqnXStQp7sEkIxaY="

let existingFeedback;
var s3 = new AWS.S3({
    accessKeyId:ACCESS_KEY_ID,
    secretAccessKey:SECRET_ACCESS_KEY,
    sessionToken:SESSION_TOKEN
})
var params = {
    Key: 'sampleFeedbacks.txt',
    Bucket: BUCKET_NAME
}
s3.getObject(params, function(err, data) {
    if (err) {
        throw err
    }

    existingFeedback = new Buffer.from(data.Body).toString();
    // fs.writeFileSync('./test.txt', data.Body)
    console.log('file downloaded successfully')
})


let newFeedback = ""
existingFeedback += newFeedback;


// s3.deleteObject(params, function(err, data) {
//   if (err) console.log(err, err.stack);  // error
//   else     console.log();                 // deleted
// });


params = {
    Key: 'sampleFeedbacks.txt',
    Bucket: BUCKET_NAME,
    Body: existingFeedback
}

// call S3 to retrieve upload file to specified bucket
s3.upload (params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } if (data) {
      console.log("Upload Success", data.Location);
    }
  });

