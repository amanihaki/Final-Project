import React,{useState} from "react";
import {View,TextInput,StyleSheet,Button} from "react-native"
const GoalInput = props =>{
    const[enterName,setenterName]=useState("");


    return(
        <View style={{flexDirection:"row", justifyContent:"space-between" , alignContent:"center"}} >
        <TextInput placeholder="Enter Your User Name" style={styles.inputContainer}  onChangeText={(e)=>setenterName(e) }
        value={enterName}/>
         
          <Button  title="ADD" style={{backgroundColor:"red"}}
          onPress={props.Add}/>
           
          </View>

    )
}


const styles = StyleSheet.create({
    inputContainer:{
        borderBottomColor:"black",
        borderBottomWidth:1,
         width:"80%"
        },
})





export default GoalInput;
