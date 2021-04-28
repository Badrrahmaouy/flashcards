import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";

export default function GoBack({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.backBtn}
      onPress={onPress}
    >
      <FontAwesome name='arrow-left' size={30} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  backBtn: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
  }
})