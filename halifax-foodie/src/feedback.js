export default function feedback(props){
    const AWS = require('aws-sdk')
const fs = require('fs')
const { type } = require('os')
const ACCESS_KEY_ID = "ASIAUOKAFNQP4XVMZ3VV"
const SECRET_ACCESS_KEY = "BYnj2uzbyjZhSeov/xyy6HewqEmxOQzZgn41xtSb"
const BUCKET_NAME = "serverlessprojectfeedback"
const SESSION_TOKEN = "FwoGZXIvYXdzEFQaDLsiEMZ/DgDBdE8K7iK/ARRViMMHb2ynxEet1ByUSmxeHaWviJdftkdobcFBjFDFlyq87AMO+Yf99T2/AINzOQmCLS6O18dLJZWYEU3HqSFElQ4wjElM64uw3rR7Pm1+DKLO9C6MNWrWhQOQrJBp4Pp9zvV89desevzKxmx7OKnQK7z89M1OWOYZRTQZee84p9ahLj5G7vcveFizgKsHLgrNl1Mo4M1HSHvARi8qWfhHH8koD+XUV3Qiw4LvSEE/Rn1GwRp9Pe3vPkvrCmHBKLmN/IcGMi1HrRh8B6RD43JYhrkC6n+1c2k1j17PXHwDAeL+sG1i/U8SZVHbsSj0SPNcxsg="

let existingFeedback = "";
let newFeedback;
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
    newFeedback = props.feedback;
    existingFeedback += newFeedback + " ";

    var params2 = {
        Key: 'sampleFeedbacks.txt',
        Bucket: BUCKET_NAME,
        Body: existingFeedback
    }
    
    // call S3 to retrieve upload file to specified bucket
    s3.upload (params2, function (err, data) {
        if (err) {
          console.log("Error", err);
        } if (data) {
          console.log("Upload Success", data.Location);
        }
      });
    console.log(props.feedback);
})



// s3.deleteObject(params, function(err, data) {
//   if (err) console.log(err, err.stack);  // error
//   else     console.log();                 // deleted
// });



}