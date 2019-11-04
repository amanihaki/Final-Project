import * as React from "react";
import { Text, View, StyleSheet, Dimensions, TextInput } from "react-native";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from 'expo-linear-gradient';


const WIDTH = Dimensions.get("screen").width;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Svg height={300} width={WIDTH}>
          <Path
            d="M-17.5 378.5C31.5 32.5 302.5 463 375 89C447.5 -285 375 644 375 644H0C0 644 -66.5 724.5 -17.5 378.5Z" // put your path here
            fill="blue"
            stroke="blue"
          />
        </Svg>
        <View style={{ backgroundColor: "blue", flex: 1 }}>
          <View
            style={{
              width: WIDTH - 60,
              height: 60,
              backgroundColor: "white",
              borderRadius: 30,
              margin: 30,
              justifyContent: "center",
              paddingLeft: 10
            }}
          >
            <TextInput placeholder="email" />

            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Sign in with Facebook
  </Text>
</LinearGradient>



          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  drawerContainer: {
    flex: 1,
    paddingTop: 0
  },
  drawerText: {
    margin: 10,
    fontSize: 15,
    textAlign: "left"
  },

    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    buttonText: {
      fontSize: 18,
      // fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
 
});
