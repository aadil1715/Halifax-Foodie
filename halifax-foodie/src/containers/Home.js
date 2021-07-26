import React,{useState,useEffect} from "react";
import "./Home.css";
import {reactLocalStorage} from 'reactjs-localstorage';
import Button from "react-bootstrap/Button";
import { useAppContext } from "../utils/contextUtil";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import Lex from "./Lex";

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
  
  return (
    <div className="Home">
      <div className="lander">
        <h1>Halifax Foodie</h1>
        <p className="text-muted">A simple food delivery app!</p>
        {
          isAuthenticated ? (<div id="outer">
          <Button class="inner">Upload Recipie!</Button>
          <Button class="inner">Show food ratings!</Button>
          <Button onClick class="inner">Chat with restaurant</Button>
          </div>) :(<div> </div>)
        }
        <Lex></Lex>
      </div>
    </div>
  );
}