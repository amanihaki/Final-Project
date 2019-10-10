import React from "react";
import {View,Text,StyleSheet} from "react-native";
const GoalItem = props =>{

    return(
        <View>
            <Text>Amani's App is smart</Text>
       
        </View>

    )
}
const Styles = StyleSheet.create({

    styleItem:{
        padding:10,
        marginVertical:10,
        backgroundColor:"#eee",
        borderColor:"black",
        borderWidth:1
      }
})

export default GoalItem;


