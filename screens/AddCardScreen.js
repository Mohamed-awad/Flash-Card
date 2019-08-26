import React, {Component}from 'react';
import {View, StyleSheet, Text,
  TextInput, Keyboard, TouchableOpacity, AsyncStorage} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import {addCardToDeck} from "../utils/helper";

export default class AddCardScreen extends Component{

  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Add Card',
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

  handleChangeQuestion = (question) => {
    this.setState({ question });
  }

  handleChangeAnswer = (answer) => {
    this.setState({ answer });
  }

  handleSubmit = () => {
    const deckId = this.props.navigation.getParam("deckId")
    if(this.state.question !== '' &&
        this.state.answer !== '') {

      addCardToDeck(deckId, {
        question: this.state.question,
        answer: this.state.answer
      }).then(() => {
        this.props.navigation.navigate("DeckDetails", {"id": deckId})
      })
      this.setState({
        question: '',
        answer: ''
      });
    } else {
      alert('Deck Question or Answer can\'t be empty')

    }

  }


  render() {
   return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Card Question"
          maxLength={20}
          onBlur={Keyboard.dismiss}
          value={this.state.question}
          onChangeText={this.handleChangeQuestion}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Card Answer"
          maxLength={20}
          onBlur={Keyboard.dismiss}
          value={this.state.answer}
          onChangeText={this.handleChangeAnswer}
        />
        <TouchableOpacity style={styles.saveButton}
        onPress={this.handleSubmit} >
          <Text style={styles.saveButtonText}>Add Card</Text>
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

});
