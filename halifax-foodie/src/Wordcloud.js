import React from 'react';
var request = require('request');


export default function Wordcloud(){
var options = {
 'method': 'GET',
 'url': 'https://0dl3eedc99.execute-api.us-east-1.amazonaws.com/default/generateWordCloud',
 'headers': {
 }
};

request(options, function (error, response) {
 if (error) throw new Error(error);
    <div>response.body</div>
});


}
