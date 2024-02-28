import {StyleSheet, View, Text, TextInput} from "react-native"
import { StatusBar } from 'expo-status-bar';
import { DUMMY_DATA } from "../data/dummy"
import DogList from "../components/doglist";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {Colors} from './../components/styles'

const {brand, darklight,holderwords, primary, orange} = Colors;

const PostScreen = ()=>{
    
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    // useEffect hooks
    useEffect(()=>{
        fetchData();
    },[])




    // functions
    const fetchData = async()=>{
        fetch("http://192.168.1.102:8000/api/dogpreview/",{
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
             placeholder="輸入狗的名字"
             onChangeText={(text)=>searchFilter(text)}
            
            />
            <StatusBar style='dark'/>
            <DogList data = {filterData} type = "forPost" user={"institute"}/>
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
        paddingLeft:10,
        margin:3,
        borderColor: orange,
        backgroundColor:'white',
        borderRadius:10
    }
})

export default PostScreen;
