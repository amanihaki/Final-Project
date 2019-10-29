import React, { Component } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Router, Scene, Actions} from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  icon,
  Alert,
  ScrollView,
  FlatList
} from "react-native";

export default class Contacts extends Component {
 

componentDidMount = async()=>{
 try{
   let data = await fetch("http://192.168.6.107:8080/cetegories");
   let res = await data.json();
   console.log("data",res.results);
   this.setState({
     categories:res
   })
 }
 catch(err){
   console.log(err)

 }
}
constructor(props) {
  super(props);
  this.state = {
    categories:{ 
      results: [ ]
    },
  

 
      calls: [
        {
          id: 1,
          name: "Vehicles",
          icon: "car",
          style: { width: 50, fontSize: 40, height: 60, color: "#f56217" }
        },
        {
          id: 2,
          name: "Home Furniture & Decor",
          icon: "home",
          style: { width: 50, fontSize: 40, height: 60, color: "#2c3e50" }
        },
        {
          id: 3,
          name: "Electronics ",
          icon: "tv",
          style: { width: 50, fontSize: 40, height: 60, color: "black" }
        },
        {
          id: 4,
          name: "Fashion & Beauty",
          icon: "shopping-bag",
          style: { width: 50, fontSize: 40, height: 60, color: "pink" }
        },
        {
          id: 5,
          name: "Moblile",
          icon: "mobile-phone",
          style: { width: 50, fontSize: 40, height: 60, color: "lightblue" }
        },
        {
          id: 6,
          name: "Pets",
          icon: "github-alt",
          style: { width: 50, fontSize: 40, height: 60, color: "#FFEA6D" }
        },
        {
          id: 8,
          name: "Kids & Babies",
          icon: "child",
          style: { width: 50, fontSize: 40, height: 60, color: "#CF8BF3" }
        },
        {
          id: 8,
          name: "Job",
          icon: "suitcase",
          style: { width: 50, fontSize: 40, height: 60, color: "black" }
        },
        {
          id: 9,
          name: "Sports",
          icon: "soccer-ball-o",
          style: { width: 50, fontSize: 40, height: 60, color: "red" }
        },
        {
          id: 10,
          name: "Services",
          icon: "cogs",
          style: { width: 50, fontSize: 40, height: 60, color: "green" }
        },
        {
          id: 11,
          name: "Others",
          icon: "star",
          style: { width: 50, fontSize: 40, height: 60, color: "#dbd65c" },

        }
      ]
   
}}
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={Actions.Head}>
         <View   style={styles.row}>
          <FontAwesome name={item.icon} style={item.style} />
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
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.status}</Text>
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
          keyExtractor={item => {
            return item.cate_id;
          }}
          renderItem={this.renderItem}
        />
        <View >
      {/* {this.state.categories.results.map((item ,key)=>(
      <View key={key}>
       <FontAwesome name={item.icon}
        style={this.state.calls.map(i=>i.style)} />
       <Text>{item.name}</Text>
      </View> ))
      } */}
    </View>
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
    // borderRadius: 30,
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
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
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
