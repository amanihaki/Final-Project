import React, { Component } from 'react';
import { StyleSheet, Text, View, Button , ImageBackground ,TextInput,Linking} from 'react-native';
export default  class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
          username:"",
          password:""
        
        };
      }

      // onSubmit = async evt => {
      //   evt.preventDefault()
      //   const body = new FormData();
      //   body.append('username', (this.state.username));
      //   body.append('password', (this.state.password))
      //   const response = await fetch(`http://localhost:8080/login`, {method: 'POST', body});
      //   const answer = await response.json();
      //   if (answer.success === false) {
         
      //   } else {
      //     this.props.history.push('/')
      //   }
        
      // }
      





render(){
    return(


<View>
<View >
      <Button title="LOG IN" />
     
  
      </View>
        <TextInput
        style={styles.textInput}
     placeholder="Enter Your Username" require
     value={this.state.username}
     onChange={e=>this.setState({
         username:e.target.value
     })}
     
      />
     <TextInput
        style={styles.textInput}
     placeholder="Enter Your Password" require
     value={this.state.password}
     onChange={e=>this.setState({
        password:e.target.value
    })}
    
      />
      <Text>No User? </Text>
      <Text style={{color: 'blue'}}
       onPress={() => Linking.openURL('http://google.com')}>
   Sign Up
 </Text>
 </View>

    )


}


}

const styles = StyleSheet.create({

    textInput:{
      borderBottomColor:"white",
      borderBottomWidth:1,
       width:"80%"
      }
  });
  