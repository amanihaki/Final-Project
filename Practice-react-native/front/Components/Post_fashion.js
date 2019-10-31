import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
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
      },
      imageUri:""
    };
  }

  componentDidMount = async () => {
    try {
      let data = await fetch("http://192.168.6.107:8080/fashion");
      let res = await data.json();
      console.log("data", res.results);
      this.setState({
        post: res,
        imageUri:res.results[0].images_name
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View>
        {this.state.post.results.map((item, key) => (
          <View key={key}>
            <Text>{item.username}</Text>
            <Text>{item.title}</Text>
            <Text>{item.text}</Text>
            <Image
              source={{ uri: `http://192.168.6.107:8080/${item.images_name}` }}
              
              style={{ width: 100, height: 100 }}
            />
          </View>
        ))}
      </View>
    );
  }
}
