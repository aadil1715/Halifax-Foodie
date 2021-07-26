import { useHistory} from 'react-router-dom';
import React,{useState,useEffect} from "react";
var axios = require('axios');
var AWS = require("aws-sdk");

export default function Recipe(props){
    const ACCESS_KEY_ID = "ASIAX2MMPUAMJYBOYRWZ";
    const SECRET_KEY_ACCESS = "Ze6h1YN3SUcntJNpfxsZfc0x0OcVfRqU4E2BuhTw";
    const SESSION_TOKEN = "FwoGZXIvYXdzEFEaDLQ/lYceVOEY9mo3niK/AblRgkFU6/ex0HzWQ8VLiDoUHJw9VrziPY6binZbKyS09BsSJc/gVXLTGDYCyJ4xukdtuXP3bcwv0Sm8ov9TYqex2z8ikYkgojnQdc6ofoadpeAlaoqo9x5tdIaBmZ5+7AzzSG8Z3Rgy429A+BW475RGX+XYKqoOcXB1/jZDm30wTSEa773is8QYQdGCr+UXnPskl9VSdwmRfGMpnbmlPjEuE8sTOBpV1Su1vYgwpU7UcknwZAWUPEyZNif3NvXvKNif+4cGMi1odYF9RizwR38W+sa12/gJQRonCca0wyGYrkDm9EMpnjxj7dx+iEzQuucZpZQ=";
    const history = useHistory();
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
    var finalVal = "";
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
            'Authorization': 'Bearer ya29.a0ARrdaM-VlfbFfe6B4N1g9QV9vV1Q7nhBqFoT61uRsX6xImcTgpOcLbpm_PBAq4dswZcwqH8HUbNt87_Rsc1xSwzhZ6sUp2tiH4J_RaHn_2HiZdoY9i9Y3NFrINwhsaPVTzRXqassDhi52DaACSkrUX7Kkmwr8hTNzlHGng',
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
                if(currentValue < (values[i+1]*100)){
                    finalKey = keys[i+1];
                    finalVal = values[i+1]
                }else {
                    finalKey =currentKey;
                    finalVal = currentValue;
                }
                console.log(finalKey, finalVal);
            }

            console.log("Value for Final Value");
            console.log(finalKey, finalVal);

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
                    console.log("Recipe Added!" + "and Tag is " + finalKey + recipeContent);
                    isInserted = true;
                }
            });
        })
        .catch(function (error) {
            console.log(error.response);
        });

    return(
     isInserted ? 
     history.push({
        pathname: '/uploadrecipe',
        myCustomProps: {data: finalKey}
         }) : <div></div>
    )
}
















