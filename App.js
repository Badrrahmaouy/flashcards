import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import { darkPurple, gray, white } from './utils/colors'
import Constants from "expo-constants"
import Home from './components/Home'
import AddDeck from './components/AddDeck'
import BottomNav from './Navs/BottomNav'
import AddCard from './components/AddCard'
import DeckInfo from './components/DeckInfo'
import Main from './components/Main'

function FstatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
export default class App extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <FstatusBar backgroundColor={gray} barStyle='dark-content' />
        <View style={styles.container}>
          <Main />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
