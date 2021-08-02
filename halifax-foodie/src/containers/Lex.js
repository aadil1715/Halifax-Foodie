import LexChat from "react-lex";
import React,{useState,useEffect,Component} from "react";

 
class Lex extends Component {
  render(){
    return(
    <LexChat
      botName="OrderStatus"
      IdentityPoolId="us-east-1:4901da3d-7c40-46c4-8e1d-c872648c64e1"
      placeholder="Say Hi to Halifax Foodie!"
      backgroundColor="#FFFFFF"
      height="430px"
      region="Regions.US_EAST_1"
      headerText="Have queries? Ask our chatbot"
      headerStyle={{ backgroundColor: "#ABD5D9", fontSize: "30px" }}
      greeting={
        "Hello, how can I help? You can say things like 'help' to get more info"
      }
    />
    );
}
}
export default Lex;
