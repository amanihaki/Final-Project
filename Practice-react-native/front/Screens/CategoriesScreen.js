import React, { Component } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";

export default class Contacts extends Component {
  componentDidMount = async () => {
    try {
      let data = await fetch("http://192.168.1.60:8080/cetegories");
      let res = await data.json();
      console.log("data", res.results);
      this.setState({
        categories: res
      });
    } catch (err) {
      console.log(err);
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      categories: {
        results: []
      }
    };
  }

  renderItem = ({ item }) => {
    const Icons = {
      1: "car",
      2: "home",
      3: "tv",
      4: "shopping-bag",
      5: "mobile-phone",
      6: "github-alt",
      7: "child",
      8: "suitcase",
      9: "soccer-ball-o",
      10: "cogs",
      11: "star"
    };
    const IconsStyle = {
      1: { width: 50, fontSize: 40, height: 60, color: "#f56217" },
      2: { width: 50, fontSize: 40, height: 60, color: "#2c3e50" },
      3: { width: 50, fontSize: 40, height: 60, color: "black" },
      4: { width: 50, fontSize: 40, height: 60, color: "pink" },
      5: { width: 50, fontSize: 40, height: 60, color: "lightblue" },
      6: { width: 50, fontSize: 40, height: 60, color: "#FFEA6D" },
      7: { width: 50, fontSize: 40, height: 60, color: "#CF8BF3" },
      8: { width: 50, fontSize: 40, height: 60, color: "black" },
      9: { width: 50, fontSize: 40, height: 60, color: "red" },
      10: { width: 50, fontSize: 40, height: 60, color: "green" },
      11: { width: 50, fontSize: 40, height: 60, color: "#dbd65c" }
    };

    return (
      <TouchableOpacity
        onPress={() =>
          Actions.PostsScreen({ id: item.cate_id, categories: item.name })
        }
      >
        <View style={styles.row}>
          <FontAwesome
            name={Icons[item.cate_id]}
            style={IconsStyle[item.cate_id]}
          />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>

              <Ionicons
                name="ios-arrow-forward"
                style={{ fontSize: 23, marginBottom: 0 }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          extraData={this.state}
          data={this.state.categories.results}
          keyExtractor={item => item.cate_id + ""}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10
  },
  pic: {
    width: 50,
    fontSize: 40,
    height: 60,
    color: "red"
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280
  },
  nameTxt: {
    marginLeft: 20,
    fontSize: 18,
    width: 170
  },
  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  msgTxt: {
    fontWeight: "400",
    color: "#008B8B",
    fontSize: 12,
    marginLeft: 15
  }
});
