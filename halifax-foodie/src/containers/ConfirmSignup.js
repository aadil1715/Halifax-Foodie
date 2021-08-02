import React, { useState } from "react";
import {reactLocalStorage} from 'reactjs-localstorage';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import { useAppContext } from "../utils/contextUtil";
import { useHistory } from "react-router-dom";
const { default: Axios } = require("axios");

export default function ConfirmSignup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const history = useHistory();
    const REGISTER_URL = "https://eqenc9nw94.execute-api.us-east-1.amazonaws.com/safe/user/confirm-signup"
    function validateForm() {
        return email.length > 0 && password.length > 0 && code.length>0; 
      }

      async function handleSubmit(event) {
        event.preventDefault();
      
        try {
          //await Auth.signIn(email, password);
          let resp = await Axios.post(REGISTER_URL, {
            username: email,  
            password: password,
            code: code
        })
        console.log(resp)
        if(resp.data.error === true){
            alert("Your code has expired. As you have already confirmed the code. Please login")
        } else{
            alert("Your account has been verified!. Thank you. Please log in with your credentials")
            history.push("/SetSecurityQuestion")
        }
        } catch (e) {
          alert(e.message);
        }
      }
      return (
        <div className="ConfirmSignup">
          <h4>You would have recieved a verification code on your email. Please enter the code.</h4>
          <Form onSubmit={handleSubmit}>
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
            <Form.Group size="lg" controlId="code">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Confirm Signup.
            </Button>
          </Form>
        </div>
      );

}
