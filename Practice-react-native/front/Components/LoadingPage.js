import React, { Component } from "react";

import Logo from "./Logo.js"
import {

  Text,
  View,
} from "react-native";

export default class Post_fashion extends Component {

     


    render(){
        return(
            <View style={{flex:1,padding:"30%"}}>
              <Logo/>
              <View>
                <Text style={{color:"rgba(0,0,0,0.4)"}}>Search for everything you want in easier way</Text>
                </View>
            </View>




        )
    }
}