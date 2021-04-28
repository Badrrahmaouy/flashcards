import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { connect } from 'react-redux'
import { red, lightRed, lightGreen, darkGray } from '../utils/colors'
import GoBack from './GoBack'

// here you can change the default texts for Quiz page
const showAnswer = 'Show Answer'
const hideAnswer = 'Hide Answer'
const Correct = 'Correct'
const Incorrect = 'Incorrect'
const Back = 'Go Back'
const mRestart = 'Restart'

function QuizzBtn({ onPress, Texto, style }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{Texto}</Text>
    </TouchableOpacity>
  )
}

class Quiz extends Component {
  state = {
    count: 0,
    totalCorrect: 0,
    showAnswer: false,
  }

  handleAnswer = (answer) => {
    switch (answer) {
      case mRestart:
        return this.setState({ count: 0, totalCorrect: 0 })
        break
      case showAnswer:
        return this.setState({ showAnswer: true })
        break
      case hideAnswer:
        return this.setState({ showAnswer: false })
        break
      default:
        const { deckCards } = this.props
        const { count } = this.state
        const savedAnswer = deckCards[count].answer
        const userAnswer = savedAnswer === answer
        return this.handleQuiz(userAnswer)
    }
  }

  handleQuiz = (userAnswer) =>
    this.setState({
      count: this.state.count + 1,
      totalCorrect: userAnswer
        ? this.state.totalCorrect + 1
        : this.state.totalCorrect,
      showAnswer: false,
    })

  showCorrectAnswer = () => (
    <Text style={[styles.answerSpoiled, { color: lightGreen }]}>{Correct}</Text>
  )
  showIncorrectAnswer = () => (
    <Text style={[styles.answerSpoiled, { color: lightRed }]}>{Incorrect}</Text>
  )

  //Quiz Render
  quizRender = () => {
    const { deckCards } = this.props
    const { count } = this.state

    return (
      <View>
        <Text
          style={styles.counter}
        >
          ({count + 1} / {deckCards.length})
        </Text>
        <Text style={styles.question}>{deckCards[count].question}</Text>
        {this.state.showAnswer
          ? deckCards[count].answer
            ? this.showCorrectAnswer()
            : this.showIncorrectAnswer()
          : null}

        {this.state.showAnswer ? (
          <QuizzBtn
            Texto={hideAnswer}
            style={styles.hideAnswer}
            onPress={() => this.handleAnswer(hideAnswer)}
          />
        ) : (
          <QuizzBtn
            Texto={showAnswer}
            style={styles.showAnswer}
            onPress={() => this.handleAnswer(showAnswer)}
          />
        )}
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <QuizzBtn
            Texto={Correct}
            style={styles.correct}
            onPress={() => this.handleAnswer(true)}
          />
          <QuizzBtn
            Texto={Incorrect}
            style={styles.incorrect}
            onPress={() => this.handleAnswer(false)}
          />
        </View>
      </View>
    )
  }
  //Results Render
  resultsRender = () => {
    const { count, totalCorrect } = this.state
    return (
      <View>
        <Text style={[styles.question, { marginTop: 65 }]}>The End!</Text>
        <View
          style={styles.dashboard}
        >
          <Text styles={{ fontSize: 19 }}>You answered correctly: </Text>
          <Text style={{ textAlign: 'center', fontSize: 19 }}>
            {' '}
            <Text style={styles.resultNum}>{totalCorrect}</Text> out of{' '}
            <Text style={styles.resultNum}>{count}</Text>
          </Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <QuizzBtn
            Texto={mRestart}
            style={styles.mRestart}
            onPress={() => this.handleAnswer(mRestart)}
          />
          <QuizzBtn
            Texto={Back}
            style={styles.goBack}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    )
  }

  // React Component Class Quiz Render here:
  render() {
    const { deckId, deckTitle, deckCards, deck } = this.props
    const { QuizProcessing, quizNum } = this.state
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <GoBack onPress={() => this.props.navigation.goBack()} />

          <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
            {this.state.count < deckCards.length
              ? this.quizRender()
              : this.resultsRender()}
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  counter: {
    textAlign: 'center',
    fontSize: 18,
    color: darkGray,
    marginTop: 39,
  },
  container: {
    flex: 1,
  },
  backBtn: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
  },
  question: {
    textAlign: 'center',
    marginTop: 6,
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 10,
  },
  /**Button styles**/
  showAnswer: {
    color: red,
    textDecorationLine: 'underline',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  hideAnswer: {
    color: red,
    textDecorationLine: 'line-through',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  answerSpoiled: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  correct: {
    color: lightGreen,
    fontSize: 30,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    paddingTop: 35,
    paddingBottom: 35,
    paddingRight: 20,
    paddingLeft: 20,
    marginRight: 8,
  },
  incorrect: {
    color: lightRed,
    fontSize: 30,
    borderWidth: 1,
    padding: 4,
    marginLeft: 2,
    borderRadius: 5,
    textAlign: 'center',
    paddingTop: 35,
    paddingBottom: 35,
    paddingRight: 20,
    paddingLeft: 20,
    marginLeft: 8,
  },
  dashboard: {
    borderWidth: 1,
    borderColor: darkGray,
    padding: 8,
    borderRadius: 2,
    borderStyle: 'dashed',
    marginTop: 10,
  },
  goBack: {
    color: red,
    fontSize: 30,
    marginTop: 30,
    borderWidth: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 3,
  },
  mRestart: {
    color: red,
    fontSize: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  resultNum: {
    fontSize: 21,
    fontWeight: 'bold',
  },
})

function mapStateToProps(state, props) {
  const { deckId } = props.route.params
  const deck = state.allDecks[deckId]

  return {
    deck: deck,
    deckTitle: deck.deckTitle,
    deckCards: deck.cards,
    deckId: deckId,
  }
}

export default connect(mapStateToProps)(Quiz)
