import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native'
import { getRandomIntNum } from '../utils/helpers'
import { connect } from 'react-redux'
import { handleAddDeck, handleInitialData } from '../actions/index'
import { black, darkPurple, lightPurple, white, gray } from '../utils/colors'
import { FontAwesome } from '@expo/vector-icons'
import { addDeck } from '../utils/api'

function SubmitBtn({ onPress, disab }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disab}
      style={
        disab === true
          ? [styles.submitBtn, styles.submitBtnDisabled]
          : styles.submitBtn
      }
    >
      <Text
        style={
          disab === true
            ? [styles.submitTxt, styles.submitTxtDisabled]
            : styles.submitTxt
        }
      >
        Add Deck
      </Text>
    </TouchableOpacity>
  )
}

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

    this.setState(
      (state) => ({
        deck: {
          ...state.deck,
          deckId,
        },
      }),
      () => {
        const newDeck = { ...this.state.deck }
        this.props.addNewDeck(newDeck)
        this.props.navigation.goBack()
      }
    )

    //update LocalStorage
    addDeck(this.state.deck)
  }

  render() {
    const { deckTitle } = this.state

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='heigth'>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => this.props.navigation.goBack()}
        >
          <FontAwesome name='arrow-left' size={30} />
        </TouchableOpacity>
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
  submitBtn: {
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: black,
    backgroundColor: darkPurple,
    borderRadius: 5,
    width: 92,
    alignSelf: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: black,
  },
  submitBtnDisabled: {
    backgroundColor: lightPurple,
  },

  submitTxt: {
    color: white,
  },
  submitTxtDisabled: {
    color: gray,
  },

  backBtn: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
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