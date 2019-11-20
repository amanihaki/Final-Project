import React, { Component } from "react";
import LikeAndDisike from "./LikeAndDislike";
import MoreActions from "./MoreActions";
import HandleDateComments from "./HandleDateComments";
import {
  View,
  AsyncStorage,
  Text,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";


export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: ""
    };
  }

  Comment = async () => {
    let formData = new FormData();
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    formData.append("comments", this.state.comments);
    formData.append("users_id", user.users_id);
    formData.append("post_id", this.props.Post_id);
    console.log(formData);
    const response = await fetch("http://192.168.1.60:8080/comments", {
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
    if (!this.state.comments) {
      alert("there is No comment to post");
      return false;
    } else {
      console.log("Loading");
      const Comments = await this.Comment();
      if (Comments) {
        alert("Comment Successfully");
      } else {
        alert("Please check your comments");
      }
    }
  };
  render() {
    let found = this.props.data.find(element => {
      return element.post_id == this.props.Post_id;
    });
    console.log(">>>", found);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}
      >
        <ScrollView
          style={{
            backgroundColor: "#fff",
            width: "100%"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{
                uri: `http://192.168.1.60:8080/images/${found.avatar}`
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginTop: 10,
                marginLeft: 10
              }}
            />
            <Text style={{ padding: 10, fontWeight: "800", fontSize: 17 }}>
              {found.username}
            </Text>
            <MoreActions
              Post_id={found.post_id}
              Cate_id={found.cate_id}
              Images_id={found.images_id}
            />
          </View>

          <Text>{found.title}</Text>
          <Text style={{ marginVertical: 10 }}>{found.text}</Text>
          <Image
            source={{
              uri: `http://192.168.1.60:8080/images/${found.images_name}`
            }}
            style={{ width: "100%", height: 250 }}
          />

          <LikeAndDisike
            Post_id={found.post_id}
            likes={found.userLiked}
            counter={found.Comments}
          />
          {/* <Text>{item.counts.comment}</Text> */}
          {found.Comments.map((item, index) => (
            <View key={index} style={{ marginVertical: 10, marginLeft: 12 }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{
                    uri: `http://192.168.1.60:8080/images/${item.avatar}`
                  }}
                  style={{ width: 40, height: 40, borderRadius: 25 }}
                />
                <Text style={{ color: "rgba(0,0,0,0.7)" }}>
                  {item.username}
                </Text>
                <HandleDateComments date={found.date_comment} />
              </View>

              <Text style={{ padding: 5 }}> {item.comment}</Text>
            </View>
          ))}
        </ScrollView>
        <KeyboardAvoidingView
          style={{ flexDirection: "row", backgroundColor: "transparent" }}
          behavior="padding"
          keyboardVerticalOffset={85}
        >
          <TextInput
            style={{
              borderColor: "rgba(0,0,0,0.7)",
              borderWidth: 0.4,
              borderRadius: 25,
              width: "80%",
              height: 45,
              margin: 5,
              paddingLeft: 13,
              fontSize: 18
            }}
            placeholder="Type a comment.."
            placeholderTextColor="rgba(0,0,0,0.5)"
            onChangeText={comments => this.setState({ comments })}
          />
          <TouchableOpacity
            onPress={this._onPress}
            style={{
              borderColor: "rgba(0,0,0,0.6)",
              borderWidth: 0.4,
              borderRadius: 100,
              width: "17%",
              height: 45,
              justifyContent: "center",
              marginVertical: 5
            }}
          >
            <Text style={{ alignSelf: "center", fontSize: 18 }}>Send</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
