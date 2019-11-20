import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Actions } from "react-native-router-flux";
import { Header, Left, Body, Right, Icon } from "native-base";
import { RectButton } from "react-native-gesture-handler";
import { Entypo, EvilIcons } from "@expo/vector-icons";
export default class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_images: null,
      text: "",
      title: ""
    };
  }

  EditPost = async () => {
    let formData = new FormData();
    if(this.state.post_images != null){
    const uri = this.state.post_images.uri;
    const uriParts = uri.split(".");
    const fileName = uriParts[uriParts.length - 1];
   
    formData.append("post_images", {
      name: `photo.${fileName}`,
      type: `image/${fileName}`,
      uri:
        Platform.OS === "android"
          ? this.state.post_images.uri
          : this.state.post_images.uri.replace("file://", "")
    })}else{
      formData.append("post_images", "")

    };
  
    
    formData.append("title", this.state.title);
    formData.append("text", this.state.text);
    formData.append("post_id", this.props.toUpdate.post_id);
    formData.append("images_id", this.props.toUpdate.images_id);
    // let body = {};
    // let columns = Object.keys(this.state);
    // let rows = Object.values(this.state);
    // let map = rows.map((row, index) => {
    //   if (row.length > 0) {
    //     body[columns[index]] = row;
    //   }
    // });
    // console.log( ">>>>", body);
    const response = await fetch("http://192.168.1.60:8080/Editpost", {
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
    console.log("Loading Edit");
    const signup_response = await this.EditPost();

    if (signup_response) {
      alert("Edit Successfully");
      Actions.pop();
    } else {
      alert("Please check your post");
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

  pickImage = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
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
      <View style={{ backgroundColor: "#fff" }}>
        <Header style={{ height: 60, width: "100%" }}>
          <Left>
            <RectButton>
              <Icon
                style={{ fontSize: 30, color: "white" }}
                name="arrow-back"
              />
            </RectButton>
          </Left>
          <Body>
            <Text style={{ fontSize: 20, color: "white" }}> Edit Post</Text>
          </Body>
          <Right>
            <TouchableOpacity onPress={this._onPress}>
              <Text
                style={
                  this.state.styleChange
                    ? styles.styleChange
                    : styles.styleDefault
                }
              >
                Save
              </Text>
            </TouchableOpacity>
          </Right>
        </Header>
        <View
          style={{
            marginVertical: 8,
            backgroundColor: "#fff",
            width: "100%",
            height:"100%"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginTop: 10,
                marginLeft: 10
              }}
              source={{
                uri: `http://192.168.1.60:8080/images/${this.props.toUpdate.avatar}`
              }}
            />
            <Text style={{ padding: 10, fontWeight: "800", fontSize: 17 }}>
              {this.props.toUpdate.username}
            </Text>
          </View>
          <TextInput
            defaultValue={this.props.toUpdate.title}
            style={{ marginVertical: 10, fontSize: 17 }}
            onChangeText={title => this.setState({ title })}
          />
          <TextInput
            defaultValue={this.props.toUpdate.text}
            style={{ marginVertical: 10, fontSize: 15 }}
            onChangeText={text => this.setState({ text })}
          />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={this.pickImage}>
              <Entypo name="images" style={styles.icons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.pickImage2}>
              <EvilIcons name="camera" style={styles.icons} />
            </TouchableOpacity>
          </View>
          {!post_images ? (
            <View   style={{ width: "100%", height: 303,borderStyle:"dashed", borderRadius: 0.001,borderColor:"black",borderWidth:0.8 }}>
            <Image
              style={{ width: "100%", height: 300 }}
              source={{
                uri: `http://192.168.1.60:8080/images/${this.props.toUpdate.images_name}`
              }}
            />
            </View>
          ) : (
            <Image
              source={{ uri: post_images.uri }}
              style={{ width: "100%", height: 300 }}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  styleChange: {
    fontSize: 20,
    color: "white"
  },
  styleDefault: {
    fontSize: 20,
    color: "rgba(255,255,255,0.5)"
  },
  icons: {
    fontSize: 30,
    color: "blue",
    padding: 9
  }
});
