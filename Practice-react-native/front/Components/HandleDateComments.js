import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
       marketDate:this.props.date
        
    };
  }
  render() {
      const marketDate = this.state.marketDate;
      const date = moment(marketDate).fromNow()
    return (
      <View style={{right:0,position:"absolute"}}>
     <Text style={{color:"rgba(0,0,0,0.7)",fontSize:13}}>{date}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop:0
  }
});
