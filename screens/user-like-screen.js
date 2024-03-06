// Import neccessary libraries
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from "react-native"
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



// DUMMY DATA
const DUMMY_DATA = [
    {
     id:"1",
     name: "Joy",
     headimg : "http://192.168.1.102:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
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
    id:"2",
    name: "Jason",
    headimg : "http://192.168.1.102:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
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
    id:"3",
    name: "Andrew",
    headimg : "http://192.168.1.102:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
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
    id:"4",
    name: "Gogoro",
    headimg : "http://192.168.1.102:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
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



const UserLikeScreen = ()=>{

    const [isPass, setIsPass] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const [isRun, setIsRun] = useState(false);
    const [buttonStyle1, setButtonStyle1] = useState("UnPress_Style");
    const [buttonStyle2, setButtonStyle2] = useState("UnPress_Style");
    const [buttonStyle3, setButtonStyle3] = useState("UnPress_Style");
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    // useEffect hooks
    
    useEffect(()=>{
        fetchAPIData();
        fetchLocalData();
    },[])
    
   useEffect(()=>{
        handleFiltering();
   },[isPass, isFail, isRun]);




    // functions
    const fetchAPIData = async()=>{
        // First fetch the submited dog
        fetch("http://192.168.50.101:8000/api/dogpreview/",{
            method: "GET"
        }).then(res=>{return(res.json());
        }).then(res=>{
            setData(res);
            setFilterData(res);
            console.log(res);
        }).catch(err=>{console.log(err);})
    }
    const fetchLocalData = async()=>{
        AsyncStorage.getItem("LikeCards")
        .then(res=>{return(JSON.parse(res))})
        .then(res=>{
            setData(data.concat(res));
            setFilterData(data.concat(res));
        })
    }
    
    // Handle button click style
    const handleButtonClick1 = ()=>{
        if (isPass){
            setIsPass(false);
            setButtonStyle1("UnPress_Style");
        }else{
            setIsPass(true);
            setButtonStyle1("Press_Style");
            setIsFail(false);
            setButtonStyle2("UnPress_Style");
            setIsRun(false);
            setButtonStyle3("UnPress_Style")
        }
    }
    const handleButtonClick2 = ()=>{
        if (isFail){
            setIsFail(false);
            setButtonStyle2("UnPress_Style");
        }else{
            setIsPass(false);
            setButtonStyle1("UnPress_Style");
            setIsFail(true);
            setButtonStyle2("Press_Style");
            setIsRun(false);
            setButtonStyle3("UnPress_Style");
        }
    }
    const handleButtonClick3 = ()=>{
        if (isRun){
            setIsRun(false);
            setButtonStyle3("UnPress_Style");
        }else{
            setIsPass(false);
            setButtonStyle1("UnPress_Style");
            setIsFail(false);
            setButtonStyle2("UnPress_Style");
            setIsRun(true);
            setButtonStyle3("Press_Style");
        }
        setButtonStyle3(buttonStyle3 === "UnPress_Style" ? "Press_Style" : "UnPress_Style");
    }

    // Filtering function
    const handleFiltering = async ()=>{
        let newData = [];
        if(isPass){
            newData = newData.concat(data.filter((item)=>{return(item.matching_status ==="成功");}));
        }else if(isFail){
            newData = newData.concat(data.filter((item)=>{return(item.matching_status ==="失敗");}));
        }else if(isRun){
            newData = newData.concat(data.filter((item)=>{return(item.matching_status ==="審查中");}));
        }else {newData = newData.concat(data);}
        setFilterData(newData);
        
    }

    return(
        <View style = {styles.screen} >
            <View style={styles.button_frame}>
                <TouchableOpacity activeOpacity={1} style = {[styles.button_unpress,buttonStyle1 === "Press_Style"? styles.button_press:styles.button_unpress]} onPress={handleButtonClick1}>
                    <Text style = {[styles.button_text_unpress,buttonStyle1 === "Press_Style"? styles.button_text_press:styles.button_text_unpress]} >配對成功</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style = {[styles.button_unpress,buttonStyle2 === "Press_Style"? styles.button_press:styles.button_unpress]} onPress={handleButtonClick2}>
                    <Text style = {[styles.button_text_unpress,buttonStyle2 === "Press_Style"? styles.button_text_press:styles.button_text_unpress]} >配對失敗</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style = {[styles.button_unpress,buttonStyle3 === "Press_Style"? styles.button_press:styles.button_unpress]} onPress={handleButtonClick3}>
                    <Text style = {[styles.button_text_unpress,buttonStyle3 === "Press_Style"? styles.button_text_press:styles.button_text_unpress]} >審查中</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='dark'/>
            <DogList data = {filterData} type = "forPost" isadopted ={false}/>
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
