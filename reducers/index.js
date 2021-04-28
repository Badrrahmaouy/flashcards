import { 
  ADD_DECK, 
  ADD_CARD, 
  INITIAL_DATA, 
  DELETE_DECK } from '../actions'

const initialState = {
  allDecks: []
}

export default function cards(state = initialState, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        allDecks: {
          ...state.allDecks,
          [action.deck.deckId]: action.deck
        }
      }

    case ADD_CARD:
      return {
        ...state,
        allDecks: {
          ...state.allDecks,
          [action.deckId]: {
            ...state.allDecks[action.deckId],
            cards: state.allDecks[action.deckId].cards.concat(action.card)
          }

        }

      }
    case DELETE_DECK:
      const { allDecks } = state
      const { deckId } = action
      const deckFiltered = allDecks.filter(deck => deckId !== deck.id)

      return {
        ...state,
        allDecks: {
          ...deckFiltered
        }
      }
    case INITIAL_DATA:
      return {
        ...state,
        ...action,
        'loading': false
      }
    default:
      return state
  }
}