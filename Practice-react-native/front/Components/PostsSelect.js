import React, { Component } from "react";
import LikeAndDisike from "./LikeAndDislike";
import {
  Text,
  View,
  Image,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  TouchableOpacityBase
} from "react-native";
import MoreActions from "./MoreActions";
import HandleDateComments from "./HandleDateComments";
import { Actions } from "react-native-router-flux";

export default class Post_fashion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        results: []
      },
      hiddenObject: null,
      user:""
    };
  }
  hideButton = key => {
    this.setState({
      hiddenObject: key
    });
  };

  componentDidMount = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    this.setState({user:user.users_id})
    try {
      let data = await fetch(
        `http://192.168.1.60:8080/posts/${this.props.id}/${user.users_id}`
      );
      let res = await data.json();
      console.log("data", res.results);
      this.setState({
        post: res
      });
    } catch (err) {
      console.log(err);
    }
  };

  deletePost = (ID) => {
    const changepost= this.state.post.results.filter(P => {
      return P.post_id !== ID;
    });
    this.setState({
      post:{
        ...this.state.post,
        results:  changepost

      }
    })
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#eee",
          marginBottom: 80
        }}
      >
        {this.state.post.results.map((item, index) => {
          console.log(
            "image url - ",
            `http://192.168.1.60:8080/images/${item.avatar}`,
            item.post_id
          );
          return (
            <ScrollView
              key={item.post_id}
              style={{
                marginVertical: 8,
                backgroundColor: "#fff",
                width: "100%"
              }}
            >
              {this.state.hiddenObject !== item.post_id && (
                <>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        Actions.Chats({
                          idUserto: item.users_id,
                          id: this.state.user
                        })
                      }
                    >
                      <Image
                        source={{
                          uri: `http://192.168.1.60:8080/images/${item.avatar}`
                        }}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          marginTop: 10,
                          marginLeft: 10
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{ padding: 10, fontWeight: "800", fontSize: 17 }}
                    >
                      {item.username}
                    </Text>

                    <MoreActions
                      Post_id={item.post_id}
                      Cate_id={item.cate_id}
                      Images_id={item.images_id}
                      deletePost={this.deletePost}
                    />
                  </View>

                  <Text>{item.title}</Text>
                  <Text style={{ marginVertical: 10 }}>{item.text}</Text>
                  <Image
                    source={{
                      uri: `http://192.168.1.60:8080/images/${item.images_name}`
                    }}
                    style={{ width: "100%", height: 250 }}
                  />

                  <LikeAndDisike
                    counter={item.Comments}
                    Post_id={item.post_id}
                    likes={item.userLiked}
                    data={this.state.post.results}
                    hide={() => this.hideButton(item.post_id)}
                  />
                  {/* <Text>{item.counts.comment}</Text> */}
                  {item.Comments.slice(0, 2).map((item, index) => (
                    <View
                      key={index}
                      style={{ marginVertical: 10, marginLeft: 12 }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={{
                            uri: `http://192.168.1.60:8080/images/${item.avatar}`
                          }}
                          style={{ width: 40, height: 40, borderRadius: 25 }}
                        />
                        <Text style={{ color: "rgba(0,0,0,0.7)" }}>
                          {" "}
                          {item.username}
                        </Text>
                        <HandleDateComments date={item.date_comment} />
                      </View>

                      <Text style={{ padding: 5 }}> {item.comment}</Text>
                    </View>
                  ))}
                </>
              )}
            </ScrollView>
          );
        })}
      </View>
    );
  }
}
