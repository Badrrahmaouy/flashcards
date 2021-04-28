import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { gray, black, darkPurple, lightPurple, white} from "../utils/colors";

export default function SubmitBtn({ onPress, disab }) {
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
        Submit
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
})