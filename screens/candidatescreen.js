import {StyleSheet, View, Text, TextInput} from "react-native"
import { StatusBar } from 'expo-status-bar';
import CandidateList from "../components/candidatelist";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {Colors} from './../components/styles'

const {brand, darklight,holderwords, primary, orange} = Colors;

// const DUMMY_DATA = [
//     {id:"1",
//      name: "Joy",
//      headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
//      age:"20",
//      currentloc: "台北市中正區",
//      currentloc_detail: "新竹市香山區交通大學研三宿舍北棟",
//      description: "我是一隻乖柴犬，快來領養我",
//      email: "jojo@gmail.com",
//      warning:true,
//      phone:"0923262659",
//      rating:"10",
//      refund_status:"可收取退養費"
//     },
//     {id:"2",
//     name: "Joy",
//     headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
//     age:"20",
//     currentloc: "台北市中正區",
//     currentloc_detail: "新竹市香山區交通大學研三宿舍北棟",
//     description: "我是一隻乖柴犬，快來領養我",
//     email: "jojo@gmail.com",
//     warning:false,
//     phone:"0923262659",
//     rating:"10",
//     refund_status:"可收取退養費"},
//     {id:"3",
//     #name: "Luke",
//     #headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
//     #age:"20",
//     #currentloc: "台北市中正區",
//     currentloc_detail: "新竹市香山區交通大學研三宿舍北棟",
//     description: "我是一隻乖柴犬，快來領養我",
//     #email: "jojo@gmail.com",
//     #warning:false,
//     #phone:"0923262659",
//     rating:"10",
//     refund_status:"可收取退養費"},
//     {id:"4",
//     name: "Arthur",
//     headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
//     age:"20",
//     currentloc: "台北市中正區",
//     currentloc_detail: "新竹市香山區",
//     description: "我是一隻乖柴犬，快來領養我",
//     email: "jojo@gmail.com",
//     warning:true,
//     phone:"0923262659",
//     rating:"10",
//     refund_status:"可收取退養費"},
//     {id:"5",
//     name: "Hank",
//     headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
//     age:"20",
//     currentloc: "台北市中正區",
//     currentloc_detail: "新竹市香山區",
//     description: "我是一隻乖柴犬，快來領養我",
//     email: "jojo@gmail.com",
//     warning:true,
//     phone:"0923262659",
//     rating:"10",
//     refund_status:"可收取退養費"},
//     {id:"6",
//     name: "Chris",
//     headimg : "http://192.168.50.101:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
//     age:"20",
//     currentloc: "台北市中正區",
//     currentloc_detail: "新竹市香山區",
//     description: "我是一隻乖柴犬，快來領養我",
//     email: "jojo@gmail.com",
//     warning:true,
//     phone:"0923262659",
//     rating:"10",
//     refund_status:"可收取退養費"}
// ]


const CandidateScreen = ({route})=>{
    
    const {pet_uuid} = route.params
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    let api = 'https://lively-nimbus-415015.de.r.appspot.com/api/institution_p2m/'+pet_uuid+'/'

    useEffect(()=>{
        fetchData();
    },[])
    



    // functions
    const fetchData = async()=>{
        const response = await fetch(api,{'method': 'GET'})
        try{
            if(response.ok){
                const fetchdata = await response.json();
                if(fetchdata.next !== null){
                    api = fetchdata.next;
                }
                const addarr = fetchdata.results.map((item,i)=>{
                    let member_data = item.member;
                    member_data.warning = item.warning_msg;
                    member_data.id = i;
                    return member_data;
                })
                const newdata = data.concat(addarr);
                setData(newdata);
                setFilterData(newdata);
            }
            else{
                console.log("Problem fethcing candidates")
            }
        }catch(e){
            console.log(e);
        }
    }

    // Searching function
    const searchFilter = (text)=>{
        if(text){
            const newData = data.filter((item)=>{
                const itemName = item.name ? item.name : '';
                const reginput = itemName.split('').join('|')
                const pattern = new RegExp(reginput);
                return pattern.test(text)

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
            <CandidateList data = {filterData} type = "forAdopt" searchtxt={search} callback={fetchData}/>
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
