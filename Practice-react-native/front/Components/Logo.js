import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import logoImg from "../assets/logo.png";

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Image source={logoImg} style={styles.image} /> */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>XL</Text>
          <AntDesign
            name="search1"
            style={{
              fontSize: 70,
              color: "#3A26FF",
              fontWeight: "bold",
              marginTop: 40
            }}
          />
          <EvilIcons
            name="camera"
            style={{
              fontSize: 30,
              color: "#3A26FF",
              fontWeight: "bold",
              marginTop: 57,
              marginLeft: 104,
              position: "absolute"
            }}
          />
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 80,
    height: 80
  },
  text: {
    color: "#3A26FF",
    fontWeight: "bold",
    backgroundColor: "transparent",
    marginTop: 20,
    fontSize: 74
  }
});
