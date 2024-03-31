import React, { useState, useEffect, useCallback } from 'react'
import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Icon } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TinderDetailScreen from '../screens/tinder-detail-screen';
import { useNavigation } from '@react-navigation/native';

// DUMMY DATA
const DUMMY_DATA1 =  [
  {
      "id": 1,
      "pet": {
          "uuid": "123",
          "species": "熱心的狗狗",
          "species_general": "狗",
          "name": "唉呦!滑光啦",
          "age": 1,
          "weight": 60.0,
          "vaccined": true,
          "currentloc": "汪汪星球",
          "description": "看來要去汪汪星球招募更多夥伴了",
          "headimg": "https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/11234.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240330%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240330T150853Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=a7187daa9882f3461617b5e29db715eb33a3325a1ad41ac39c09b27fb7a90576031c0f7e481b4c5fa6f814a8afcc8f80e313305c4624135b797909120ff3ef390c7b6c11d339741f8344e9d15c88eb3aa937907a5c1072734a246d1e9cd20c4cff79da9d4e89607c9d7e0f8c6d3cc53b8b38c5d260c6cb7c52772f97f85342c870e4fd814312f09d78b16c62ec89337bfce4fd845878315006a7696a88a469a73dbf2a3519cf326046d5e92371cd2888335bb73617d6115d9f93dca0cfc23e50f71702c297c2ff2c722ff87b278c5046d6e1d32892396cf77edabb0f0c21587db8b6d051e6dfd38a392e0914c73b06dff137ee7438a925b41abe2e990100172c",
          "updated_at": "2024-0202",
          "institution": "123"
      },
      "updated_at": "2024-03-02 14:30:08",
      "status": "機構審查拒絕"
  }

]




const Swipes = ({currentIndex,swipesRef,uuid})=>{
    const navigation = useNavigation();
    let isEmptyDeck = true;
    [modalVisible,setModalVisible] = useState(false);
    [Data, setData] = useState(DUMMY_DATA1);
    [tapData, setTapData] = useState(DUMMY_DATA1[0]);
    [key, setKey] = useState(0);

    let api = "https://lively-nimbus-415015.de.r.appspot.com/api/pet_tinder/get/1/" +  uuid + "/"
    const safecard =   {
      "id": 3141592654,
      "pet": {
          "uuid": "d8fdc36a-9d33-4e4e-a338-5f426482ebbe",
          "species": "熱心的狗狗",
          "species_general": "",
          "name": "我是志工狗狗",
          "age": 1,
          "weight": 60.0,
          "vaccined": true,
          "currentloc": "汪汪星球",
          "description": "快去認識更多我的夥伴吧",
          "headimg": "https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/11234.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240330%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240330T150125Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=c31690f0f1eed08c77779880a91034df6b7b305457c0c99b89e9f32b6e01e010dc0cfda9398deff90679212cdcc57bfa36a356b5543af35ed694b5687fce505925784db890f63f176868800c900d010970b34ef20d6bd075e378d4e53cf7aae014d34556dc43c1bec783213f275b9fd4bd4bc86ec1a158593f477f39383fe9e953f2005424259fa753c9f9da12155c6b16d29294367820547736bacbaf8335c7bd447409ca2aa5b66d6a80d5c1a7d4ecbe216f56574c747fb04cad6dd17ea438476e32d3562d0564b08f4ea5aee43eda4b0e0db9f12ab74d51a9ec5d47e16b1d3f22b1cd919dfd27d014f91aea85cdecb2389b675583897b65c5502424d3f754",
      },
      "status": ""
  }
    

    // Fethcing data
    const fetchData = async ()=>{
      try{
        const response  = await fetch(api,{method:"GET"});
        if(response.ok){
          console.log("Now Start fetching");
          const data = await response.json();
          console.log("Data is set");
          if(data.results.length === 0 ){
            console.log("No availabel cards");
            isEmptyDeck = true;
          }else{
            isEmptyDeck = false;
            setData(data.results);
            setTapData(data.results[0]);
          }
          api = data.next;
        }else{
          console.log("Has http error when getting tinder cards");
        }
        
      }catch(err){
        console.log("Error when fetching Tinder card : "+err)
      }
      
    }

    // Functions
    const saveLikeCard = async(idx)=>{    
      if(idx === null){
        AsyncStorage.getItem("LikeCards")
        .then(res=>{
          const arr = res? JSON.parse(res) : [];
          if(arr.length === 0){
            arr.push(safecard)
          }
          AsyncStorage.setItem("LikeCards",JSON.stringify(arr));
        })
      }else if(idx<Data.length-1){
        AsyncStorage.getItem("LikeCards")
        .then(res=>{
          const arr = res? JSON.parse(res) : [];
          if(! containsObject(Data[idx],arr) & !isEmptyDeck){
            arr.push(Data[idx]);
            AsyncStorage.setItem("LikeCards",JSON.stringify(arr));
          }
        })
      }
    }
    
    const handleRightSwipe = async (idx)=>{
      saveLikeCard(idx);
    }

    const handleSwipeAll = async()=>{
      if(!isEmptyDeck){
        //fetchData();
      AsyncStorage.getItem("LikeCards")
      .then(res=>{
        const arr = res? JSON.parse(res) : [];
        if(!containsObject(Data[Data.length-1],arr)){
          arr.push(Data[Data.length-1]);
          AsyncStorage.setItem("LikeCards",JSON.stringify(arr));
          // The setData here is to avoid render error before the fetching is done.
          setData(DUMMY_DATA1);
          // Triggering reender and fetching data
          setKey(key+0.01);
        }else{
          // The setData here is to avoid render error before the fetching is done.
          setData(DUMMY_DATA1);
          // Triggering reender and fetching data
          setKey(key+0.01);
        }
      })
      }else{
        setData(DUMMY_DATA1);
        setKey(key+0.01);
      }

    }

    const handleOnTap = (idx)=>{
      setTapData(Data[idx]);
      setModalVisible(true);
    }

    const containsObject=(obj, list)=>{
      var i;
      for (i = 0; i < list.length; i++) {

          if (list[i].pet.uuid === obj.pet.uuid) {
              return true;
          }
      }
      return false;
  }
    // UseEffect
    useEffect(()=>{
      // First save safecard
      saveLikeCard(null);
      console.log("Safe card is saved")
      // Then fetch the tinder card api
      fetchData();
    },[key])

    // handleAdoption button
    const handleAdoption = ()=>{
      if(tapData.status !== "機構審查拒絕" & tapData.status !=="機構審查(中)" & tapData.status !=="機構審查批准"){
        setModalVisible(false);
        navigation.navigate("Adoptformik");
      }
    };

    return(
        <View style={styles.swipes}>
            <Swiper
            key={key}
            ref={swipesRef}
            cards={Data}
            renderCard={(card) => {
                return (
                    <View style = {styles.card}>
                        <Image source={{ uri: card.pet.headimg }} style={styles.photo} />
                        <View style={styles.textContainer}>
                            <View style={styles.title_frame}>
                                <View style={styles.title}>
                                        <Text style={styles.title_name}>{card.pet.name}</Text>
                                        <Text style={styles.title_age}>{card.pet.age}歲</Text>
                                </View>
                            </View>

                            <View style={styles.detail_frame}>
                                <View style={styles.tags}>
                                    <View style={styles.tag}>
                                        <Text style={styles.tag_text}>{card.pet.species}</Text>
                                    </View>
                                    <View style={styles.tag}>
                                        <Text style={styles.tag_text}>{card.pet.weight}</Text>
                                    </View>
                                    <View style={styles.tag}>
                                        <Text style={styles.tag_text}>{card.pet.vaccined?"已注射疫苗":"未注射疫苗"}</Text>
                                    </View>
                                </View>
                                <View style = {styles.location}>
                                    <Icon name='location' type='ionicon' color='white'/>
                                    <Text style={styles.loc_text}>{card.pet.currentloc}</Text>
                                </View>
                            </View>

                            <View style={styles.description_frame}>
                                <Text style={styles.description_text}>{card.pet.description.substring(0,22)}...</Text>
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
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <TinderDetailScreen headimg={tapData.pet.headimg} species={tapData.pet.species} weight={tapData.pet.weight}
                    vaccined={tapData.pet.vaccined} adoptloc={tapData.pet.currentloc} description={tapData.pet.description} name = {tapData.pet.name} age = {tapData.pet.age}  />
                <TouchableOpacity style = {styles.goback_frame} onPress={()=>setModalVisible(false)}><Text style={styles.goback_text}>返回 &gt;</Text></TouchableOpacity> 
                <View style = {styles.action}>
                  <TouchableOpacity  style={styles.adopt_button} onPress={handleAdoption} ><Text style={styles.adopt_button_text}>{tapData.status === '機構審查批准'? "確定認養" : tapData.status === '機構審查拒絕'? "機構拒絕" : tapData.status === '機構審查(中)'? "審查中": "我要認養"}</Text></TouchableOpacity>
                </View>  
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
      right:5
    },
    goback_text:{
        color: "#808080",
        fontFamily: "PingFang TC",
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 0
    },
    adopt_button_text: {
      flexShrink: 0,
      textAlign: "left",
      color: "rgba(255, 255, 255, 1)",
      fontFamily: "PingFang TC",
      fontSize: 20,
      fontWeight: "600",
      letterSpacing: 1
  },
  adopt_button:{
      flexShrink: 0,
      backgroundColor: "rgba(237, 116, 34, 1)",
      shadowRadius: 16,
      shadowColor: "rgb(0, 0, 0)",
      shadowOpacity: 0.25,
      flexDirection: "row",
      alignItems: "center",
      columnGap: 10,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 40
  },
  action:{
    position: "absolute",
    bottom: 32,
    left: "35%",
    
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: 21
}
  
  });

export default React.forwardRef((props,ref)=><Swipes swipesRef = {ref} {...props}/>);
