import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList
} from 'react-native';
import {getDecks} from "../utils/helper";
import {
  NOTIFICATION_KEY,
  clearLocalNotification,
  setLocalNotification
} from "../utils/helper";


export default class HomeScreen extends Component{

  state = {
    decks: [],
    done: 0
  }

  componentDidMount() {
    getDecks()
      .then(data => {
        this.setState({
          decks: data.sort((a, b) =>
                  new Date(b.data.createdAt)
              - new Date(a.data.createdAt)),
          done: 1
        })
    });
  }

  componentWillMount(){
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      getDecks().then(data => {
        this.setState({
          decks: data.sort((a, b) =>
                  new Date(b.data.createdAt)
              - new Date(a.data.createdAt)),
        })
      });
    });
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Decks',
    headerStyle: {
      backgroundColor: '#292477',
    },
    headerTitleStyle: {
      color: '#fff',
      fontWeight: 'bold',
      justifyContent: 'center',
      textAlign: 'center',
      flexGrow:1,
      alignSelf:'center',
    },
  });

  renderDeck = ({item, index}) => {
    if(item.id === NOTIFICATION_KEY) {
      return (<View/>);
    }

    return (
      <View key={index} style={styles.viewDeckList}>
        <Text style={styles.deckHead} onPress={() => {
          this.props.navigation.navigate("DeckDetails",
              {"id": item.id});
          clearLocalNotification()
              .then(setLocalNotification())
        }}>
          {item.data.title}
        </Text>
         <Text style={styles.cardsNumber} onPress={() => this.props.navigation.navigate("DeckDetails",
            {"id": item.id})}>
           {item.data.questions.length} cards
        </Text>
      </View>
    );
  }

  render() {
    if (this.state.done === 1 &&
        this.state.decks.length === 0) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <Text style={[styles.deckHead, {marginVertical: '40%'}]}>
              No Decks
            </Text>
          </View>
        </ScrollView>
      );
    }
   return (
      <>
      {
        this.state.done === 1 ? (
          <ScrollView>
            <View style={styles.container}>
              <FlatList
                data={this.state.decks}
                extraData={this.state}
                renderItem={this.renderDeck}
                keyExtractor={(task) => task.id.toString()}
              />
            </View>
          </ScrollView>
        ) : (
          <View style={styles.container}>
            <ActivityIndicator size="large"
                               color="#7c53c3" />
            <Text style={styles.getDecks}>
              Getting Decks...
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
  getDecks: {
    fontSize: 20,
    color: "#4e4cb8",
  },
  viewDeckList: {
    backgroundColor: "#eff0f1",
    borderRadius: 20,
    marginVertical: 10,
    padding: 20,
  },
  cardsNumber: {
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
  deckHead: {
    fontSize: 30,
    textAlign: 'center',
  }
});
