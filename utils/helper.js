import {AsyncStorage} from 'react-native';

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
    await AsyncStorage.setItem(title + generateUID(), JSON.stringify(Deck));
  } catch (error) {
    alert('error in save Deck')
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
