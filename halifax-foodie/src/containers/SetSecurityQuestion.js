import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import db from "../firebase_config"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';


function RiverInformation({email}) {
  const [riverInformation, setRiverInformation] = useState({});
  const [gotData, setGotData] = useState(false);
  const [questionq1, setquestionq1] = useState("");
  const [questionq2, setquestionq2] = useState("");
  const [question1, setquestion1] = useState("");
  const [question2, setquestion2] = useState("");
  const history = useHistory();
  function validateForm() {
    return question1.length > 0 && question2.length > 0;
  }

 
  async function handleSubmit(event) {
    event.preventDefault();
    const docRef = db.collection('SecurityQuestions').doc(email);
    docRef.set({
      Question1: questionq1,
      Question2: questionq2,  
      Answer1: question1,
      Answer2: question2
    })

    alert("You have successfully set the security questions. Please login")
    history.push("/login");
  }

//Print the format of security Question here.
  return(
    <div>
      <h2>Security Questions</h2>
      
        <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="Question 1Q">
          <Form.Label>Question 1</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={questionq1}
            onChange={(e) => setquestionq1(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="Question 1">
          <Form.Label>Answer 1</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={question1}
            onChange={(e) => setquestion1(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="Questionq 2">
          <Form.Label>Question 2</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={questionq2}
            onChange={(e) => setquestionq2(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="Question 2">
          <Form.Label>Answer 2</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={question2}
            onChange={(e) => setquestion2(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Submit
        </Button>
        </Form>
    </div>
  )
}
RiverInformation.propTypes = {
  name: PropTypes.string.isRequired
 }

class SetSecurityQuestion extends React.Component {

  constructor(props)
  {
      super(props);
  }    

  
  render(){
    return (
      <div>
        <RiverInformation email={reactLocalStorage.get("email")}/>
      </div>
    );
}
}

export default SetSecurityQuestion