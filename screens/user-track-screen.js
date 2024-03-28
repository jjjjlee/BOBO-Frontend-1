import {StyleSheet, View, Text, TextInput, TouchableOpacity} from "react-native"
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from "@react-navigation/native";
import {Colors} from './../components/styles'
import UserTracklist from "../components/user-tracklist";
import DoglistItem from "../components/doglist-item";
import Reporttest from "./report";
const { orange} = Colors;




const UserTrackScreen = ({route})=>{
    const {param1,param2} = route.params;
    const dog_info = param1.pet;
    const track_item_arr = param1.track_item_arr;
    const history_days = param1.history_days;
    const uuid = param2;
    const navigation = useNavigation();
    return(
        <View style = {styles.baseframe}>
            <DoglistItem id = {dog_info.id} name = {dog_info.name} headimg={dog_info.headimg} age = {dog_info.age} species = {dog_info.species} weight={dog_info.weight} vaccined={dog_info.vaccined} adoptloc={dog_info.currentloc} adoptdate = {dog_info.updated_at} currentloc={dog_info.currentloc} type={"forPost"} description={dog_info.description} update_status = {""} isadopted={true} />
            <View style = {styles.tracklist} >
                <Text style={styles.history_days_text}>
                    你們已經一起經歷 {<Text style = {{color:orange}}>{history_days}</Text>} 天了
                </Text>
                <StatusBar style='dark'/>
                <UserTracklist data = {track_item_arr}/>
            </View>
            {dog_info.name === "我是志工狗狗"?
                <View style={{position:"absolute",height:'6%',width:'110%',top:"65%"}}>
                    <View style={styles.nav_button} onPress={navigation.navigate("TinderScreen")}>
                        <Text style={{fontSize:16,textAlign:'center',color:"white",marginTop:"7%"}}>快去左邊尋找你的毛寶貝!</Text>
                    </View>
                </View>:
                <Reporttest uuid={uuid} />
                }
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
    },
    nav_button:{
        position:"absolute",
        backgroundColor:orange,
        width:'50%',
        height:'100%',
        left:'23%',
        borderRadius:30
    }
})

export default UserTrackScreen;