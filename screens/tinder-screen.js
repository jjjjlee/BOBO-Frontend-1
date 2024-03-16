import React, { useState, useEffect, useRef, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import  { BottomBar } from '../components/tinder-components'
import Swipes from '../components/tinder-swipes'


const TinderScreen = ({route})=>{
  const uuid = route.params.uuid;
  const [currentIndex, setCurrentIndex] = useState(0);
  // Ref for button-pressed 
  const swipesRef = useRef(null);
  
  // Press handlers
  function handleLikePress() {
    swipesRef.current.swipeRight()
  }
  function handlePassPress() {
    swipesRef.current.swipeLeft()
  }

  return (
    <View style={styles.container} >
      <Swipes
        uuid = {uuid}
        swipesRef={swipesRef}
        currentIndex = {currentIndex}/>
      <BottomBar handleLikePress={handleLikePress} handlePassPress={handlePassPress} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  photo: {
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textPrimary: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
  textSecondary: {
    color: 'white',
    marginLeft: 10,
    fontSize: 25,
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.80)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  title_frame: {
    flexShrink: 0,
    width: 318,
    flexDirection: "row",
    alignItems: "flex-end",
    columnGap: 12
},
  title:{
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20
  },
  title_name:{
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "PingFang TC",
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: 1.6
  },
  title_age:{
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "PingFang TC",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1
  },
  detail_frame:{
    flexShrink: 0,
    alignItems: "flex-start",
    rowGap: 12
  },
  tags:{
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: 8
  },
  tag:{
    flexShrink: 0,
    backgroundColor: "rgba(255, 234, 218, 1)",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  tag_text:{
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(237, 116, 34, 1)",
    fontFamily: "PingFang TC",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.6
  },
  location:{
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4
  },
  loc_text:{
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "PingFang TC",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.7
  },
  description_frame:{
    flexShrink: 0,
    height: 17,
    width: 335,
    alignItems: "flex-start",
    rowGap: 0
  },
  description_text:{
    position: "absolute",
    flexShrink: 0,
    top: 0,
    right: 0,
    bottom: -3,
    left: 0,
    textAlign: "left",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "PingFang TC",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.7
  }

})

export default TinderScreen;