import React from "react";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Dimensions from "Dimensions";
import { Actions } from "react-native-router-flux";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";

export default class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    avatar: null,
    conformpassword: "",
    field: "",
    emailvalidate: "",
    passwordvalid: "",
    style: {
      borderBottomColor: "rgba(0,0,0,0.5)",
      borderBottomWidth: 0.7
    },
    style2: {
      borderBottomColor: "rgba(0,0,0,0.5)",
      borderBottomWidth: 0.7
    },
    style3: {
      borderBottomColor: "rgba(0,0,0,0.5)",
      borderBottomWidth: 0.7
    },
    style4: {
      borderBottomColor: "rgba(0,0,0,0.5)",
      borderBottomWidth: 0.7
    }
  };

  hasFocus1 = () => {
    this.setState({
      style: {
        borderBottomColor: "blue",
        borderBottomWidth: 1
      }
    });
  };
  hasBlur1 = () => {
    [
      this.setState({
        style: {
          borderBottomColor: "rgba(0,0,0,0.5)",
          borderBottomWidth: 0.7
        }
      })
    ];
  };
  hasFocus2 = () => {
    this.setState({
      style2: {
        borderBottomColor: "blue",
        borderBottomWidth: 1
      }
    });
  };
  hasBlur2 = () => {
    [
      this.setState({
        style2: {
          borderBottomColor: "rgba(0,0,0,0.5)",
          borderBottomWidth: 0.7
        }
      })
    ];
  };
  hasFocus3 = () => {
    this.setState({
      style3: {
        borderBottomColor: "blue",
        borderBottomWidth: 1
      }
    });
  };
  hasBlur3 = () => {
    [
      this.setState({
        style3: {
          borderBottomColor: "rgba(0,0,0,0.5)",
          borderBottomWidth: 0.7
        }
      })
    ];
  };
  hasFocus4 = () => {
    this.setState({
      style4: {
        borderBottomColor: "blue",
        borderBottomWidth: 1
      }
    });
  };
  hasBlur4 = () => {
    [
      this.setState({
        style4: {
          borderBottomColor: "rgba(0,0,0,0.5)",
          borderBottomWidth: 0.6
        }
      })
    ];
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  //Sign up

  SignUp = async () => {
    let formData = new FormData();
    const uri = this.state.avatar.uri;
    const uriParts = uri.split(".");
    const fileName = uriParts[uriParts.length - 1];
    formData.append("avatar", {
      name: `photo.${fileName}`,
      type: `image/${fileName}`,
      uri:
        Platform.OS === "android"
          ? this.state.avatar.uri
          : this.state.avatar.uri.replace("file://", "")
    });
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    formData.append("email", this.state.email);
    console.log(formData);
    const response = await fetch("http://192.168.1.60:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
    const data = await response.json();
    console.log("data", data);
    console.log("data.suc", data.success);
    if (data.success) {
      AsyncStorage.setItem("user", JSON.stringify(data.user));
    }
    return data.success;
  };

  _onPress = async () => {
    if (!this.state.username) {
      this.setState({ field: "Cannot Be Empty" });
      return false;
    }
    if (!this.state.email) {
      this.setState({ emailvalidate: "Email Cannot Be Empty" });
      return false;
    }
    // if (!this.state.password.length < 6) {
    //   this.setState({ passwordvalid: "Password must be more than 6 Digitals" });
    //   return false;
    // }
    if (typeof this.state.email !== "undefined") {
      let lastAtPos = this.state.email.lastIndexOf("@");
      let lastDotPos = this.state.email.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.email.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          this.state.email.length - lastDotPos > 2
        )
      ) {
        this.setState({
          emailvalidate: "Email Is Invalid"
        });
        return false;
      }
    }
    if (!this.state.password) {
      this.setState({ passwordvalid: "Password Cannot Be Empty" });
      return false;
    }
    if (this.state.password != this.state.conformpassword) {
      this.setState({ passwordvalid: "Conform Your Password" });
      return false;
    } else {
      console.log("hsh");
      const signup_response = await this.SignUp();

      if (signup_response) {
        Actions.Head();
      } else {
        alert("Please check your credential");
      }
    }
  };
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  /***
   * Pick Image
   */

  pickImage = async () => {
    const options = {
      noData: true
    };
    let result = await ImagePicker.launchImageLibraryAsync(options);
    console.log(result);
    if (result.uri) {
      this.setState({ avatar: result });
    }
  };
  render() {
    let avatar = this.state.avatar;
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 120
          }}
        >
          {!avatar ? (
            // <Image
            //   source={require("../assets/splash1.png")}
            //   style={{ width: 100, height: 100, borderRadius: 100 }}
            // />
            <View
              style={{
                width: 90,
                height: 90,
                borderStyle: "dashed",
                borderRadius: 100,
                borderColor: "rgba(0,0,0,0.4)",
                borderWidth: 0.7,
                backgroundColor: "white",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                onPress={this.pickImage}
                style={{ alignSelf: "center" }}
              >
                <Entypo name="camera" style={{ color: "blue", fontSize: 30 }} />
              </TouchableOpacity>
            </View>
          ) : (
            <Image
              source={{ uri: avatar.uri }}
              style={{ width: 100, height: 100, borderRadius: 100 }}
            />
          )}
        </View>

        <KeyboardAvoidingView >
          <Text style={{ color: "red" }}>{this.state.field}</Text>
          <View style={{ flexDirection: "row" }}>
            <Feather name="user" style={styles.IconInline} />
            <TextInput
              style={[styles.input, this.state.style]}
              placeholder="Username"
              autoCapitalize="none"
              placeholderTextColor="rgba(0,0,0,0.5)"
              onChangeText={val => this.onChangeText("username", val)}
              onFocus={this.hasFocus1}
              onBlur={this.hasBlur1}
            />
          </View>
          <Text style={{ color: "red" }}>{this.state.passwordvalid}</Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="lock-outline"
              style={styles.IconInline}
            />
            <TextInput
              style={[styles.input, this.state.style2]}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="rgba(0,0,0,0.5)"
              onChangeText={val => this.onChangeText("password", val)}
              onFocus={this.hasFocus2}
              onBlur={this.hasBlur2}
            />
          </View>
          <Text style={{ color: "red" }}>{this.state.passwordvalid}</Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="lock-question"
              style={styles.IconInline}
            />
            <TextInput
              style={[styles.input, this.state.style3]}
              placeholder="Confirm Your Password"
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="rgba(0,0,0,0.5)"
              onChangeText={val => this.onChangeText("conformpassword", val)}
              onFocus={this.hasFocus3}
              onBlur={this.hasBlur3}
            />
          </View>
          <Text style={{ color: "red" }}>{this.state.emailvalidate}</Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="email-outline"
              style={styles.IconInline}
            />
            <TextInput
              style={[styles.input, this.state.style4]}
              placeholder="Email"
              autoCapitalize="none"
              placeholderTextColor="rgba(0,0,0,0.5)"
              onFocus={this.hasFocus4}
              onBlur={this.hasBlur4}
              onChangeText={val => this.onChangeText("email", val)}
            />
          </View>
          <TouchableOpacity onPress={this._onPress} style={styles.button}>
            <Text style={{alignSelf:"center", fontSize:20,color:"white"}}>Sign Up</Text>
          </TouchableOpacity> 
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 15,
    color: "black",
    width: "80%",
    alignSelf: "center",
    fontWeight: "400",
    marginVertical: 5
  },
  IconInline: {
    fontSize: 30,
    marginTop: 10,
    marginHorizontal: 5,
    fontWeight: "100",
    borderBottomColor: "rgba(0,0,0,0.5)",
  },
  button: {
    width: "80%",
    backgroundColor: "blue",
    height:40,
    alignSelf:"center",
    marginTop:20
  }
});
