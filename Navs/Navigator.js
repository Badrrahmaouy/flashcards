import BottomNav from './BottomNav'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import DeckInfo from '../components/DeckInfo'
import AddCard from '../components/AddCard'
import Quiz from '../components/Quiz'

const Stack = createStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='home'
          component={BottomNav}
          options={{
            animationEnabled: true,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='deckDetails'
          component={DeckInfo}
          options={{
            animationEnabled: true,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='quiz'
          component={Quiz}
          options={{
            animationEnabled: true,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='addcard'
          component={AddCard}
          options={{
            animationEnabled: true,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
