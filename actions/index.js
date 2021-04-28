import { 
  addDeck,
  addCard,
  deleteDeck,
  getInitialData
 } from "../utils/api"

export const ADD_DECK = "ADD_DECK"
export const ADD_CARD = "ADD_CARD"
export const DELETE_DECK = "DELETE_DECK"
export const INITIAL_DATA = "INITIAL_DATA"

export const handleAddDeck = (deck) => dispatch => {
  addDeck(deck)
    .then(() => { dispatch({
      type: ADD_DECK,
      deck
    })
  }).catch(err => console.log(err))
}

export const handleDeleteDeck = (deckId) => dispatch => {
  deleteDeck(deckId)
    .then(() => { dispatch({
      type: DELETE_DECK,
      deckId
    })
  }).catch(err => console.log(err))
}

export const handleAddCard = (deckId, card) => dispatch => {
  addCard(deckId, card)
    .then(() => { dispatch({
      type: ADD_CARD,
      deckId,
      card
    })
  }).catch(err => console.log(err))
}

export const handleInitialData = () => dispatch => {
  getInitialData()
    .then(allDecks => { dispatch({
      type: INITIAL_DATA,
      allDecks
    })
  })
}