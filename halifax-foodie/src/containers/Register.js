import React, { useState } from "react";
import {reactLocalStorage} from 'reactjs-localstorage';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import { useAppContext } from "../utils/contextUtil";
import { useHistory } from "react-router-dom";
const { default: Axios } = require("axios");

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const history = useHistory();
    const REGISTER_URL = "https://eqenc9nw94.execute-api.us-east-1.amazonaws.com/safe/user/signup"
    function validateForm() {
        return email.length > 0 && password.length > 0 && name.length>0; 
      }

      async function handleSubmit(event) {
        event.preventDefault();
      
        try {
          //await Auth.signIn(email, password);
          let resp = await Axios.post(REGISTER_URL, {
            username: email,  
            password: password,
            email: email,
            name: name
        })
        console.log(resp)
        if(resp.data.error === false && resp.data.message === "Please confirm your signup,                         check Email for validation code"){
        //   userHasAuthenticated(true);
        //   reactLocalStorage.set('token',resp.data.data.id_token)
        //   history.push("/");
        reactLocalStorage.set("email",email)
        history.push("/confirmsignup")


        } else{
          alert(resp.data.message);
          
        }
        } catch (e) {
          alert(e.message);
        }
      }
      return (
        <div className="Register">
          <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>  
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Signup
            </Button>
          </Form>
        </div>
      );
}