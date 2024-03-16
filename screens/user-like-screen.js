// Import neccessary libraries
import {StyleSheet, View, Text, TouchableOpacity} from "react-native"
import { StatusBar } from 'expo-status-bar';
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {Colors} from '../components/styles'

// Import Doglist and report button 
import DogList from "../components/doglist";


// Colors
const { orange} = Colors;

// Import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";


const UserLikeScreen = ()=>{

    // variables
    let uuid = "";
    let currentdata = [];
    let currentfilterdata = [];
    // State Variables
    const [isPass, setIsPass] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const [isRun, setIsRun] = useState(false);
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    // Hooks

    useEffect(()=>{
        fetchData();
    },[])


    useEffect(()=>{
            handleFiltering();
    },[isPass, isFail, isRun]);
    

 
    // Fetching Data

    const fetchData = async ()=>{
        // First fetch UUID
        await fetchUUID();
        // Then fetch local data
        await fetchLocalData();
        // Finally, fetch APIData
        await fetchAPIData();
    }

    const fetchUUID = async() =>{
        const response = await AsyncStorage.getItem("UUID")
        const data = await JSON.parse(response)
        uuid = data;
    }

    const fetchAPIData = async()=>{
        // First fetch the submited dog
        console.log(data);
        fetch("https://lively-nimbus-415015.de.r.appspot.com/api/member_pet_status/" + uuid + "/",{
            method: "GET"
        }).then(res=>{return(res.json());
        }).then(res=>{
            console.log("Adding API data");
            setData(currentdata.concat(res.results));
            setFilterData(currentfilterdata.concat(res.results));
        }).catch(err=>{console.log(err);})
    }
    const fetchLocalData = async()=>{
        AsyncStorage.getItem("LikeCards")
        .then(res=>{return(JSON.parse(res))})
        .then(res=>{
            console.log("Adding local data")
            currentdata = currentdata.concat(res);
            currentfilterdata = currentfilterdata.concat(res);
        })
    }
    
    // Handle button click style
    const handleButtonClick1 = ()=>{
        if (isPass){
            setIsPass(false);
            
        }else{
            setIsPass(true);
            setIsFail(false);
            setIsRun(false);
            
        }
    }
    const handleButtonClick2 = ()=>{
        if (isFail){
            setIsFail(false);
        }else{
            setIsPass(false);
            setIsFail(true);
            setIsRun(false);
        }
    }
    const handleButtonClick3 = ()=>{
        if (isRun){
            setIsRun(false);
        }else{
            setIsPass(false);
            setIsFail(false);
            setIsRun(true);
        }
    }

    // Filtering 
    const handleFiltering = ()=>{
        let newData = [];
        if(isPass){
            newData = newData.concat(data.filter((item)=>{return(item.status ==="機構審查批准");}));
        }else if(isFail){
            newData = newData.concat(data.filter((item)=>{return(item.status ==="機構審查拒絕");}));
        }else if(isRun){
            newData = newData.concat(data.filter((item)=>{return(item.status ==="機構審查(中)");}));
        }else {newData = newData.concat(data);}
        setFilterData(newData);
        
    }

    return(
        <View style = {styles.screen} >
            <View style={styles.button_frame}>
                <TouchableOpacity activeOpacity={1} style = {[styles.button_unpress, isPass ? styles.button_press:styles.button_unpress]} onPress={handleButtonClick1}>
                    <Text style = {[styles.button_text_unpress, isPass? styles.button_text_press:styles.button_text_unpress]} >配對成功</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style = {[styles.button_unpress, isFail ? styles.button_press:styles.button_unpress]} onPress={handleButtonClick2}>
                    <Text style = {[styles.button_text_unpress, isFail? styles.button_text_press:styles.button_text_unpress]} >配對失敗</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style = {[styles.button_unpress,isRun? styles.button_press:styles.button_unpress]} onPress={handleButtonClick3}>
                    <Text style = {[styles.button_text_unpress, isRun? styles.button_text_press:styles.button_text_unpress]} >審查中</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='dark'/>
            <DogList data = {filterData} type = "forPost" canShowDetail = {true}/>
        </View>
    )
}


const styles = StyleSheet.create({
    screen:{
        padding:10
    },
    button_frame:{
        width: 390,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8,
        paddingVertical: 0,
        paddingHorizontal: 20
    },
    button_press:{
        height: 32,
        backgroundColor: "rgba(255, 234, 218, 1)",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
        paddingVertical: 0,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "rgba(237, 116, 34, 1)",
        borderRadius: 20
    },
    button_text_press:{
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(237, 116, 34, 1)",
        fontFamily: "PingFang TC",
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: 0.8
    },
    button_unpress:{
        flexShrink: 0,
        height: 32,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
        paddingVertical: 0,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "rgba(161, 161, 161, 1)",
        borderRadius: 20
    },
    button_text_unpress:{
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(161, 161, 161, 1)",
        fontFamily: "PingFang TC",
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: 0.8
    },
    textInputStyle:{
        height : 46,
        borderWidth:1,
        paddingLeft:10,
        margin:3,
        borderColor: orange,
        backgroundColor:'white',
        width: 160,
        alignSelf: 'flex-start',
        borderRadius:10
    },
      textstyle:{
        color: "black",
        fontFamily: "PingFang TC",
        fontSize: 14,
        fontWeight: "500"
      }
})


export default UserLikeScreen;
