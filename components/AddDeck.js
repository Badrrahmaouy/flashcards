import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native'
import { getRandomIntNum } from '../utils/helpers'
import { connect } from 'react-redux'
import { handleAddDeck, handleInitialData } from '../actions/index'
import GoBack from './GoBack'
import SubmitBtn from './SubmitBtn'
import { addDeck } from '../utils/api'

class AddDeck extends Component {
  state = {
    deck: {
      deckId: '',
      deckTitle: '',
      cards: [],
    },
  }

  inputChange = (value) => {
    this.setState((state) => ({
      ...state,
      deck: {
        ...state.deck,
        deckTitle: value,
      },
    }))
  }

  handleSubmit = () => {
    const deckId = this.state.deck.deckTitle + getRandomIntNum()

    this.setState((state) => ({
        deck: {
          ...state.deck,
          deckId,
        },
      }),
      () => {
        const newDeck = { ...this.state.deck }
        this.props.addNewDeck(newDeck)
        this.reset()
        this.props.navigation.goBack()
      }
    )

    //update LocalStorage
    addDeck(newDeck)
  }

  reset = () => (
    this.setState((state) => ({
      ...state,
      deck: {
        ...state.deck,
        deckId: '',
        deckTitle: ''
      }
    }))
  )

  render() {
    const { deckTitle } = this.state.deck

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='heigth'>
        <GoBack onPress={() => this.props.navigation.goBack()} />
        <View style={{ flex: 1 }}>
          <Text
            style={styles.title}
          >
            Add Deck
          </Text>
          <View>
            <TextInput
              placeholder='insert deck title'
              value={deckTitle}
              onChangeText={(value) => this.inputChange(value)}
              style={styles.textInput}
            />
            <SubmitBtn
              onPress={() => this.handleSubmit()}
              disab={deckTitle === '' ? true : false}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 50,
    width: 290,
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#ededed',
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 30,
    marginBottom: 30,
  }
})

const mapDispatchToProps = (dispatch) => ({
  addNewDeck: (deck) => dispatch(handleAddDeck(deck)),
  initialData: () => dispatch(handleInitialData()),
})

export default connect(null, mapDispatchToProps)(AddDeck)