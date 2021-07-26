import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./utils/contextUtil";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";


function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      if(reactLocalStorage.get('token'))
      {
      userHasAuthenticated(true);
      }
      else{
        userHasAuthenticated(false);
        
      }
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }
  console.log(isAuthenticated + "isAuth");
  console.log(isAuthenticating + "isAuthenticatING");
  
  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              Halifax Foodie
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                  <LinkContainer to="/register">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  ); 

  async function handleLogout() {
    //await Auth.signOut();
    reactLocalStorage.remove('token');
    reactLocalStorage.remove('email');
    userHasAuthenticated(false);
    history.push("/login");
  }
}



export default App;