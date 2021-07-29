export default function feedback(props){
    const AWS = require('aws-sdk')
const fs = require('fs')
const { type } = require('os')
const ACCESS_KEY_ID = "ASIAUOKAFNQPTCNBFXC4"
const SECRET_ACCESS_KEY = "JHALmbyvVe1K4BWS88bgxLEorqZyHg9Rm2wvNI3h"
const BUCKET_NAME = "serverlessprojectfeedback"
const SESSION_TOKEN = "FwoGZXIvYXdzEJv//////////wEaDMTQktEyK/+M+4aSByK/AaBam1d7yXujJKpcxmmMQi62wjHwWNgciQsg9DLEv/JKHXGqVRDEyH9jl70nScxVpdSmNHOYqi/LDDTev4L4PmuKEh3CxRvyZV0eLS2/oSGVH9aZh6ogvfZpaZl9kz+2W4PW4cEsKV2Hocm+VXhangDkq6HsHurjAG/4gQHdoxGtj5o33Jr2Ljbpf2ID3DLH2rODXRYYkLbzorLwkRREimGRonYBQBXMmElQLOUKhFNRsL9ZBmzpMnz/yIZAs7LGKOLGi4gGMi0Fumv7zEpe+jJ45QfL3POCz1u2/RGKYuBGSN7jI0yghBWogXSnaz4YWgllvKE="

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