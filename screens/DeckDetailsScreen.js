import React, {Component} from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native'
import { AntDesign } from "@expo/vector-icons"
import {getDeck} from '../utils/helper';

class DeckDetailsScreen extends Component {

  state = {
    currentDeck:"",
    done: false,
  }

  componentDidMount() {
    getDeck(this.props.navigation.getParam("id"))
      .then(data => {
        this.setState({
          currentDeck: data,
          done: true,
        })
    });
  }

  componentWillMount(){
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      getDeck(this.props.navigation.getParam("id"))
        .then(data => {
          this.setState({
            currentDeck: data,
            done: true,
          })
        });
    });
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Deck Details',
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

  render() {
    const deckId = this.props.navigation.getParam("id")
    const {currentDeck} = this.state
    return (
      <>
      {
        this.state.done ? (
          <View style={styles.viewDeckList}>
            <Text style={styles.deckHead}>
              {currentDeck.title}
            </Text>
             <Text style={styles.cardsNumber}>
               {currentDeck.questions.length} cards
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AddCard", {deckId})}
              style={styles.buttonDeck}>
              <Text style={styles.buttonText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Quiz", {
                "id": deckId,
                "index": 0,
                "correct": 0
              })}
              style={styles.buttonDeck}>
              <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.container}>
            <ActivityIndicator size="large"
                               color="#7c53c3" />
            <Text style={styles.getDecks}>
              Getting Deck Information...
            </Text>
          </View>
        )
      }
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDeckList: {
    borderRadius: 20,
    marginVertical: 10,
    padding: 20,
  },
  cardsNumber: {
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
    marginBottom: 20
  },
  deckHead: {
    fontSize: 30,
    textAlign: 'center',
  },
  buttonDeck: {
    backgroundColor: "#fff",
    padding: 20,
    fontSize: 20,
    borderRadius: 20,
    borderColor: "lightblue",
    marginVertical: 20,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
export default DeckDetailsScreen;
