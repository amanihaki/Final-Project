import React, { Component } from "react";
import {  Actions} from 'react-native-router-flux';
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

export default class Post_fashion extends Component {

      constructor(props) {
          super(props);
          this.state = {
        
             post:[]

            }
      }

      componentDidMount = async()=>{
        try{
            let data = await fetch("http://192.168.6.107:8080/fashion");
            let res = await data.json();
            console.log("data",res);
            this.setState({
              post:res
            })
          }
          catch(err){
            console.log(err)
         
          }
         }
      
     

    render(){
        return(
            <View>
                {this.state.post.map((item ,key)=>(
      <View key={key}>
      
       <Text>{item.name}</Text>
      </View> ))
      } 

            </View>




        )
    }
}