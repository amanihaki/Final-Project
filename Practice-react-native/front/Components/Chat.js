import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { StyleSheet, View , Platform} from "react-native";
import io from "socket.io-client";

const SocketEndpoint = "http://192.168.1.60:8080";
const amani = "amaniiiii haki";
const socket = io(SocketEndpoint, {
  transports: ["websocket"]
});
export default class App extends React.Component {
  state = {
    isConnected: false,
    data: null,
    amani: "amani",
    date: new Date()
  };

  componentDidMount() {
    socket.on("connect", () => {
      this.setState({ isConnected: true });
    });

    // socket.on("selectM", data => {
    //   console.log("!123444",data)
    // });
    socket.emit("join", { amani }, () => {});

    socket.on("data",()=>{
      console.log("from backend")
    })
  }
  // send = () => {
  //   const message = this.state.message;
  //   const marketDate = this.state.date;
  //   const date = moment(marketDate).format();
  //   const users = this.props.id;
  //   const idUserto = this.props.idUserto;
  //   socket.emit("send", { message, date, users,idUserto}, () => {});
  // };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    const text = messages[0].text;
    const date = messages[0].createdAt;
    const users = this.props.id;
    const idUserto = this.props.idUserto;

    socket.emit("send", { text, date, users, idUserto }, () => {});
  }

  // componentWillMount() {
  //   this.setState({
  //     messages: [
  //       {
  //         _id: 1,
  //         text: "Hello developer",
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: "React Native",
  //           avatar: "https://placeimg.com/140/140/any",
  //         },
  //       },
  //     ],
  //   });
  // }

  render() {
    return (
      // <View style={styles.container}>
      //   <Text>connected: {this.state.isConnected ? "true" : "false"}</Text>
      //   {this.state.data && <Text>ping response: {this.state.data}</Text>}

      //   <KeyboardAvoidingView style={{ bottom: 0 }}></KeyboardAvoidingView>
      //     <TextInput
      //       placeholder="type a message"
      //       onChangeText={message =>
      //         this.setState({
      //           message
      //         })
      //       }
      //     />
      //     <Button title="disconnected" onPress={this.send} />
      //   </KeyboardAvoidingView>
      // </View>
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
        {Platform.OS === "android" ? <KeyboardSpacer /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
