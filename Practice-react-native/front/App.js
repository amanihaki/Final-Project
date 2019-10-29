import React, { Component } from "react";
import { Router, Scene, Actions, ActionConst } from "react-native-router-flux";
import Head from "./Components/Header";
import Profile from "./Components/Profile";
import LoginScreen from "./Components/LoginScreen";
import SecondScreen from "./Components/Categories";
import CreateAccount from "./Components/CreateAccount.js";
import Post from "./Components/Post";
import Post_fashion from "./Components/Post_fashion";

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
            key="secondScreen"
            component={SecondScreen}
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
            key="post_fashion"
            component={Post_fashion}
            animation="fade"
            hideNavBar={false}
            title="Post_Fashion"
          />
          <Scene
            key="Head"
            component={Head}
            animation="fade"
            hideNavBar={true}
           
          />
        </Scene>
      </Router>
    );
  }
}
