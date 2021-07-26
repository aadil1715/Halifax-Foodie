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
  const [question1, setquestion1] = useState("");
  const [question2, setquestion2] = useState("");
  const history = useHistory();
  function validateForm() {
    return question1.length > 0 && question2.length > 0;
  }

  useEffect(() => {
    if(!gotData){
      const docRef = db.collection('SecurityQuestions').doc(email);
      docRef.get().then((doc) => {
          if (doc.exists) {
              let data2 = doc.data();
              setRiverInformation({Q1: data2.Question1, Q2: data2.Question2, A1: data2.Answer1, A2: data2.Answer2})
              setGotData(true);
              console.log("Document data:", data2);
          } else {
              setGotData(false);
              console.log("No such document!");
          }
      }).catch(function (error) {
          setGotData(false);
          console.log("Error getting document:", error);
      });
    }
  }, [email])
  async function handleSubmit(event) {
    event.preventDefault();
    const docRef = db.collection('SecurityQuestions').doc(email);
    // docRef.update({
    //   Answer1: question1,
    //   Answer2: question2
    // })
    console.log(question1)
    console.log(riverInformation.A1)
    console.log(question2==riverInformation.A2)
    if(question1==riverInformation.A1 && question2==riverInformation.A2){
        alert("You are verified. Thank you!")
        history.push("/")
    }
    else{
        alert("You have entered incorrect answers. Please enter again.")
    }
  }

//Print the format of security Question here.
  return(
    <div>
      <h2>Security Questions</h2>
      
      {gotData ? 
        <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="Question 1">
          <Form.Label>{riverInformation.Q1}</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={question1}
            onChange={(e) => setquestion1(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="Question 2">
          <Form.Label>{riverInformation.Q2}</Form.Label>
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
         
         : "Loading data"}
    </div>
  )
}
RiverInformation.propTypes = {
  name: PropTypes.string.isRequired
 }

class GetSecurityQuestion extends React.Component {

  constructor(props)
  {
      super(props);
  }    

//   onLoad = async(e) => {
//     const docRef = db.collection('SecurityQuestions').doc('ruhanzack@gmail.com');

//     docRef.get().then((doc) => {
//         if (doc.exists) {
//             let data2 = doc.data();
//             this.setState((state, props) => ({
//               this.state.data: data2
//             }));
//             console.log("Document data:", data);
//         } else {
//             // doc.data() will be undefined in this case
//             this.setState({ data: null });
//             console.log("No such document!");
//         }
//     }).catch(function (error) {
//         this.setState({ data: null });
//         console.log("Error getting document:", error);
//     });
//     console.log(this.state.data)


// }
  
  render(){
      if(reactLocalStorage.get("email")){
    return (
      <div>
        <RiverInformation email= {reactLocalStorage.get("email")}/>
      </div>
    );
      } else{
          return(
          <div>Please log in.</div>);
      }
}
}

export default GetSecurityQuestion