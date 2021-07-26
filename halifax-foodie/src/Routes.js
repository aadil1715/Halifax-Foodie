import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Test from "./Test"
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Register from "./containers/Register";
import ConfirmSignup from "./containers/ConfirmSignup";
import ShowFoodRatings from "./containers/ShowFoodRatings";
import GiveFeedback from "./containers/GiveFeedback";
import SetSecurityQuestion from "./containers/SetSecurityQuestion";
import GetSecurityQuestion from "./containers/GetSecurityQuestion";
import UploadRecipie from "./containers/UploadRecipie";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/confirmsignup">
        <ConfirmSignup />
      </Route>
      <Route exact path="/test">
        <Test />
      </Route>
      <Route exact path="/SetSecurityQuestion">
        <SetSecurityQuestion />
      </Route>
      <Route exact path="/GetSecurityQuestion">
        <GetSecurityQuestion />
      </Route>
      <Route exact path="/showFoodRatings">
        <ShowFoodRatings />
      </Route>
      <Route exact path="/giveFeedback">
        <GiveFeedback />
      </Route>
      <Route exact path="/uploadrecipie">
        <UploadRecipie />
      </Route>
      <Route>
        <NotFound />
      </Route>
      
    </Switch>
  );
}