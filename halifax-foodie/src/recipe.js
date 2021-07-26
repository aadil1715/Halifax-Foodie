import { useHistory} from 'react-router-dom';
import React,{useState,useEffect} from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
var axios = require('axios');
var AWS = require("aws-sdk");

export default function Recipe(props){

    const ACCESS_KEY_ID = "ASIAX2MMPUAMN7WQRVWO";
    const SECRET_KEY_ACCESS = "k9UURGOtTOGeTaC/7x1J8S98oilQMbe/zU1B8QX3";
    const SESSION_TOKEN = "FwoGZXIvYXdzEFQaDLsAAYwUI0YZ/wInrSK/AYIFMdBS/Uy8wvO3zVCh8XbQ+NlkdHmDzoflvEUZsexWj0d+dQSIxeIIDQHGrzc9fyH3TIE/wp58epbVV3S7kSX0nwSdEbNWwlNFF8JLNugjPpDOF0s+EyUh8GdujSAu3g1pENbU4Td5t3oghwo/hgU8J10ncD1U8diZMQEy87qiVdlIAZtBexJRjmsEgn2Cu/kO4m3gPq2SlKXHg9sSu8HhlN8fvV3KJ15VViRYK0uTYUfTnmNCc8iyaf/EbXm2KOuK/IcGMi1qaBFMu7HdqIlcJAUG2gGQHnPqmi/z8dBPDjt58W9KG+5Q0iS7714GLgavdRY=";
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
            'Authorization': 'Bearer ya29.a0ARrdaM9aVHUt1hBQ0WdqpYsOd9ZRhFLee86QPQpKSEn1NM2HBcU3FUYw9XjNcwr54JXpesWg90_Y6abD85c31jpQxgsHgGTalKGYKlibz1pgzXBArOPPraDr8QDyLyYryZw-AVmhhJLN_x6aEwtCrERF8d5yAAh-susSnQ',
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

            for(var i =0;i<keys.length-1;i++){

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
















