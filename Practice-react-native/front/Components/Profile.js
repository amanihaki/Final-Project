import React, { Component } from 'react';
import CreateAccount from "./CreateAccount";

import { Actions} from 'react-native-router-flux';
import {
  StyleSheet,
View,
FlatList,

  Image,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity
  

} from 'react-native';

import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class Contacts extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: navigation.getParam('otherParam', 'A Nested Details Screen'),
  //   };
  // };

  
    // constructor(props) {
    //   super(props);
    //   this.state = { 
    //      menuOpen: "" 
    //      }
    // }
    handleMenu=() =>{
     
     Actions.Head();
    }

  render() {
    return(
     
      <Container>
      <Header style={{height:78}}>
          <Left>
            <Button transparent>
              <Icon  name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text>Header</Text>
          </Body>
          <Right>
            <TouchableOpacity>
            <Button transparent onPress={this.handleMenu}>
              <Icon style={{fontSize:40}} name='menu'/>

            </Button>
            </TouchableOpacity>
        
          </Right>
        </Header>
       
    </Container>
  

    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
}); 