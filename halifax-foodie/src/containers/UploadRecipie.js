import React,{useState,useEffect} from "react";
import './Home.css'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { reactLocalStorage } from "reactjs-localstorage";
import Recipe from "../recipe.js"
import { useHistory, useLocation } from 'react-router-dom';
import {render} from 'react-dom';
export default function UploadRecipie(){
    const email = reactLocalStorage.get("email")
   // const history = useHistory();
   // const location = useLocation();
    const [input, setInput] = useState("");
    function validateForm() {
        return input.length > 0; 
      }

    async function handleSubmit(event) {
        event.preventDefault(); 
        Recipe({input},{email})
        console.log(email)
        
        // const abc = reactLocalStorage.get("Tag")
        //setTimeout(alert("Recipe added successfully. The tag for this recipe is " + abc),7000);
       
       
    // alert("Recipe added successfully. The tag for this recipe is " + abc);
    // reactLocalStorage.remove('Tag')
        //const resp = location.myCustomProps.data;
        //console.log(resp)
    }
    

 return (
            <div id="id" >
        <Form onSubmit={handleSubmit}>

        <Form.Group size="lg" controlId="email">
          <Form.Label>Recipe</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
              Upload Recipe
            </Button>
          </Form>
            </div>
        )
}
