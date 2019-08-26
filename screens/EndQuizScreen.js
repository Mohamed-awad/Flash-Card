import React, {Component} from 'react';
import {Text, View, ProgressBarAndroid, ProgressViewIOS,
  TouchableOpacity, StyleSheet, Platform} from 'react-native'
import { AntDesign } from "@expo/vector-icons"
import {getDeck} from '../utils/helper';

class EndQuizScreen extends Component {


  static navigationOptions = ({ navigation }) => ({
    title: 'End Quiz',
    headerStyle: {
      backgroundColor: '#292477',
    },
    headerTitleStyle: {
      color: '#fff',
      fontWeight: 'bold',
      flexGrow:1,
    },
  });


  render() {
    const total = this.props.navigation.getParam("total")
    const deckId = this.props.navigation.getParam("id")
    const correct = this.props.navigation.getParam("correct")
    console.log(parseFloat(total))
    console.log(parseFloat(correct))
    const progress = parseFloat(correct) / parseFloat(total)
    return (
      <>
        <View style={styles.viewDeckList}>
          <Text style={styles.deckHead}>
            Score :-
          </Text>
          {
            Platform.OS === 'ios' ? (
               <ProgressViewIOS
                 progress={progress}
               />
            ) : (
              <ProgressBarAndroid
                color="#2196F3"
                styleAttr="Horizontal"
                indeterminate={false}
                progress={progress}
              />
            )
          }
          <Text style={styles.deckHead}>
            {progress*100.0} %
          </Text>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate("DeckDetails", {"id": deckId})}
              style={styles.buttonDeck}>
              <Text style={styles.buttonText}>Go Back To Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Quiz", {
                "id": deckId,
                "index": 0,
                "correct": 0
              })}
              style={styles.buttonDeck}>
              <Text style={styles.buttonText}>ReStart Quiz</Text>
            </TouchableOpacity>
        </View>
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
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default EndQuizScreen;
