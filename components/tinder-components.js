import { React, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export const BottomBar = ({ handleLikePress, handlePassPress })=> {
    return (
      <View style={styles.bottom_container}>
        <View />
        <TouchableOpacity style={styles.button} onPress={handlePassPress}>
          <FontAwesome name="times" size={40} color="black"></FontAwesome>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLikePress}>
          <FontAwesome name="heart" size={40} color="#ED7422" ></FontAwesome>
        </TouchableOpacity>
        <View />
      </View>
    )
  }

const styles = StyleSheet.create({
    bottom_container: {
      height: "15%",
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    button: {
      width: 60,
      height: 60,
      backgroundColor: 'white',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 6.46,
      elevation: 9,
    },
  })

