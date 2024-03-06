import React, { useState, useEffect } from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Icon } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TinderDetailScreen from '../screens/tinder-detail-screen';


// DUMMY DATA
const DUMMY_DATA1 = [
  {
   id:"1",
   name: "Joy",
   headimg : "http://192.168.1.100:8000/media/dogs/Jackrussel.jpg",
   age:"20",
   currentloc: "台北市中正區",
   species: "JackRussel",
   species_general:"狗",
   weight:"50",
   vaccined : "已注射疫苗",
   adoptdate:"2024-02-24",
   adoptloc: "台北市信義區",
   likecount : "13",
   date:"2024-02-16",
   description:"Hello",
   matching_status:"成功"
  },
  {
  id:"2",
  name: "Jason",
  headimg : "http://192.168.1.100:8000/media/dogs/images.jpg",
  age:"20",
  currentloc: "台北市中正區",
  species: "柴犬",
  species_general:"狗",
  weight:"50",
  vaccined : "已注射疫苗",
  adoptdate:"2024-02-24",
  adoptloc: "台北市信義區",
  likecount : "13",
  date:"2024-02-16",
  description:"Hello",
  matching_status:"審查中"
 },
 {
  id:"3",
  name: "Andrew",
  headimg : "http://192.168.1.100:8000/media/dogs/golden-retriever1_OzehIoc.jpg",
  age:"20",
  currentloc: "台北市中正區",
  species: "黃金獵犬",
  species_general:"狗",
  weight:"50",
  vaccined : "已注射疫苗",
  adoptdate:"2024-02-24",
  adoptloc: "台北市信義區",
  likecount : "13",
  date:"2024-02-16",
  description:"Hello",
  matching_status:"失敗"
 },
 {
  id:"4",
  name: "Gogoro",
  headimg : "http://192.168.1.100:8000/media/dogs/golden-retriever.jpg",
  age:"20",
  currentloc: "台北市中正區",
  species: "黃金獵犬",
  species_general:"狗",
  weight:"50",
  vaccined : "已注射疫苗",
  adoptdate:"2024-02-24",
  adoptloc: "台北市信義區",
  likecount : "13",
  date:"2024-02-16",
  description:"Hello",
  matching_status:"失敗"
 }
]

const DUMMY_DATA2 = [
  {
   id:"5",
   name: "Joy",
   headimg : "http://192.168.1.100:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
   age:"20",
   currentloc: "台北市中正區",
   species: "邊境牧羊犬",
   species_general:"貓",
   weight:"50",
   vaccined : "已注射疫苗",
   adoptdate:"2024-02-24",
   adoptloc: "台北市信義區",
   likecount : "13",
   date:"2024-02-16",
   description:"Hello",
   matching_status:"成功"
  },
  {
  id:"6",
  name: "Jason",
  headimg : "http://192.168.1.100:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
  age:"20",
  currentloc: "台北市中正區",
  species: "邊境牧羊犬",
  species_general:"狗",
  weight:"50",
  vaccined : "已注射疫苗",
  adoptdate:"2024-02-24",
  adoptloc: "台北市信義區",
  likecount : "13",
  date:"2024-02-16",
  description:"Hello",
  matching_status:"審查中"
 },
 {
  id:"7",
  name: "Andrew",
  headimg : "http://192.168.1.100:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
  age:"20",
  currentloc: "台北市中正區",
  species: "邊境牧羊犬",
  species_general:"狗",
  weight:"50",
  vaccined : "已注射疫苗",
  adoptdate:"2024-02-24",
  adoptloc: "台北市信義區",
  likecount : "13",
  date:"2024-02-16",
  description:"Hello",
  matching_status:"失敗"
 },
 {
  id:"8",
  name: "Gogoro",
  headimg : "http://192.168.1.100:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
  age:"20",
  currentloc: "台北市中正區",
  species: "邊境牧羊犬",
  species_general:"狗",
  weight:"50",
  vaccined : "已注射疫苗",
  adoptdate:"2024-02-24",
  adoptloc: "台北市信義區",
  likecount : "13",
  date:"2024-02-16",
  description:"Hello",
  matching_status:"失敗"
 }
]


const Swipes = ({currentIndex,swipesRef})=>{
    [modalVisible,setModalVisible] = useState(false);
    [Data, setData] = useState(DUMMY_DATA1);
    [tapData, setTapData] = useState(Data[0]);
    [newCard, setNewCard] = useState({});
    [key, setKey] = useState(0);
    const safecard = {     
      id:"0",
      name: "我是志工狗狗",
      headimg : "http://192.168.1.100:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
      age:"1",
      currentloc: "汪汪星球",
      species: "邊境牧羊犬",
      species_general:"狗",
      weight:"50",
      vaccined : "已注射疫苗",
      adoptdate:"2024-03-04",
      adoptloc: "福爾摩沙島",
      likecount : "13",
      date:"2024-02-16",
      description:"快去主頁面認識更多我的朋友吧",
      matching_status:""
    }

    // Fethcing data
    const fetchData = async () =>{
      fetch("....",{
        method:"GET",
      }).then(res=>{return(res.json());
      }).then(res=>{setData(res);
      }).catch(err=>{console.log(err);})
    }

    // Functions
    const saveLikeCard = async()=>{
      AsyncStorage.getItem("LikeCards")
                  .then(res=>{
                    const arr = res? JSON.parse(res) : [];
                    arr.push(newCard);
                    AsyncStorage.setItem("LikeCards",JSON.stringify(arr));
                  })
    }
    
    const handleRightSwipe = (idx)=>{
      setNewCard(Data[idx]);
      saveLikeCard();
    }

    const handleSwipeAll = ()=>{
      //fetchData();
      setData(DUMMY_DATA2)
      setKey(key+0.01);
    }

    const handleOnTap = (idx)=>{
      setTapData(Data[idx]);
      setModalVisible(true);
    }
    // UseEffect
    useEffect(()=>{
      setNewCard(safecard);
      saveLikeCard();
      console.log("A card is saved")
    },[])
    
    return(
        <View style={styles.swipes}>
            <Swiper
            key={key}
            ref={swipesRef}
            cards={Data}
            renderCard={(card) => {
                return (
                    <View style = {styles.card}>
                        <Image source={{ uri: card.headimg }} style={styles.photo} />
                        <View style={styles.textContainer}>
                            <View style={styles.title_frame}>
                                <View style={styles.title}>
                                        <Text style={styles.title_name}>{card.name}</Text>
                                        <Text style={styles.title_age}>{card.age}</Text>
                                </View>
                            </View>

                            <View style={styles.detail_frame}>
                                <View style={styles.tags}>
                                    <View style={styles.tag}>
                                        <Text style={styles.tag_text}>{card.species}</Text>
                                    </View>
                                    <View style={styles.tag}>
                                        <Text style={styles.tag_text}>{card.weight}</Text>
                                    </View>
                                    <View style={styles.tag}>
                                        <Text style={styles.tag_text}>{card.vaccined}</Text>
                                    </View>
                                </View>
                                <View style = {styles.location}>
                                    <Icon name='location' type='ionicon' color='white'/>
                                    <Text style={styles.loc_text}>{card.currentloc}</Text>
                                </View>
                            </View>

                            <View style={styles.description_frame}>
                                <Text style={styles.description_text}>{card.description.substring(0,22)}...</Text>
                            </View>
                        </View>
                    </View>
                )
            }}
            onSwipedRight={(cardIndex)=>{
              handleRightSwipe(cardIndex);
            }}
            onSwiped={(cardIndex) => {console.log("Swiped")}}
            onSwipedAll={()=>{
              handleSwipeAll();
            }}
            onTapCard={(cardIndex)=>{
              handleOnTap(cardIndex); 
            }}
            cardIndex={currentIndex}
            backgroundColor={'white'}
            stackSize= {3}>
            </Swiper>
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <TinderDetailScreen headimg={tapData.headimg} species={tapData.species} weight={tapData.weight}
                    vaccined={tapData.vaccined} adoptloc={tapData.adoptloc} description={tapData.description} name = {tapData.name} age = {tapData.age} matching_status={tapData.matching_status}/>
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
