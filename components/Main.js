import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/index'
import Navigator from '../Navs/Navigator'

class Main extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.props.initialData()

    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 350)
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading === true ? null : <Navigator />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapDispatchToProps = (dispatch) => ({
  initialData: () => dispatch(handleInitialData()),
})

export default connect(null, mapDispatchToProps)(Main)