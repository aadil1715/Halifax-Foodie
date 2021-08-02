import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import feedback2 from "../feedback";
import "./Login.css";
const { default: Axios } = require("axios");

export default function GiveFeedback() {
    const [feedback, setFeedback] = useState("");
    
  
    function validateForm() {
      return feedback.length > 0;
    }
  
    async function handleSubmit(event) {
      event.preventDefault();
      feedback2({feedback});
      alert("Your feedback has been submitted.")
      
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
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Give feedback
          </Button>
        </Form>
      </div>
    );
  }