import React from "react";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AsyncStorage } from "react-native";
import { Text, Container, List, ListItem, Content, View } from "native-base";
import { Actions } from "react-native-router-flux";

const routes = [
  { id: 1, icon: "home", slide: "Home" },
  { id: 2, icon: "profile", slide: "Profile" },
  { id: 3, icon: "staro", slide: "Favorites" },
  { id: 4, icon: "wechat", slide: "Chats" },
  { id: 5, icon: "setting", slide: "Setting" },
  { id: 6, icon: "infocirlceo", slide: "About App" },
  { id: 7, icon: "logout", slide: "Log Out" }
];
export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    let data = await fetch(`http://192.168.1.60:8080/users/${user.users_id}`);
    try {
      let res = await data.json();
      console.log("data", res.results);
      this.setState({
        users: res.results
      });
      console.log("III", this.state.users);
    } catch (err) {
      console.log(err);
    }
  };
  _handleLogOut = () => {
    AsyncStorage.removeItem("user");
    alert("You have been logged out.");
    Actions.loginScreen();
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

            <View style={{ marginVertical: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 40,
                  marginTop: 10
                }}
              >
                <Text> Logged as </Text>
                <Text style={{ fontWeight: "800", fontSize: 17 }}>
                  {this.state.users.username}
                </Text>
              </View>
            </View>
          </View>

          <List
            dataArray={routes}
            contentContainerStyle={{
              marginTop: 120,
              marginLeft: 10
            }}
            keyExtractor={data => data.id + ""}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={
                    data.slide == "Log Out"
                      ? this._handleLogOut
                      : data.slide == "Chats"
                      ? () => Actions.Chats({ id: this.state.users.users_id })
                      : Actions[data.slide]
                  }
                >
                  <View style={{ marginRight: 20 }} key={data.id}>
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
