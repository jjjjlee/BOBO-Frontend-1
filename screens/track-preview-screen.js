// Import neccessary libraries
import {StyleSheet, View, Text, TextInput} from "react-native"
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
     headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
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
     update_status:"正常"
    },
    {
    id:"2",
    name: "Jason",
    headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
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
    update_status:"已到期"
   },
   {
    id:"3",
    name: "Andrew",
    headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
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
    update_status:"將到期"
   }
]



const TrackPreviewScreen = ()=>{

    const SPECIES_SELECT_TYPES = [{value:"狗"},{value:"貓"},{value:"全種類"}];
    const UPDATE_STATUS_SELECT_TYPES = [{value:"已到期"},{value:"將到期"},{value:"正常"},{value:"所有狀態"}];
    const [status_selected, setStatusSelected] = useState("所有狀態");
    const [species_selected, setSpeciesSelected] = useState("全種類");
    const [data, setData] = useState(DUMMY_DATA);
    const [filterData, setFilterData] = useState(DUMMY_DATA);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    // useEffect hooks
    /*
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
            setFilterData(res);
            console.log(res);
        }).catch(err=>{console.log(err);})
    }

    // Searching function
    const searchFilter = (text)=>{
        if((species_selected === "全種類") & (status_selected === "所有狀態")){
            const newData = data.filter((item)=>{
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return(itemData.indexOf(textData)>-1);});
            setFilterData(newData);
            setSearch(text);
        }
        else if(species_selected === "全種類"){
            const newData = data.filter((item)=>{
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return((itemData.indexOf(textData)>-1)&(status_selected === item.update_status));});
            setFilterData(newData);
            setSearch(text);
        }
        else if(status_selected === "所有狀態"){
            const newData = data.filter((item)=>{
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return((itemData.indexOf(textData)>-1)&(species_selected === item.species_general));});
            setFilterData(newData);
            setSearch(text);
        }
        else{
            const newData = data.filter((item)=>{
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return((itemData.indexOf(textData)>-1) & (species_selected === item.species_general) & (status_selected === item.update_status));});
            setFilterData(newData);
            setSearch(text);
        }
    }

    return(
        <View style = {styles.screen} >
            <TextInput
            style = {styles.textInputStyle}
             value = {search}
             placeholder="輸入狗的名字"
             onChangeText={(text)=>searchFilter(text)}
             
            />
            <StatusBar style='dark'/>
            <DogList data = {filterData} type = "forTrack"/>
            <View style = {styles.speciesSelector1}>
                <SelectList
                    setSelected= {setStatusSelected}
                    data = {UPDATE_STATUS_SELECT_TYPES}
                    save="value"
                    placeholder="所有狀態"   
                    maxHeight={100}
                    dropdownStyles={{backgroundColor:"white"}}
                    dropdownTextStyles={styles.textstyle}
                    boxStyles={{width:105}}
                    onSelect={()=>searchFilter("")}
                />
            </View>
            <View style = {styles.speciesSelector2}>
                <SelectList
                    setSelected= {setSpeciesSelected}
                    data = {SPECIES_SELECT_TYPES}
                    save="value"
                    placeholder="全種類"
                    maxHeight={100}
                    dropdownStyles={{backgroundColor:"white"}}
                    dropdownTextStyles={styles.textstyle}
                    boxStyles={{width:105}}
                    onSelect={()=>searchFilter("")}   
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    screen:{
        padding:10
    },
    textInputStyle:{
        height : 46,
        borderWidth:1,
        paddingLeft:10,
        margin:3,
        borderColor: orange,
        backgroundColor:'white',
        width: 160,
        alignSelf: 'flex-end',
        borderRadius:10
    },
    speciesSelector1: {
        position: 'absolute',
        top: 13,
        left: 5,
        width: 120,
        height: 200,
        //backgroundColor:"red",
        alignItems: 'center',
        
      },
      speciesSelector2: {
        position: 'absolute',
        top: 13,
        left: 120,
        width: 120,
        height: 200,
        //backgroundColor:"red",
        alignItems: 'center',
        justifyContent: 'top',
      },
      textstyle:{
        color: "black",
        fontFamily: "PingFang TC",
        fontSize: 14,
        fontWeight: "500"
      }
})


export default TrackPreviewScreen;
