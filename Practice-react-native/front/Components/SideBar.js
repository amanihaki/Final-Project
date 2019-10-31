import React from "react";

import { AppRegistry, Image, StatusBar } from "react-native";
import GLOBAL from "./Global";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  View
} from "native-base";

import Logo from "./Logo";
const routes = ["Home", "Chat", "Profile"];
export default class SideBar extends React.Component {


 
    constructor(props) {
      super(props);
      this.state = {
        users:{
          results:[]
        }
        }
    }
   
    componentDidMount = async () => {
    try{  let formData = new FormData();
      formData.append("users_id", GLOBAL.users_id);
      let data = await fetch("http://192.168.6.107:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });

    
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
            <View style={{ height: 120,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute"}}>
            {/* <Logo /> */}

               {/* {this.state.users.results.map((item,index)=>{
                 <View key={index}>

                   <Text>{item.username}</Text>
                   <Image
                  source={{
                    uri: `http://192.168.6.107:8080/images/${item.avatar}`
                  }}
                  style={{ width: 50, height: 50, borderRadius: 30 }}
                />
                 </View>
                } )} */}
                 {this.state.users.results.map((item, key) => {
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
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}