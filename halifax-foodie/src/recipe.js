import { reactLocalStorage } from 'reactjs-localstorage';
var axios = require('axios');
var AWS = require("aws-sdk");

export default function Recipe(props){

    const ACCESS_KEY_ID = "ASIAX2MMPUAMJYBOYRWZ";
    const SECRET_KEY_ACCESS = "Ze6h1YN3SUcntJNpfxsZfc0x0OcVfRqU4E2BuhTw";
    const SESSION_TOKEN = "FwoGZXIvYXdzEFEaDLQ/lYceVOEY9mo3niK/AblRgkFU6/ex0HzWQ8VLiDoUHJw9VrziPY6binZbKyS09BsSJc/gVXLTGDYCyJ4xukdtuXP3bcwv0Sm8ov9TYqex2z8ikYkgojnQdc6ofoadpeAlaoqo9x5tdIaBmZ5+7AzzSG8Z3Rgy429A+BW475RGX+XYKqoOcXB1/jZDm30wTSEa773is8QYQdGCr+UXnPskl9VSdwmRfGMpnbmlPjEuE8sTOBpV1Su1vYgwpU7UcknwZAWUPEyZNif3NvXvKNif+4cGMi1odYF9RizwR38W+sa12/gJQRonCca0wyGYrkDm9EMpnjxj7dx+iEzQuucZpZQ=";
    const TABLE = "RecipeRecords";
    
    var isInserted = false;
    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    });

    var docClient = new AWS.DynamoDB.DocumentClient({
        accessKeyId:ACCESS_KEY_ID,
        secretAccessKey:SECRET_KEY_ACCESS,
        sessionToken: SESSION_TOKEN
    });

    var recipeid = Math.floor(Math.random()*100);
    var tag = "TAG HERE";
    var restaurant = props.email;
    console.log(props.input)
    var recipeContent = props.input;
    var finalKey = "";
    var finalVal = 0;
    var MLDataJSON = null;
    var recipe = ""


    var data2 = {
        instances:
            {
                mimeType: 'text/plain',
                content: recipeContent
            }
    };

    data2 = JSON.stringify(data2);

    var config = {
        method: 'POST',
        url: 'https://us-central1-aiplatform.googleapis.com/ui/projects/682716498252/locations/us-central1/endpoints/5123319565157138432:predict',
        headers: {
            'Authorization': 'Bearer ya29.a0ARrdaM-KeXalfEbYxaBfVmppnri6UHk9D983_QXVzu1XaOxdMoKWaNi5iPQjWO_1KrOt3u-9bBscFB6gQbONDuxzeufjjosMaXlWnye-QZgMY2xxPwi5IXhlzTL626LOWD6pwOkrTFgbjOQwSHv5xclad5tBtcOtpGA_Bw',
            'Content-Type': 'application/json'
        },
        data : data2
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));

            MLDataJSON = response.data;
            var pro = JSON.parse(JSON.stringify(MLDataJSON));

            console.log(pro.predictions[0].confidences);
            console.log(pro.predictions[0].displayNames);

            var keys = pro.predictions[0].displayNames;
            var values = pro.predictions[0].confidences;

            for(var i =0;i<keys.length;i++){

                var currentKey = keys[i];
                var currentValue = (values[i])*100;
                if(finalVal < currentValue){
                    finalKey = currentKey;
                    finalVal = currentValue;
                }
                console.log(finalKey, finalVal);
            }

            console.log("Value for Final Value");
            console.log(finalKey, finalVal);
                reactLocalStorage.set('Tag', finalKey)

            tag = finalKey;
            recipe = recipeContent;

            var params = {
                TableName:TABLE,
                Item:{
                    "RecipeDocument": [
                        {
                            "Recipe": recipe
                        },
                        {
                            "Tag": tag
                        },
                        {
                            "Restaurant": restaurant
                        }
                    ],
                    "RecipeID": recipeid
                }
            };

            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Recipe Added!" + "and Tag is " + finalKey);
                    isInserted = true;
                }
            });
        })
        .catch(function (error) {
            console.log(error.response);
        });
}
















