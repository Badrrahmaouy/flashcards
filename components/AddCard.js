import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  Switch,
  View,
  Platform,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import { handleAddCard } from '../actions/index'
import GoBack from './GoBack'
import SubmitBtn from './SubmitBtn'

class AddCard extends Component {
  state = {
    question: '',
    answer: true,
    deckId: '',
  }

  componentDidMount() {
    this.setState({
      deckId: this.props.deckId,
    })
  }

  inputChange = (value, name) => {
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = () => {
    const { question, answer, deckId } = this.state
    const newCard = { question, answer }

    this.props.addNewCard(deckId, newCard)
    this.cleanCardState()
  }

  cleanCardState = () => {
    setTimeout(() => {
      this.setState({
        question: '',
        answer: true,
      })
    }, 200)
  }

  render() {
    const { question } = this.state
    let disabled = question === ''
    const isEnabled = this.state.answer

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
        <GoBack onPress={() => this.props.navigation.goBack()} />
        <Text
          style={styles.pageTitle}
        >
          Card Question:
        </Text>
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            marginTop: 35,
          }}
        >
          <TextInput
            placeholder='Question:'
            value={this.state.question}
            onChangeText={(value) => this.inputChange(value, 'question')}
            style={styles.textInput}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              justifyContent: 'space-around',
              flex: 1,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={styles.incorrect}
              >
                Incorrect
              </Text>
              <Switch
                trackColor={{ true: '#a3d3cf', false: '#FF0000' }}
                thumbColor={[
                  Platform.OS == 'ios'
                    ? '#009688'
                    : isEnabled
                      ? '#009688'
                      : '#FF0000',
                ]}
                ios_backgroundColor='#fbfbfb'
                onValueChange={(value) => this.inputChange(value, 'answer')}
                value={this.state.answer}
                style={{ margin: 6 }}
              />

              <Text
                style={styles.correct}
              >
                Correct
              </Text>
            </View>
          </View>
          <View style={styles.submit}>
            <SubmitBtn onPress={() => this.handleSubmit()} disab={disabled} />
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
  pageTitle: {
    flex: 1,
    fontSize: 30,
    marginBottom: 30,
    marginTop: 30,
    textAlign: 'center',
  },
  textInput: {
    height: 50,
    width: 290,
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#ededed',
  },
  submit: {
    bottom: 260
  },
  backBtn: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  incorrect: {
    height: 29,
    borderWidth: 1,
    fontSize: 11,
    fontWeight: 'bold',
    padding: 8,
    borderColor: '#FF0000',
    color: '#FF0000',
    borderRadius: 3,
    marginTop: 7,
    marginRight: 4,
  },
  correct: {
    height: 29,
    borderWidth: 1,
    fontSize: 11,
    fontWeight: 'bold',
    padding: 8,
    borderColor: '#009688',
    color: '#009688',
    borderRadius: 3,
    marginTop: 7,
    marginLeft: 4,
  }
})

const mapStateToProps = (state, props) => {
  const { deckId } = props.route.params

  return {
    deckId
  }
}

const mapDispatchToProps = (dispatch) => ({
  addNewCard: (deckId, newCard) => dispatch(handleAddCard(deckId, newCard)),
  initialData: () => dispatch(handleInitialData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
