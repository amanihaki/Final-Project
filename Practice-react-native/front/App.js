import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";
import Profile from "./Components/Profile";
import LoginScreen from "./Components/LoginScreen";
import Home from "./Components/Categories";
import CreateAccount from "./Components/CreateAccount.js";
import Post from "./Components/Post";
import PostsSelect from "./Components/PostsSelect";
import Practice from "./Components/Practice";
import House from "./Components/ Garden";
import Vehicles from "./Components/Vehicles";
import Electronics from "./Components/Electronics";
import Fashion from "./Components/Fashion";
import Job from "./Components/Job";
import Pets from "./Components/Pets";
import Kids from "./Components/Kids";
import Mobile from "./Components/Mobile";
import Others from "./Components/Others";
import Sport from "./Components/Sport";
import Services from "./Components/Services";
import Setting from "./Components/Setting";

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="loginScreen"
            component={LoginScreen}
            animation="fade"
            hideNavBar={true}
            initial={true}
          />
          <Scene
            key="Home"
            component={Home}
            animation="fade"
            title="Categories"
            hideNavBar={false}
            titleStyle={{ color: "blue" }}
          />
          <Scene
            key="createAccount"
            component={CreateAccount}
            animation="fade"
            hideNavBar={false}
            title="Create Account"
            titleStyle={{ color: "blue" }}
          />
          <Scene
            key="profile"
            component={Profile}
            animation="fade"
            hideNavBar={true}
          />
          <Scene
            key="post"
            component={Post}
            animation="fade"
            hideNavBar={false}
            title="Post"
          />
          <Scene
            key="PostsSelect"
            component={PostsSelect}
            animation="fade"
            hideNavBar={false}
            title="Post_Fashion"
          />

          <Scene
            key="Practice"
            component={Practice}
            animation="fade"
            hideNavBar={true}
          />
           <Scene
            key="House"
            component={House}
            animation="fade"
            hideNavBar={true}
          />
          <Scene
            key="Vehicles"
            component={Vehicles}
            animation="fade"
            hideNavBar={true}
          />
          <Scene
            key="Electronics"
            component={Electronics}
            animation="fade"
            hideNavBar={true}
          />
          <Scene
            key="Fashion"
            component={Fashion}
            animation="fade"
            hideNavBar={true}
          />
         <Scene key="Job" component={Job} animation="fade" hideNavBar={true} />
          <Scene
            key="Kids"
            component={Kids}
            animation="fade"
            hideNavBar={true}
          />
          <Scene
            key="Mobile"
            component={Mobile}
            animation="fade"
            hideNavBar={true}
          />
          <Scene
            key="Pets"
            component={Pets}
            animation="fade"
            hideNavBar={true}
          />
          <Scene
            key="Others"
            component={Others}
            animation="fade"
            hideNavBar={true}
          />
          <Scene
            key="Sport"
            component={Sport}
            animation="fade"
            hideNavBar={true}
          />
          <Scene
            key="Services"
            component={Services}
            animation="fade"
            hideNavBar={true}
          />
          <Scene
            key="Setting"
            component={Setting}
            animation="fade"
            hideNavBar={true}
          />
          <Scene
            key="Profile"
            component={Profile}
            animation="fade"
            hideNavBar={true}
          />
           
        </Scene>
      </Router>
    );
  }
}
