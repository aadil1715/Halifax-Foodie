import React from "react";
import "./Home.css";
import Button from "react-bootstrap/Button";

export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Halifax Foodie</h1>
        <p className="text-muted">A simple food delivery app!</p>
        <div id="outer">
        <Button class="inner">Upload Recipie!</Button>
        <Button class="inner">Show food ratings!</Button>
        <Button class="inner">Chat</Button>
        </div>
      </div>
    </div>
  );
}