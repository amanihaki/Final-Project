import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";
import Profile from "./Components/Profile";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/CategoriesScreen";
import SignupScreen from "./Screens/SignupScreen";
import Post from "./Components/Post";
import PostsSelect from "./Components/PostsSelect";
import Practice from "./Components/Practice";
import PostsScreen from "./Screens/PostsScreen";
import Setting from "./Components/Setting";
import EditPostScreen from "./Screens/EdiPostScreen";
import Comments from "./Components/Comments";
import Chats from "./Components/Chat";


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
            key="SignupScreen"
            component={SignupScreen}
            animation="fade"
            hideNavBar={false}
            title="Sign Up"
            titleStyle={{ color: "blue",fontSize:25,fontWeight:"400" }}
            navTransparent={true}
            navigationBarStyle={{backgroundColor:"white"}}

          
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
            key="PostsScreen"
            component={PostsScreen}
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
          <Scene
            key="EditPostScreen"
            component={EditPostScreen}
            animation="fade"
            hideNavBar={true}
          />
           <Scene
            key="Comments"
            component={Comments}
            animation="fade"
            hideNavBar={false}
            title="Details"
        
          />
           <Scene
            key="Chats"
            component={Chats}
            animation="fade"
            hideNavBar={true}
          />
        </Scene>
      </Router>
    );
  }
}
