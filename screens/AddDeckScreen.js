import React, {Component}from 'react';
import {View, StyleSheet, Text,
  TextInput, Keyboard, TouchableOpacity, AsyncStorage} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import {saveDeckTitle} from "../utils/helper";

export default class AddDeckScreen extends Component{

  state = {
    title: ''
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Add Deck',
    headerStyle: {
      backgroundColor: '#292477',
    },
    headerTitleStyle: {
      color: '#fff',
      fontWeight: 'bold',
      flexGrow:1,
    },
    headerLeft: (
      <AntDesign name="back" onPress={() => navigation.goBack(null)}
        size={40} color={"lightblue"}
      />
    )
  });

  handleChange = (title) => {
    this.setState({ title });
  }

  handleSubmit = () => {
    if(this.state.title !== '') {
      saveDeckTitle(this.state.title).then(() => {
        this.props.navigation.navigate("Home")
      })
      this.setState({title: ''});
    } else {
      alert('Deck Title can\'t be empty')
    }

  }


  render() {
   return (
      <View style={styles.container}>
        <Text style={styles.deckHead}> what is title of your new deck ? </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Deck Title"
          maxLength={20}
          onBlur={Keyboard.dismiss}
          value={this.state.title}
          onChangeText={this.handleChange}
        />
        <TouchableOpacity style={styles.saveButton}
        onPress={this.handleSubmit} >
          <Text style={styles.saveButtonText}>ADD Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 20
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  deckHead: {
    fontSize: 30,
    textAlign: 'center',
    margin: 20
  }
});
