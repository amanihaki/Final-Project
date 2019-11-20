import React, { Component } from "react";
import { View, TouchableOpacity, AsyncStorage } from "react-native";
import ActionSheet from "react-native-actionsheet";
import { Actions } from "react-native-router-flux";
import { Feather } from "@expo/vector-icons";

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postedit: false,
      toUpdate: [],
      deletePost: this.props.posts
    };
  }

  ///DELETING POST
  Delete = async () => {
    let formData = new FormData();
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    formData.append("cate_id", this.props.Cate_id);
    formData.append("users_id", user.users_id);
    formData.append("post_id", this.props.Post_id);
    formData.append("images_id", this.props.Images_id);
    console.log("formData", formData);

    const response = await fetch("http://192.168.1.60:8080/deletePost", {
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
  _onPress = async () => {
    if (!this.props.Post_id && !this.props.Images_id && !this.props.Cate_id) {
      alert("Errroorr in Your Deleting");
      return false;
    } else {
      console.log("Loading");
     this.props.deletePost(this.props.Post_id);
      const signup_response = await this.Delete();

      alert("The post deleted Successfully");
      if (signup_response) {
        console.log("lllllllll");
      } else {
        alert("Please check your post");
      }
    }
  };

  ////auth
  onAuth = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("user"));

    try {
      let data = await fetch(
        `http://192.168.1.60:8080/authentication/${this.props.Post_id}/${user.users_id}`
      );
      let results = await data.json();
      console.log(">>>", results.success);
      this.setState({
        postedit: results.success,
        toUpdate: results.results
      });
      console.log("update", this.state.toUpdate);
    } catch (err) {
      console.log(err);
    }
  };
  showActionSheet = () => {
    this.onAuth();
    this.ActionSheet.show();
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.showActionSheet}>
          <View style={{ marginLeft: 205 }}>
            <Feather
              name="more-vertical"
              style={{
                fontSize: 24,
                color: "rgba(0,0,0,0.6)",
                marginTop: 10
              }}
            />
          </View>
        </TouchableOpacity>
        {this.state.postedit ? (
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={false}
            options={["Delete", "Edit", "Hide", "Cancel"]}
            cancelButtonIndex={3}
            destructiveButtonIndex={1}
            style={styles}
            onPress={index => {
              if (index == 0) {
                this._onPress();
              }
              if (index == 1) {
                Actions.EditPostScreen({ toUpdate: this.state.toUpdate });
              }
            }}
          />
        ) : (
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={false}
            options={["Hide", "Cancel"]}
            cancelButtonIndex={1}
            destructiveButtonIndex={1}
            onPress={index => {}}
          />
        )}
      </View>
    );
  }
}

const styles = {
  titleBox: {
    background: "pink"
  },
  titleText: {
    fontSize: 16,
    color: "#000"
  }
};
