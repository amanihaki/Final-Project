import React, {Component} from 'react';
import Logo from '../Components/Logo';
import Form from '../Components/Form';
import Wallpaper from '../Components/Wallpaper';
import LoadingPage from "../Components/LoadingPage.js"
import SignupSection from '../Components/SignupSection';

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
      </Wallpaper>
    );
  }
}} 
