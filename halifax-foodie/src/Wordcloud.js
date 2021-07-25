var request = require('request');
var axios = require('axios');


export default function Wordcloud(){
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }
      
      //Then add to your onClick

      return <button onClick={() => openInNewTab('https://0dl3eedc99.execute-api.us-east-1.amazonaws.com/default/generateWordCloud')}>Show WOrdCloud</button>
    //   onClick={() => openInNewTab('https://0dl3eedc99.execute-api.us-east-1.amazonaws.com/default/generateWordCloud')}
      
      
    }
// var options = {
//  'method': 'GET',
//  'url': 'https://0dl3eedc99.execute-api.us-east-1.amazonaws.com/default/generateWordCloud',
//  'headers': {
//     "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
//     "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
//  }
// };

// var config = {
//     method: 'get',
//     url: 'https://0dl3eedc99.execute-api.us-east-1.amazonaws.com/default/generateWordCloud',
//     headers: { }
//   };
  
//   axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });
// }

// request(options, function (error, response) {
//  if (error) throw new Error(error);
//     console.log(response.body);
//     <div>response.body</div>
// });
// }





