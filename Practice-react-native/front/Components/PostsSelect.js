import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import Dimensions from "Dimensions";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  icon,
  Alert,
  ScrollView,
  FlatList,
  Image
} from "react-native";

export default class Post_fashion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        results: []
      }
    };
  }

  componentDidMount = async () => {
    try {
      let data = await fetch("http://192.168.6.107:8080/fashion");
      let res = await data.json();
      console.log("data", res.results);
      this.setState({
        post: res
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",

          alignItems: "center"
        }}
      >
        {this.state.post.results.map((item, key) => {
          console.log(
            "image url - ",
            `http://192.168.6.107:8080/images/${item.avatar}`
          );
          return (
            <View key={key} style={{ marginVertical: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{
                    uri: `http://192.168.6.107:8080/images/${item.avatar}`
                  }}
                  style={{ width: 50, height: 50, borderRadius: 30 }}
                />
                <Text style={{ padding: 10, fontWeight: "800", fontSize: 17 }}>
                  {item.username}
                </Text>
              </View>
              <Text style={{ marginVertical: 10 }}>{item.text}</Text>
              <Image
                source={{
                  uri: `http://192.168.6.107:8080/images/${item.images_name}`
                }}
                style={{ width: 300, height: 200 }}
              />
            </View>
          );
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width / 2
  }
});
