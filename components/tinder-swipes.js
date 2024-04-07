import React, { useState, useEffect, useCallback } from 'react'
import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Icon } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TinderDetailScreen from '../screens/tinder-detail-screen';
import { useNavigation } from '@react-navigation/native';


const Swipes = ({currentIndex,swipesRef,uuid})=>{

    [exampleHeadImageUrl, setExampleHeadImageUrl] = useState("");
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
              "headimg": exampleHeadImageUrl,
              "updated_at": "2024-0202",
              "institution": "123"
          },
          "updated_at": "2024-03-02 14:30:08",
          "status": "機構審查拒絕"
      }

    ]
    const navigation = useNavigation();
    [isEmptyDeck, setIsEmptyDeck] = useState(true);
    [modalVisible,setModalVisible] = useState(false);
    [Data, setData] = useState(DUMMY_DATA1);
    [tapData, setTapData] = useState(DUMMY_DATA1[0]);
    [key, setKey] = useState(0);

    let api = "https://lively-nimbus-415015.de.r.appspot.com/api/pet_tinder/get/1/" +  uuid + "/" 
    
    // Initialization
    const initialize = async ()=>{
      await fetchExampleHeadImg();
      await fetchData();
      await saveLikeCard(null);
    }

    // Fethcing data
    const fetchData = async ()=>{
      console.log("2")
      try{
        const response  = await fetch(api,{method:"GET"});
        if(response.ok){
          console.log("Now Start fetching");
          const data = await response.json();
          console.log("Data is set");
          if(data.results.length === 0 ){
            console.log("No available cards");
            let lastcard = DUMMY_DATA1[0];
            lastcard.pet.headimg = exampleHeadImageUrl;
            setData([lastcard]);
            setTapData(lastcard);
            setKey(1);
            setIsEmptyDeck(true);
          }else{
            setIsEmptyDeck(false);
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

    const fetchExampleHeadImg = async ()=>{
      console.log("1")
      try{
        const res = await fetch("https://lively-nimbus-415015.de.r.appspot.com/api/example/example-pet-headimg/",{method:"GET"});
        if(res.ok){
          const data = await res.json();
          setExampleHeadImageUrl(data.image);
        }else{
          console.log("Http error when fetching exampleHeadImageUrl");
        }
      }catch(err){
        console.log("Local Error when fetching exampleHeadImageUrl: "+err)
      }
    }
    // Functions
    const saveLikeCard = async(idx)=>{    
      console.log("3")
      if(idx === null){
        const safecard =  {
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
              "headimg": exampleHeadImageUrl,
          },
          "status": ""
        }
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
      initialize();
    },[key])

    // handleAdoption button
    const handleAdoption = ()=>{
      if(tapData.status !== "機構審查拒絕" & tapData.status !=="機構審查(中)" & tapData.status !=="機構審查批准"){
        setModalVisible(false);
        navigation.navigate("Adoptformik");//,{ petuuid: tapData.pet.uuid}
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
