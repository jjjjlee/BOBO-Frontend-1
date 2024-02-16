import {StyleSheet, View, Text} from "react-native"
import { DUMMY_DATA } from "../data/dummy"
import DogList from "../components/doglist";
import { useEffect, useState } from "react";

const PostScreen = ()=>{
    
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetchData();
    },[])

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
        <View style = {styles.screen} >
            <DogList data = {data}/>
        </View>
    )
}


const styles = StyleSheet.create({
    screen:{
        padding:20
    }
})

export default PostScreen;
