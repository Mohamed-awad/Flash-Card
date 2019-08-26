import React, {Component} from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native'
import { AntDesign } from "@expo/vector-icons"
import {getDeck} from '../utils/helper';

class QuizScreen extends Component {

  state = {
    currentDeck:"",
    done: false,
    showAnswer: false
  }

  componentDidMount() {
    const deckId = this.props.navigation.getParam("id")
    getDeck(deckId)
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
    title: 'Deck Quiz',
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

  correct = async () => {
    const index = this.props.navigation.getParam("index")
    const deckId = this.props.navigation.getParam("id")
    const correct = this.props.navigation.getParam("correct")
    if(index+1 === this.state.currentDeck.questions.length) {
      this.props.navigation.navigate("EndQuiz", {
        "id": deckId,
        "correct": parseFloat(correct+1),
        "total": parseFloat(index+1)
      })
    } else {
      this.props.navigation.navigate("Quiz", {
        "id": deckId,
        "index": index+1,
        "correct": correct+1
      })
    }
  }

  inCorrect = async () => {
    const index = this.props.navigation.getParam("index")
    const deckId = this.props.navigation.getParam("id")
    const correct = this.props.navigation.getParam("correct")
    if(index+1 === this.state.currentDeck.questions.length) {
      this.props.navigation.navigate("EndQuiz", {
        "id": deckId,
        "correct": parseFloat(correct),
        "total": parseFloat(index+1)
      })
    } else {
      this.props.navigation.navigate("Quiz", {
        "id": deckId,
        "index": index+1,
        "correct": correct
      })
    }

  }

  showAnswer = () => {
    this.setState({showAnswer: true})
  }

  hideAnswer = () => {
    this.setState({showAnswer: false})
  }

  render() {
    const index = this.props.navigation.getParam("index")
    const {currentDeck} = this.state
    if (this.state.done &&
        this.state.currentDeck.questions.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.deckHead}>
            Can't Start Quiz,
          </Text>
          <Text style={styles.deckHead}>
            No Cards
          </Text>
        </View>
      );
    }
    return (
      <>
      {
        this.state.done ? (
          <View style={styles.viewDeckList}>
            <Text style={styles.QNum}>{index+1}/{currentDeck.questions.length}</Text>
            {
              this.state.showAnswer ? (
                <>
                  <Text style={styles.deckHead}>
                    {currentDeck.questions[parseInt(index)].answer}
                  </Text>
                  <TouchableOpacity onPress={this.hideAnswer}>
                    <Text style={styles.buttonAnswer}>Hide Answer</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.deckHead}>
                    {currentDeck.questions[parseInt(index)].question} ?
                  </Text>
                  <TouchableOpacity onPress={this.showAnswer}>
                    <Text style={styles.buttonAnswer}>Show Answer</Text>
                  </TouchableOpacity>
                </>
              )
            }
            <TouchableOpacity onPress={this.correct}
              style={[styles.buttonDeck, styles.buttonCorrect]}>
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.inCorrect}
              style={[styles.buttonDeck, styles.buttonInCorrect]}>
              <Text style={styles.buttonText}>InCorrect</Text>
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
    padding: 20,
  },
  deckHead: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20
  },
  buttonDeck: {
    backgroundColor: "#fff",
    padding: 20,
    fontSize: 20,
    borderRadius: 20,
    borderColor: "lightblue",
    marginVertical: 10,
    borderWidth: 2,
  },
  buttonCorrect: {
    backgroundColor: 'green',
  },
  buttonInCorrect: {
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  buttonAnswer: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    marginVertical: 20
  },
  QNum: {
    fontSize: 20,
  }
});
export default QuizScreen;
