import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Text
} from "react-native";
import { Actions } from "react-native-router-flux";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: this.props.likes
    };
  }
  /**
   *
   * INSERT likes
   */
  onSubmit = async () => {
    let formData = new FormData();
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    formData.append("status", this.state.like);
    formData.append("users_id", user.users_id);
    formData.append("post_id", this.props.Post_id);
    console.log("formData", formData);

    const response = await fetch("http://192.168.1.60:8080/LikeAndDislike", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
    const data = await response.json();

    if (data.success) {
      return data.success;
    }
  };
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "rgba(0,0,0,0.4)",
          borderBottomWidth: 0.4,
          marginHorizontal: 12
        }}
      >
        <TouchableOpacity
          onPress={() =>
            this.setState(
              {
                like: this.state.like == 1 ? 1 : 1
              },
              this.onSubmit
            )
          }
        >
          <AntDesign
            name="like2"
            style={this.state.like === 1 ? styles.styleButton : styles.button}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.hide}>
          <AntDesign
            style={this.state.like === 2 ? styles.styleButton : styles.button}
            name="dislike2"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Actions.Comments({
              data: this.props.data,
              Post_id: this.props.Post_id
            })
          }
        >
          <EvilIcons
            style={{ fontSize: 30, padding: 10, color: "rgba(0,0,0,0.5)" }}
            name="comment"
          />
        </TouchableOpacity>
        {this.props.counter.slice(0, 1).map((item, index) => (
          <View key={index}>
            <Text
              style={{
                marginVertical: 15,
                marginLeft: -10,
                color: "rgba(0,0,0,0.5)"
              }}
            >
              {item.counter}
            </Text>
          </View>
        ))}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  styleButton: {
    fontSize: 20,
    padding: 10,
    color: "blue"
  },
  button: {
    fontSize: 20,
    padding: 10,
    color: "rgba(0,0,0,0.7)"
  }
});
