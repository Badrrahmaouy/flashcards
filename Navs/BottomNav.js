import React from 'react'
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../components/Home'
import AddDeck from '../components/AddDeck'
import { Feather } from '@expo/vector-icons'
import { darkPurple, white, lightPurple, black } from '../utils/colors'

const Tab = createBottomTabNavigator()

export default function BottomNav() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { backgroundColor: darkPurple },
        activeTintColor: white,
        inactiveTintColor: lightPurple,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          animationEnabled: true,
          tabBarIcon: ({ color }) => (
            <Feather name='home' color={color} size={25} />
          ),
        }}
        name='decklist'
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Add Deck',
          animationEnabled: true,
          tabBarIcon: ({ color }) => (
            <Feather name='folder-plus' color={color} size={24} />
          ),
        }}
        name='adddeck'
        component={AddDeck}
      />
    </Tab.Navigator>
  )
}