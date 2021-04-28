import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import { darkPurple } from './utils/colors'
import Constants from "expo-constants"
import Main from './components/Main'
import { setLocalNotification } from "./utils/helpers"

function FstatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <FstatusBar backgroundColor={darkPurple} barStyle='light-content' />
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
