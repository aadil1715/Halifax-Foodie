var axios = require('axios');
var data = JSON.stringify({"instances":{"mimeType":"text/plain","content":"dfkjghdfk;lgh;sdfguyhdrsoiu;ghjdsfojghasuikldghuifshgkjg"}});

var config = {
  method: 'post',
  url: 'https://us-central1-aiplatform.googleapis.com/ui/projects/682716498252/locations/us-central1/endpoints/5123319565157138432:predict',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer ya29.a0ARrdaM9GuFW90rcsNH9EKr5QOB-W40IxRtdbWAnufy2lELwUGFwGAR--ImbwQKu3MzBWO54WShkg-N7Ixvk1j8PvXQ7afoNB5gUbE3Sq3QOKd55WwbwJObzk1ml2Zpfr5x-Eq4JXgo_l_z5rv7U8V0KHjKhSgWyCOhg2'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
