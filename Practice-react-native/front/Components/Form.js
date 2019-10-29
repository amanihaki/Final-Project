import React, { Component } from "react";
import PropTypes from "prop-types";
import Dimensions from "Dimensions";
import { Actions } from "react-native-router-flux";
import  GLOBAL from "./Global"
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  AsyncStorage,
  TextInput,
  Alert
} from "react-native";

import UserInput from "./UserInput";
import ButtonSubmit from "./ButtonSubmit";
import SignupSection from "./SignupSection";

import usernameImg from "../assets/username.png";
import passwordImg from "../assets/password.png";
import eyeImg from "../assets/eye_black.png";
import spinner from "../assets/loading.gif";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showPass: true,
      press: false,
      username: "",
      password: "",
      users_id:""
    };
   
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
 
  
  }

  _onGrow=()=> {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  showPass=()=> {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }
 
  //   componentDidMount=()=>{
  //     this._loadInitinlState().done();
  //   }

  // _loadInitinlState = async () =>{
  //   let value = await AsyncStorage.getItem('user');
  //   if(value !== null){
  //     Actions.profile
  //   }
  // }

  /**
   *
   * Login
   */

  Login = async () => {
    const response = await fetch("http://192.168.6.107:8080/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        
      })
    });
    const data = await response.json();
    console.log("data", data);
    console.log("data.suc", data.success);
    // const global= data.user.users_id
    // GLOBAL.users_id=global
    // console.log("global",GLOBAL.users_id)
    if (data.success) {
      AsyncStorage.setItem("user", JSON.stringify(data.user));
      let users_id = data.user[0].users_id
      console.log(users_id)
      // global.set_users_id(users_id)
      
      // Alert(global.users_id) // return 1
      GLOBAL.users_id=users_id
      console.log(">>>>",GLOBAL.users_id)
    
    }
    return data.success;
  };

 

  _onPress = async () => {
    console.log("hsh");
    const login_response = await this.Login();

    if (login_response) {
    
      if (this.state.isLoading) return;

      this.setState({isLoading: true});
      Animated.timing(this.buttonAnimated, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
      }).start();
  
      setTimeout(() => {
        this._onGrow();
      }, 2000);
  
      setTimeout(() => {
        Actions.secondScreen();
        this.setState({isLoading: false});
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
      }, 2300);
    } else {
      alert("Please check your credential");
    }
  };

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image source={usernameImg} style={styles.inlineImg} />
        <TextInput
          placeholder="Username"
          autoCapitalize={"none"}
          returnKeyType={"done"}
          style={styles.input}
          autoCorrect={false}
          onChangeText={username =>
            this.setState({
              username
            })
          }
        />
        <Image source={passwordImg} style={styles.inlineImg2} />
        <TextInput
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={"done"}
          autoCapitalize={"none"}
          style={styles.input}
          autoCorrect={false}
          onChangeText={password =>
            this.setState({
              password
            })
          }
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}
        >
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>

<View style={styles.contain}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>LOGIN</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
      </View>
        {/* <Text onPress={this._onPress}>LOGIN</Text> */}
      </KeyboardAvoidingView>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
const MARGIN = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  btnEye: {
    position: "absolute",
    top: 55,
    right: 28
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: "rgba(0,0,0,0.2)"
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginBottom: 10,
    paddingLeft: 45,
    borderRadius: 20,
    color: "#ffffff"
  },
  inlineImg: {
    position: "absolute",
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9
  },
  inlineImg2: {
    position: "absolute",
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 60
  },
  contain: {
    flex: 1,
    top: -5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});
