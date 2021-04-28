import AsyncStorage from '@react-native-async-storage/async-storage'
import { FLASH_STORAGE_KEY } from './helpers'

export function addDeck(deck) {
  return AsyncStorage.mergeItem(FLASH_STORAGE_KEY, JSON.stringify({
    [deck.deckId]: deck 
  })).catch(err => console.log('error adding deck: ', err))
}


export function addCard(deckId, card) {
  return AsyncStorage.getItem(FLASH_STORAGE_KEY)
    .then((results => {
      let parseDecks = JSON.parse(results)
      let allDecks = parseDecks
      allDecks[deckId].cards.push(card)
      return AsyncStorage.mergeItem(FLASH_STORAGE_KEY, JSON.stringify(allDecks))
    }))
}

export function deleteDeck(deckId) {
  return AsyncStorage.getItem(FLASH_STORAGE_KEY)
    .then((results => {
      const data = JSON.parse(results)
      data[deckId] = undefined
      delete data[deckId]
      AsyncStorage.mergeItem(FLASH_STORAGE_KEY, JSON.stringify(data))
    }))
}


export function clearAll() {
  return AsyncStorage.clear()
}

export function getInitialData() {
  return AsyncStorage.getItem(FLASH_STORAGE_KEY)
    .then(results => {
      return JSON.parse(results)
    })
}