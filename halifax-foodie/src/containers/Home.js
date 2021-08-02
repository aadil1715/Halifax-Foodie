import React,{useState,useEffect} from "react";
import "./Home.css";
import {reactLocalStorage} from 'reactjs-localstorage';
import Button from "react-bootstrap/Button";
import { useAppContext } from "../utils/contextUtil";
import { Auth } from "aws-amplify";
import { useHistory,Link } from "react-router-dom";
import Lex from "./Lex";

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

export default function Home() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      //await Auth.currentSession();
      console.log(reactLocalStorage.get('token'))
      if(reactLocalStorage.get('token')!==null)
      {
      userHasAuthenticated(true);
      }
      else{
        userHasAuthenticated(false);
        history.push("/login")
      }
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  const goRating = () => history.push('/showFoodRatings');
  const goRecipe = () => history.push('/uploadrecipie');
  const goFeedback = () => history.push('/giveFeedback');


  
  return (
    <div className="Home">
      <div className="lander">
        <h1>Halifax Foodie</h1>
        <p className="text-muted">A simple food delivery app!</p>
        {
          isAuthenticated ? (
          <div id="outer">
          <Button  onClick={goRecipe} class="inner">Upload Recipie!</Button>
          <Button onClick={goRating} class="inner">Show food ratings</Button>
          <Button onClick={goFeedback} class="inner">Give Feedback</Button>
          <Button onClick={()=>openInNewTab('https://datastudio.google.com/embed/u/0/reporting/0e1f261c-8af8-4016-a86d-e6a6187f7261/page/NQgWC')} class="inner">View Report</Button>
          <Button onClick={()=>openInNewTab('http://127.0.0.1:5000/')} class="inner">Place an order!</Button>
          </div>) :(<div> </div>)
        }
        <Lex></Lex>
      </div>
    </div>
  );
}