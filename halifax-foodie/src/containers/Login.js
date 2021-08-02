import React, { useState } from "react";
import {reactLocalStorage} from 'reactjs-localstorage';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { Auth } from "aws-amplify";
import { useAppContext } from "../utils/contextUtil";
import { useHistory } from "react-router-dom";
const { default: Axios } = require("axios");



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userHasAuthenticated} = useAppContext();
  const history = useHistory();
  const LOGIN_URL = "https://eqenc9nw94.execute-api.us-east-1.amazonaws.com/safe/user/login"

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      //await Auth.signIn(email, password);
      let resp = await Axios.post(LOGIN_URL, {
        username: email,
        password: password
    })
    console.log(resp)
    if(resp.data.error === false && resp.data.message === "success"){
      userHasAuthenticated(true);
      reactLocalStorage.set('token',resp.data.data.id_token)
      reactLocalStorage.set('email',email)
      history.push("/GetSecurityQuestion");
    } else{
      alert("Please enter correct credentials");
      
      history.push("/login")
    }
    } catch (e) {
      alert(e.message);
    }
  }
  return (
    <div className="Login">
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
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}