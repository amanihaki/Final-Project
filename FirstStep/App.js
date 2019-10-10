import React,{useState} from 'react';
import GoalItem from "./Components/GoalItem";
// import StaticServer from 'react-native-static-server';
import { StyleSheet, Text, View,Button,TextInput,ScrollView} from 'react-native';
// let server = new StaticServer(8080);
 
// // Start the server
// server.start().then((url) => {
//   console.log("Serving at URL", url);
// });
 
// // Stop the server
// server.stop();
 
// // Check if native server running
// const isRunning = await server.isRunning()





export default function App() {
  


  const [list,setlist]=useState([]);
  const[enterName,setenterName]=useState("");
 
  return (

  
    <View style={styles.screen}>
    
    <View style={{flexDirection:"row", justifyContent:"space-between" , alignContent:"center"}} >
        <TextInput placeholder="Enter Your User Name" style={styles.inputContainer}  onChangeText={(e)=>setenterName(e) }
        value={enterName}/>
         
          <Button  title="ADD" style={{backgroundColor:"red"}}
          onPress={()=>setlist([...list,enterName])}/>
           
          </View>

  
       <GoalItem/>
       
     <ScrollView>
          
            {list.map((g)=>
            <View style={styles.styleItem}>
            <Text key={g}>
               {g} 
            </Text>
            </View>
           )}
          
        </ScrollView>
   
    </View>
  
  );
}

const styles = StyleSheet.create({
  screen:{
    padding:50
  },
  styleItem:{
    padding:10,
    marginVertical:10,
    backgroundColor:"#eee",
    borderColor:"black",
    borderWidth:1
  },

  inputContainer:{
  borderBottomColor:"black",
  borderBottomWidth:1,
   width:"80%"
  }
  }
)

