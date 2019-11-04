import React from "react";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GLOBAL from "./Global";
// import { Actions } from "react-native-router-flux";
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
  View,
  TouchableOpacity
} from "native-base";
import { Actions } from "react-native-router-flux";

const routes = [
  { icon: "home", slide: "Home" },
  { icon: "profile", slide: "Profile" },
  { icon: "staro", slide: "Favorites" },
  { icon: "wechat", slide: "Chats" },
  { icon: "setting", slide: "Setting" },
  { icon: "infocirlceo", slide: "About App" },
  { icon: "logout", slide: "Log Out" }
];
export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {
        results: []
      }
    };
  }

  componentDidMount = async () => {
    let data = await fetch(
      `http://192.168.6.107:8080/users/${GLOBAL.users_id}`
    );
    try {
      let res = await data.json();
      console.log("data", res.results);
      this.setState({
        users: res
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <View
            style={{
              height: 130,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute",
              backgroundColor: "#eee",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              LinearGradient: ("top", "red")
            }}
          >
            <LinearGradient
              colors={["#F978FF", "transparent"]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 130
              }}
            />
            <View style={{ flexDirection: "row", marginHorizontal: 70 }}>
              <Text style={styles.text}>XL</Text>
              <AntDesign
                name="search1"
                style={{
                  fontSize: 30,
                  color: "#3A26FF",
                  fontWeight: "bold",
                  marginTop: 30
                }}
              />
              <EvilIcons
                name="camera"
                style={{
                  fontSize: 15,
                  color: "#3A26FF",
                  fontWeight: "bold",
                  marginTop: 37,
                  marginLeft: 45,
                  position: "absolute"
                }}
              />
            </View>

            {this.state.users.results.map((item, key) => {
              console.log(
                "image url - ",
                `http://192.168.6.107:8080/images/${item.avatar}`
              );
              return (
                <View key={key} style={{ marginVertical: 20 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: 40,
                      marginTop: 10
                    }}
                  >
                    {/* <Image
                      source={{
                        uri: `http://192.168.6.107:8080/images/${item.avatar}`
                      }}
                      style={{ width: 50, height: 50, borderRadius: 30 }}
                    /> */}
                    <Text> Logged as </Text>
                    <Text style={{ fontWeight: "800", fontSize: 17 }}>
                      {item.username}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          {/* <Image
            source={{
              uri:
                "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
            }}
            style={{
              height: 120,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute"
            }}
          />
          <Image
            square
            style={{
              height: 80,
              width: 70,
              position: "absolute",
              alignSelf: "center",
              top: 20
            }}
            source={{
              uri:
                "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png"
            }}
          /> */}
          <List
            dataArray={routes}
            contentContainerStyle={{
              marginTop: 120,
              marginLeft: 10
            }}
            renderRow={data => {
              return (
                <ListItem 
                button onPress={Actions[data.slide]}>
                  
                  <View style={{ marginRight: 20 }}>
                    <AntDesign name={data.icon} style={{ fontSize: 30 }} />
                  </View>
                  <Text style={{ fontSize: 18, marginLeft: 20 }}>
                    {data.slide}
                  </Text>
           
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 80,
    height: 80
  },
  text: {
    color: "#3A26FF",
    fontWeight: "bold",
    backgroundColor: "transparent",
    marginTop: 20,
    fontSize: 34
  }
});
