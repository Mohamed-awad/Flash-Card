import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddDeckScreen from '../screens/AddDeckScreen';
import DeckDetails from '../screens/DeckDetailsScreen';
import AddCard from '../screens/AddCardScreen';
import QuizScreen from '../screens/QuizScreen';
import EndQuizScreen from '../screens/EndQuizScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    DeckDetails,
    AddCard,
    Quiz: QuizScreen,
    EndQuiz: EndQuizScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'DECKS',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list-box${focused ? '' : '-outline'}`
          : 'md-list-box'
      }
    />
  ),
};

HomeStack.path = '';

const addDeckStack = createStackNavigator(
  {
    addDeck: AddDeckScreen,
  },
  config
);

addDeckStack.navigationOptions = {
  tabBarLabel: 'ADD DECK',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'} />
  ),
};

addDeckStack.path = '';


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  addDeckStack,
});

tabNavigator.path = '';

export default tabNavigator;
