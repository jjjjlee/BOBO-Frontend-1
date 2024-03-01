import {StyleSheet, View, Text, TextInput} from "react-native"
import { StatusBar } from 'expo-status-bar';
import CandidateList from "../components/candidatelist";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {Colors} from './../components/styles'

const {brand, darklight,holderwords, primary, orange} = Colors;

const DUMMY_DATA = [
    {id:"1",
     name: "Joy",
     headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
     age:"20",
     currentloc: "台北市中正區",
     currentloc_detail: "新竹市香山區交通大學研三宿舍北棟",
     description: "我是一隻乖柴犬，快來領養我",
     email: "jojo@gmail.com",
     warning:true,
     phone:"0923262659",
     rating:"10",
     refund_status:"可收取退養費"
    },
    {id:"2",
    name: "Joy",
    headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
    age:"20",
    currentloc: "台北市中正區",
    currentloc_detail: "新竹市香山區交通大學研三宿舍北棟",
    description: "我是一隻乖柴犬，快來領養我",
    email: "jojo@gmail.com",
    warning:false,
    phone:"0923262659",
    rating:"10",
    refund_status:"可收取退養費"},
    {id:"3",
    name: "Luke",
    headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
    age:"20",
    currentloc: "台北市中正區",
    currentloc_detail: "新竹市香山區交通大學研三宿舍北棟",
    description: "我是一隻乖柴犬，快來領養我",
    email: "jojo@gmail.com",
    warning:false,
    phone:"0923262659",
    rating:"10",
    refund_status:"可收取退養費"},
    {id:"4",
    name: "Arthur",
    headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
    age:"20",
    currentloc: "台北市中正區",
    currentloc_detail: "新竹市香山區",
    description: "我是一隻乖柴犬，快來領養我",
    email: "jojo@gmail.com",
    warning:true,
    phone:"0923262659",
    rating:"10",
    refund_status:"可收取退養費"},
    {id:"5",
    name: "Hank",
    headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
    age:"20",
    currentloc: "台北市中正區",
    currentloc_detail: "新竹市香山區",
    description: "我是一隻乖柴犬，快來領養我",
    email: "jojo@gmail.com",
    warning:true,
    phone:"0923262659",
    rating:"10",
    refund_status:"可收取退養費"},
    {id:"6",
    name: "Chris",
    headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
    age:"20",
    currentloc: "台北市中正區",
    currentloc_detail: "新竹市香山區",
    description: "我是一隻乖柴犬，快來領養我",
    email: "jojo@gmail.com",
    warning:true,
    phone:"0923262659",
    rating:"10",
    refund_status:"可收取退養費"}
]


const CandidateScreen = ()=>{
    
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
        if(text){
            const newData = data.filter((item)=>{
                const itemData = item.name ? item.name.toUpperCase()
                            : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) >-1;

            });
            setFilterData(newData);
            setSearch(text);
        } else {
            setFilterData(data);
            setSearch(text);
        }
    }

    return(
        <View style = {styles.screen} >
            <TextInput
            style = {styles.textInputStyle}
             value = {search}
             placeholder="輸入候選人的名字"
             onChangeText={(text)=>searchFilter(text)}
            
            />
            <StatusBar style='dark'/>
            <CandidateList data = {filterData} type = "forAdopt"/>
        </View>
    )
}


const styles = StyleSheet.create({
    screen:{
        padding:10
    },
    textInputStyle:{
        height : 30,
        borderWidth:1,
        paddingLeft:9,
        margin:3,
        borderColor: orange,
        backgroundColor:'white',
        borderRadius:10
    }
})

export default CandidateScreen;
