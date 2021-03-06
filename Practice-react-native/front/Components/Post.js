import React from "react";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Actions } from "react-native-router-flux";
import {
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
    title: "",
    text: "",
    post_images: null,
    loadingImage: false
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  //Sign up

  SignUp = async () => {
    let formData = new FormData();
    const uri = this.state.post_images.uri;
    const uriParts = uri.split(".");
    const fileName = uriParts[uriParts.length - 1];
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    formData.append("post_images", {
      name: `photo.${fileName}`,
      type: `image/${fileName}`,
      uri:
        Platform.OS === "android"
          ? this.state.post_images.uri
          : this.state.post_images.uri.replace("file://", "")
    });
    formData.append("title", this.state.title);
    formData.append("text", this.state.text);
    formData.append("users_id", user.users_id);
    formData.append("cate_id", this.props.id);
    console.log(formData);
    const response = await fetch("http://192.168.1.60:8080/post", {
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
    if (!this.state.text && !this.state.title && !this.state.post_images) {
      alert("Complete your Sign up");
      return false;
    } else {
      console.log("hsh");
      const signup_response = await this.SignUp();

      if (signup_response) {
        alert("Posted Successfully");
        Actions.pop();
      } else {
        alert("Please check your post");
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    

    };
    let result = await ImagePicker.launchImageLibraryAsync(options);
    console.log(result);
    if (result.uri) {
      this.setState({ post_images: result });
    }
  };
  pickImage2 = async () => {
    const options = {
      noData: true
    };
    let result = await ImagePicker.launchCameraAsync(options);
    console.log(result);
    if (result.uri) {
      this.setState({ post_images: result });
    }
  };
  render() {
    let post_images = this.state.post_images;
    return (
      <ScrollView style={{ padding: 30 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity>
            <Button title="Gallery" onPress={this.pickImage} />
            <Button title="Camera Roll" onPress={this.pickImage2} />
          </TouchableOpacity>

          {!post_images ? (
            <Image
              source={require("../assets/splash1.png")}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <Image
              source={{ uri: post_images.uri }}
              style={{ width: 100, height: 100 }}
            />
          )}
        </View>
        <KeyboardAvoidingView style={{ marginTop: 60 }}>
          <TextInput
            style={styles.input}
            placeholder="TITLE"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("title", val)}
          />

          <TextInput
            style={styles.input}
            placeholder="TEXT"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("text", val)}
          />

          <Button title="Post " onPress={this._onPress} />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 55,
    backgroundColor: "#42A5F5",
    margin: 10,
    color: "white",
    borderRadius: 14
  }
});
