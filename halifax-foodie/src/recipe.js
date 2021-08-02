import { reactLocalStorage } from 'reactjs-localstorage';
var axios = require('axios');
var AWS = require("aws-sdk");

export default function Recipe(props){

    const ACCESS_KEY_ID = "ASIAX2MMPUAMFEOHFAX7";
    const SECRET_KEY_ACCESS = "4BYYYybw19GCiKBepDvcAGFJkSxcU0EVGnCyWzIH";
    const SESSION_TOKEN = "FwoGZXIvYXdzEJv//////////wEaDC+djkBekxeUUmNRJyK/AV0tXoLTTevQxmsHp2QyCpGo8bnZVWGrqIjTj4KUAwy94vs1/xSa9dO+iUdGnvkPmFFXsg2whiZclO2K/th9aawAEPHBG5imDU5A6h+0Q3wBfyQ1BywKvMTvvKZvGKuR2FBCA5poVN5vRNLLk/wgaLfgKMvsOSWMymScHSzqrP03/l7ZKdek/cAIqNkZ5CqbSQjF1ZrNXGmJUQ0mT5RRkNbU9KKskxCVypesRX6u2UTHrGhLGSBi/gMalmEgRlQ2KO7Hi4gGMi3DpraBLHAPE/6y0l6QaoAB5mNEK+F77g+GIXWGHXAqHKZMT2ef2cWrp5JIC+o=";
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
    var restaurant = reactLocalStorage.get('email');
    console.log(restaurant)
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
            'Authorization': 'Bearer ya29.a0ARrdaM8nEmKaw1qqhP9s_4fH1cBGQlqOmg-jpPKzhK1jKDuVswuf2p29n1GRiFYun801wpSHuNW4jjyyQpJSCYEVGcxMshaJa-bsHPlLyrQPCIvcMTeAJ0dvu7bu0hTZeCaPC1ArI-nMLMn4YZ7jzw230bTCvttAa-vgPw',
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
            if(reactLocalStorage.get('Tag')==null)
            {
            reactLocalStorage.set('Tag', finalKey)
            }
            alert("Recipe added successfully. The tag for this recipe is " + finalKey)
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
















