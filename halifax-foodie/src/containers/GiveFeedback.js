import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {reactLocalStorage} from 'reactjs-localstorage';
import ReactDOM from 'react-dom'; 
import { render } from "@testing-library/react";
import "./Login.css";
import { Auth } from "aws-amplify";
import { useAppContext } from "../utils/contextUtil";
import { useHistory } from "react-router-dom";
const { default: Axios } = require("axios");
import feedback from "../feedback";

export default function GiveFeedback() {
    const [feedback, setFeedback] = useState("");
    
  
    function validateForm() {
      return feedback.length > 0;
    }
  
    async function handleSubmit(event) {
      event.preventDefault();
    }

    return (
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="feedback">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </Form.Group>
          <Button onClick={feedback(this.state.feedback)} block size="lg" type="submit" disabled={!validateForm()}>
            Give feedback
          </Button>
        </Form>
      </div>
    );
  }