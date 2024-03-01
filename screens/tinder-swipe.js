import React, { useState } from 'react'
import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Icon } from "react-native-elements";
import TinderDetailScreen from './tinder-detail-screen';

const Swipes = ({key,dogs,currentIndex,swipesRef,onSwipedAll})=>{
    [modalVisible,setModalVisible] = useState(false);
    [Data, setData] = useState(dogs);
    [tapData, setTapData] = useState(Data[0]);
    return(
        <View style={styles.swipes}>
            <Swiper
            key={key}
            ref={swipesRef}
            cards={dogs}
            renderCard={(card) => {
                return (
                    <View style = {styles.card}>
                        <Image source={{ uri: card.picture.large }} style={styles.photo} />
                        <View style={styles.textContainer}>
                            <View style={styles.title_frame}>
                                <View style={styles.title}>
                                        <Text style={styles.title_name}>{card.name.last}</Text>
                                        <Text style={styles.title_age}>{card.dob.age}</Text>
                                </View>
                            </View>

                            <View style={styles.detail_frame}>
                                <View style={styles.tags}>
                                    <View style={styles.tag}>
                                        <Text style={styles.tag_text}>{card.tag.species}</Text>
                                    </View>
                                    <View style={styles.tag}>
                                        <Text style={styles.tag_text}>{card.tag.weight}</Text>
                                    </View>
                                    <View style={styles.tag}>
                                        <Text style={styles.tag_text}>{card.tag.vaccined}</Text>
                                    </View>
                                </View>
                                <View style = {styles.location}>
                                    <Icon name='location' type='ionicon' color='white'/>
                                    <Text style={styles.loc_text}>{card.location.city}</Text>
                                </View>
                            </View>

                            <View style={styles.description_frame}>
                                <Text style={styles.description_text}>{card.description.substring(0,22)}...</Text>
                            </View>
                        </View>
                    </View>
                )
            }}
            onSwiped={(cardIndex) => {}}
            onSwipedAll={onSwipedAll}
            cardIndex={currentIndex}
            backgroundColor={'white'}
            stackSize= {3}
            onTapCard={(cardIndex)=>{
                setTapData(Data[cardIndex])
                console.log(tapData)
                setModalVisible(true)
            }}>
            </Swiper>
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <TinderDetailScreen headimg={tapData.picture.large} species={tapData.tag.species} weight={tapData.tag.weight}
                    vaccined={tapData.tag.vaccined} adoptloc={tapData.location.city} description={tapData.description} name = {tapData.name.last} age = {tapData.dob.age}/>
                <TouchableOpacity style = {styles.goback_frame} onPress={()=>setModalVisible(false)}><Text style={styles.goback_text}>返回 &gt;</Text></TouchableOpacity> 
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    swipes: {
      flex: 1,
      padding: 5,
      paddingTop: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
    container: {
      flex: 1,
      backgroundColor: "#F5FCFF"
    },
    card: {
      height:"75%", 
      marginTop:-30
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
    },
    goback_frame:{
      position:"absolute", 
      top:55, 
      right:5,
    },
    goback_text:{
        color: "#808080",
        fontFamily: "PingFang TC",
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 0
    }
  
  });

export default React.forwardRef((props,ref)=><Swipes swipesRef = {ref} {...props}/>);
