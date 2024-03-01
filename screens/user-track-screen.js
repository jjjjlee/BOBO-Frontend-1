import {StyleSheet, View, Text, TextInput} from "react-native"
import { StatusBar } from 'expo-status-bar';
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {Colors} from './../components/styles'
import UserTracklist from "../components/user-tracklist";
import { Line, Svg } from "react-native-svg";
import DoglistItem from "../components/doglist-item";

const {brand, darklight,holderwords, primary, orange} = Colors;




const UserTrackScreen = (input_data)=>{
    const dog_info = input_data.route.params.dog_info;
    const [data, setData] = useState(input_data.route.params.track_item_arr);
    const navigation = useNavigation();
    /*
    // useEffect hooks
    useEffect(()=>{
        fetchData();
    },[])
    */


    // functions
    const fetchData = async()=>{
        fetch("http://192.168.50.101:8000/api/dogpreview/",{
            method: "GET"
        }).then(res=>{return(res.json());
        }).then(res=>{
            setData(res);
            console.log(res);
        }).catch(err=>{console.log(err);})
    }

    return(
        <View style = {styles.baseframe}>
            <DoglistItem name = {dog_info.name} headimg={dog_info.headimg} age = {dog_info.age} species = {dog_info.species} weight={dog_info.weight} vaccined={dog_info.vaccined} adoptloc={dog_info.adoptloc} adoptdate = {dog_info.adoptdate} currentloc={dog_info.currentloc} type={"forPost"} description={dog_info.description} update_status = {""} />
            <View style = {styles.tracklist} >
                <Text style={styles.history_days_text}>
                    你們已經一起經歷 {<Text style = {{color:orange}}>{dog_info.history_days}</Text>} 天了
                </Text>
                <StatusBar style='dark'/>
                <UserTracklist data = {data}/>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    baseframe:{
        flexShrink: 0,
        height: 844,
        width: "100%",
        backgroundColor: "rgba(238, 238, 238, 1)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 15.600000381469727,
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.05,
        alignItems: "flex-start",
        rowGap: 0,
        padding:10
    },
    tracklist:{
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 1)",
        shadowRadius: 15,
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.05,
        alignItems: "flex-start",
        justifyContent: "center",
        rowGap: 20,
        padding: 20,
        borderRadius: 24,
        borderColor:'#c5c5c5',
        borderWidth:1,
        marginTop:10
    },
    history_days_text:{
        textAlign: "left",
        color: "rgba(41, 41, 41, 1)",
        fontFamily: "PingFang TC",
        fontSize: 17,
        fontWeight: "400",
        letterSpacing: 0.8,
        marginTop:35
    }
})

export default UserTrackScreen;