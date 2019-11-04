import React from "react";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Dimensions from "Dimensions";
import { Actions } from "react-native-router-flux";
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
    passwordvalid: ""
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
    const response = await fetch("http://192.168.6.107:8080/signup", {
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
      <ScrollView style={{ padding: 30 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity>
            <Button title="Pick an image" onPress={this.pickImage} />
          </TouchableOpacity>
          {!avatar ? (
            <Image
              source={require("../assets/splash1.png")}
              style={{ width: 100, height: 100, borderRadius: 100 }}
            />
          ) : (
            <Image
              source={{ uri: avatar.uri }}
              style={{ width: 100, height: 100, borderRadius: 100 }}
            />
          )}
        </View>

        <KeyboardAvoidingView style={{ marginTop: 10 }}>
          <Text style={{ color: "red" }}>{this.state.field}</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("username", val)}
          />
          <Text style={{ color: "red" }}>{this.state.passwordvalid}</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("password", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Your Password"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("conformpassword", val)}
          />
          <Text style={{ color: "red" }}>{this.state.emailvalidate}</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("email", val)}
          />

          <Button title="Sign Up" onPress={this._onPress} />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
const MARGIN = 40;
const styles = StyleSheet.create({
  input: {
    backgroundColor: "#42A5F5",
    height: 40,
    marginBottom: 10,
    paddingLeft: 45,
    borderRadius: 20,
    color: "#ffffff"
  }
});
