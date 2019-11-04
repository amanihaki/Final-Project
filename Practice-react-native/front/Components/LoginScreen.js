import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import LoadingPage from "./LoadingPage.js"
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
    };
  constructor(props) {
    super(props);
    this.state = {
       timePassed: false  }
  }
  

 
   
  render() {
    let that = this;
  setTimeout(()=>{that.setState({timePassed: true})}, 3000);
  if (!this.state.timePassed){
    return <LoadingPage/>;
  }else{
    return (
      
      
      <Wallpaper>
        <Logo />
        <Form />
        <SignupSection />
        {/* <ButtonSubmit/> */}
      </Wallpaper>
    );
  }
}} 
