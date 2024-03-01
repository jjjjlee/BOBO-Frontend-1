// Import neccessary libraries
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from "react-native"
import { StatusBar } from 'expo-status-bar';
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {Colors} from '../components/styles'

// Import Doglist 
import DogList from "../components/doglist";
const {brand, darklight,holderwords, primary, orange} = Colors;

// Import Select List
import { SelectList } from 'react-native-dropdown-select-list'

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
   }
]



const UserLikeScreen = ()=>{

    const [isPass, setIsPass] = useState(true);
    const [isFail, setIsFail] = useState(true);
    const [isRun, setIsRun] = useState(true);
    const [buttonStyle1, setButtonStyle1] = useState("Press_Style");
    const [buttonStyle2, setButtonStyle2] = useState("Press_Style");
    const [buttonStyle3, setButtonStyle3] = useState("Press_Style");
    const [data, setData] = useState(DUMMY_DATA);
    const [filterData, setFilterData] = useState(DUMMY_DATA);
    const navigation = useNavigation();

    // useEffect hooks
    /*
    useEffect(()=>{
        fetchData();
    },[])
    */
   useEffect(()=>{
        handleFiltering();
   },[isPass, isFail, isRun]);



    // functions
    const fetchData = async()=>{
        fetch("http://192.168.50.101:8000/api/dogpreview/",{
            method: "GET"
        }).then(res=>{return(res.json());
        }).then(res=>{
            setData(res);
            setFilterData(res);
            console.log(res);
        }).catch(err=>{console.log(err);})
    }

    // Handle button click style
    const handleButtonClick1 = ()=>{
        setIsPass(isPass? false:true);
        setButtonStyle1(buttonStyle1 === "UnPress_Style" ? "Press_Style" : "UnPress_Style");
    }
    const handleButtonClick2 = ()=>{
        setIsFail(isFail? false:true);
        setButtonStyle2(buttonStyle2 === "UnPress_Style" ? "Press_Style" : "UnPress_Style");
    }
    const handleButtonClick3 = ()=>{
        setIsRun(isRun? false:true);
        setButtonStyle3(buttonStyle3 === "UnPress_Style" ? "Press_Style" : "UnPress_Style");
    }

    // Filtering function
    const handleFiltering = async ()=>{
        let newData = [];
        if(isPass){
            newData = newData.concat(data.filter((item)=>{return(item.matching_status ==="成功");}));
        }
        if(isFail){
            newData = newData.concat(data.filter((item)=>{return(item.matching_status ==="失敗");}));
        }
        if(isRun){
            newData = newData.concat(data.filter((item)=>{return(item.matching_status ==="審查中");}));
        }
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
            <DogList data = {filterData} type = "forPost"/>
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
