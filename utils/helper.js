import {AsyncStorage} from 'react-native';
import {  Notifications } from "expo";
import * as Permissions from 'expo-permissions';

export const NOTIFICATION_KEY = 'FlashCard:notifications'

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export async function getDecks () {
  const all = await AsyncStorage.getAllKeys()
  const res = await AsyncStorage.multiGet(all)
  return res.map(req => {
    return {
      id: req[0],
      data: JSON.parse(req[1])
    }
  })
}

export async function getDeck (key) {
  try {
    const currentDeck = await AsyncStorage.getItem(key);
    return JSON.parse(currentDeck)
  } catch (error) {
    alert('Error retrieving data in get Deck')
  }
}

export async function  saveDeckTitle (title){
  try {
    let Deck = {
      title,
      createdAt: new Date(),
      questions: []
    }
    let deckKey = title + generateUID()
    await AsyncStorage.setItem(deckKey, JSON.stringify(Deck));
    return deckKey;
  } catch (error) {
    alert('error in save Deck')
    return null;
  }
}

export async function addCardToDeck (key, newDeck) {
  try {
    const currentDeck = JSON.parse(await AsyncStorage.getItem(key));
    currentDeck.questions.push(newDeck)
    await AsyncStorage.setItem(key, JSON.stringify(currentDeck));
  } catch (error) {
    alert('Error retrieving data in Add Card To Deck')
  }
}


export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createLocalNotification() {
  return {
    title: 'Study today',
    body: 'don\'t forget to remember your decks',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if(data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
              .then(({ status }) => {
                if(status === 'granted') {
                  Notifications.cancelAllScheduledNotificationsAsync()

                  let tomorrow = new Date()
                  tomorrow.setDate(tomorrow.getDate() + 1)
                  tomorrow.setHours(20)
                  tomorrow.setMinutes(20)

                  Notifications.scheduleLocalNotificationAsync(
                      createLocalNotification(),
                      {
                        time: tomorrow,
                        repeat: 'day'
                      }
                  )

                  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
              })
        }
      })
}
