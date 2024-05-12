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
        "track_item_arr": [
            {
                "created_at": "2024-04-10",
                "pettrace_imgs": [],
                "description": "狗很乖"
            },
            {
                "created_at": "2024-04-11",
                "pettrace_imgs": [
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/image_aIV93ST.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240502%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240502T134545Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=71fa925ee0b55a5a7c5bccb6d73214f68245a17875af93fe791593b473d1efaa8a4a1e55207227adefc2a4b5b2ff2bca0ae0deb1208f02239297162865e3cf27e31daebe19ecfc9ef597c9dac3cbc4925834f6634b29ac379f7ef587fcc21cabd1e8f8ba976aa0ad6ebcb7f9c846c654aece832c7a765226201d30d2dda59c8b3c9b4cb8745c5275c8be79ec6bffdcb9d1389b68daa011d2f3a8dedf288e9e277b1adb4a71a16506733715ee4d37682f0859dc5940b6001605d312765f7b01afb5b2bbc0b438f38d242dbdd43b37e819aafb46f6c4bdac330c783bb6e8c0dba96d9b7bbff345a282855b3e2a6c6722fb9d0c939d696fc846985c1a0077d6f95b"
                ],
                "description": "很棒的狗狗"
            },
            {
                "created_at": "2024-04-11",
                "pettrace_imgs": [
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/image_cIOzdU5.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240502%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240502T134545Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=5a08058c33b83ebb3e9d45ff22546422f2ffb76d62a00d9bbda2ac3371549becf69a96bf3ea85601b8556f5f75b144d7875d314ce439e634251ed80d00cc415f0409e12918d2042c8b146fcdada196320d2322415a9d832258d4dc224506f7e670ff683473f396eae5ce1c025aa26df316117d98f83bdcef6431ffe1bd8a48df0be74ed4f6853ff8572fe961870d767c111f956351ea70afcd1b31015230c1c7f1a2792a5bdfbb4f9bb9ecc6033818775048c06828e84535faebcaf41ad98110cc531b9589e5a14007c51a105070a7bdf7e857b0e9079b2122d050a3264ee7c4b893f984b40207b4c75dc9622c4eb9a4e7548c4d8e44ded03a1605a67c5ea551"
                ],
                "description": "很棒的狗狗"
            }
        ],
        "pet": {
            "uuid": "94a2b0e0-af8e-4622-bdf2-d229f15be055",
            "species": "哈士奇",
            "species_general": "狗",
            "name": "小寶",
            "age": 5,
            "weight": 4.0,
            "vaccined": false,
            "currentloc": "台南安平",
            "description": "嗨！我是小寶，一隻活潑好動的小狗狗。我喜歡追逐球、嗅嗅花草的味道，最喜歡的事情就是和你一起度過每一天的歡樂時光！",
            "headimg": "https://storage.googleapis.com/bobo_backend_0001_formal/pet_images/%E5%B0%8F%E9%A6%AC%E7%88%BE%E6%BF%9F%E6%96%AF-1_1JeNKGe.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240502%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240502T134546Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=19bb3303db4156b3d21093cf63556d535429fb48ac7be354ecc59e4706241ebe9b3b740a66c52fd4dcd7448a44c49ef6c947e38b8d0c28a5db8a7c6ff087730ce1468eef447005ec071bd31b05cffdc17bf7e11a12959fb4f1732ad0d4cd972921af00d2a97d06c0468ab9da9fcbee15010e1fc129fb1984261a9f9c3717159638c23fc6406a222dfce5ecb35ebdff43de42d483c8b29ff15b2ed0393bf66174a840c5242a726a8a7e082632b1bf65c7b41460496b631cedeca587d9899eb3c59ae797a4614e6b004d3f03cfffbf10ab5865d6154459374fea86ec44a1917d873e6f7a92a9ba0c4cc8331c2b72b8a9b4d45af62d4ff1776fc7f060dc44e0177b",
            "created_at": "2024-04-08T19:50:41.570750Z",
            "updated_at": "2024-04-08T19:50:41.570775Z",
            "institution": "2e491ec3-fd4c-4804-b801-950baa8c301e"
        },
        "history_days": 22
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
