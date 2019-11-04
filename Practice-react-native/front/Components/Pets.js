import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Animated,
  View,
  ScrollView
} from "react-native";
import PostsSelect from "./PostsSelect";
import { Actions } from "react-native-router-flux";
import { RectButton } from "react-native-gesture-handler";
import SlideBar from "./SideBar";

import {

  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import { EvilIcons } from "@expo/vector-icons";

const TYPES = ["front", "back", "back", "slide"];
const PARALLAX = [true, true, true, true];

const Page = ({ openDrawer }) => (
  <View style={{ backgroundColor: "#fff" }}>
    <Header style={{ height: 60, width: "100%" }}>
      <Left>
        <RectButton onPress={openDrawer}>
          <Icon style={{ fontSize: 40, color: "white" }} name="menu" />
        </RectButton>
      </Left>
      <Body>
        <Text style={{ fontSize: 20, color: "white" }}> Pets</Text>
      </Body>
      <Right>
        <Button transparent onPress={Actions.PostsSelect}>
          <EvilIcons style={{ fontSize: 40, color: "white" }} name="camera" />
        </Button>
      </Right>
    </Header>

    <ScrollView style={{ marginTop: 10 }}>
      <Text style={{ justifyContent: "center", fontSize: 20, marginLeft: 120 }}>
        The Posts
      </Text>
      {/* <PostsSelect/> */}
    </ScrollView>
  </View>
);

export default class Example extends Component {
  state = { fromLeft: true, type: 0 };

  renderParallaxDrawer = progressValue => {
    const parallax = progressValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.state.fromLeft ? -50 : 50, 0]
    });
    const animatedStyles = {
      transform: [{ translateX: parallax }]
    };
    return (
      <Animated.View style={[styles.drawerContainer, animatedStyles]}>
        <SlideBar />
      </Animated.View>
    );
  };

  render() {
    const drawerType = TYPES[this.state.type];
    const parallax = PARALLAX[this.state.type];
    return (
      <View style={styles.container}>
        <DrawerLayout
          ref={drawer => {
            this.drawer = drawer;
          }}
          drawerWidth={230}
          keyboardDismissMode="on-drag"
          drawerType={drawerType}
          overlayColor={"#00000000"}
          renderNavigationView={this.renderParallaxDrawer}
          contentContainerStyle={
            // careful; don't elevate the child container
            // over top of the drawer when the drawer is supposed
            // to be in front - you won't be able to see/open it.
            drawerType === "front"
              ? {}
              : Platform.select({
                  ios: {
                    shadowColor: "#000",
                    shadowOpacity: 0.5,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 60
                  },
                  android: {
                    elevation: 100,
                    backgroundColor: "#000"
                  }
                })
          }
        >
          <Page
            type={drawerType}
            fromLeft={this.state.fromLeft}
            parallaxOn={parallax}
            openDrawer={() => this.drawer.openDrawer()}
          />
        </DrawerLayout>
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
  }
});
