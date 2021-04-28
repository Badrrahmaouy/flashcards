import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    const Decks = this.props.allDecks

    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>
          {Decks ? 'Your Decks' : "You don't have any decks"}{' '}
        </Text>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
        >
          {Decks
            ? Object.keys(Decks).map((deck) => (
                <View key={Decks[deck].deckId}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('deckDetails', {
                        deck: Decks[deck],
                      })
                    }
                    style={styles.deck}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}
                    >
                      {Decks[deck].deckTitle}
                    </Text>
                    <Text style={{ textAlign: 'center' }}>
                      {Decks[deck].cards.length} Cards.
                    </Text>
                  </TouchableOpacity>
                </View>
            )) : null
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deck: {
    paddingBottom: 40,
    paddingTop: 40,
    width: 300,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#000',
  },
  pageTitle: {
    textAlign: 'center',
    marginTop: 35,
    marginBottom: 25,
    fontSize: 26,
    fontWeight: 'bold',
  },
})

function mapStateToProps(state, props) {
  const { allDecks } = state
  if (!props.route.params) {
    return {
      allDecks,
    }
  } else {
    const { deckId } = props.route.params
    
    return {
      allDecks,
      deckId,
    }
  }
}

export default connect(mapStateToProps)(Home)