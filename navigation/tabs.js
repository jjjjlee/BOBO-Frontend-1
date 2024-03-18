import Login from "../screens/login";
import PostScreen from "../screens/postscreen";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserTrackScreen from "../screens/user-track-screen";
import { useEffect, useState } from "react";

const Tab = createMaterialTopTabNavigator();

export const PostTab = ()=>{
    return (
        <Tab.Navigator>
          <Tab.Screen name="已刊登" component={PostScreen} />
          <Tab.Screen name="未刊登" component={PostScreen} />
        </Tab.Navigator>
      );
}

// The data input should be an array of adopted dogs info
// Need to write a fetching method in this tab
const DUMMY_DATA = [
  { 
    id : 1,
    track_item_arr : [
        {
            id:"1",
            imgs_arr:[
                "http://192.168.1.100:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
                "http://192.168.1.100:8000/media/dogs/Jackrussel.jpg",
                "http://192.168.1.100:8000/media/dogs/images.jpg"
            ],
            update_date:"2019-4-4",
            update_text:"Hello this is the first text."
        },
        {
            id:"2",
            imgs_arr:[
                "http://192.168.1.100:8000/media/dogs/images.jpg",
                "http://192.168.1.100:8000/media/dogs/images.jpg",
                "http://192.168.1.100:8000/media/dogs/images.jpg",
                "http://192.168.1.100:8000/media/dogs/images.jpg",
                "http://192.168.1.100:8000/media/dogs/images.jpg",
                "http://192.168.1.100:8000/media/dogs/images.jpg"
            ],
            update_date:"2019-3-4",
            update_text:"我是影分身之數柴犬"
        }
    ],
    dog_info:{
        name:"Alan",
        headimg:"http://192.168.1.100:8000/media/dogs/golden-retriever1_OzehIoc.jpg",
        age:'2',
        species:"黃金獵犬",
        weight:"60",
        vaccined:"已施打疫苗",
        adoptloc:"高雄市三民區",
        adoptdate:"2020-10-20",
        currentloc:"台北市中山區",
        history_days:"60",
        description: "我是一隻笨笨狗"
    }
  
  },
  { 
    id : 2,
    track_item_arr : [
        {
            id:"1",
            imgs_arr:[
                "http://192.168.1.100:8000/media/dogs/%E9%82%8A%E7%89%A7.jpg",
                "http://192.168.1.100:8000/media/dogs/Jackrussel.jpg",
                "http://192.168.1.100:8000/media/dogs/images.jpg"
            ],
            update_date:"2020-2-8",
            update_text:"Hello this is the first text."
        },
        {
            id:"2",
            imgs_arr:[
                "http://192.168.1.100:8000/media/dogs/images.jpg",
                "http://192.168.1.100:8000/media/dogs/images.jpg",
                "http://192.168.1.100:8000/media/dogs/images.jpg",
                "http://192.168.1.100:8000/media/dogs/images.jpg",
                "http://192.168.1.100:8000/media/dogs/images.jpg",
                "http://192.168.1.100:8000/media/dogs/images.jpg"
            ],
            update_date:"2020-1-8",
            update_text:"我是影分身之數柴犬"
        }
    ],
    dog_info:{
        name:"Evan",
        headimg:"http://192.168.1.100:8000/media/dogs/golden-retriever.jpg",
        age:'5',
        species:"黃金獵犬",
        weight:"50",
        vaccined:"已施打疫苗",
        adoptloc:"高雄市前鎮區",
        adoptdate:"2015-1-20",
        currentloc:"台北市信義區",
        history_days:"30",
        description: "我是一隻笨笨狗"
    }
  
  }

];

export const UserTrackTab = ({route})=>{
    const uuid = route.params.uuid;

    const initialData = { 
        id : 0,
        track_item_arr : [
            {
                id:"",
                pettrace_imgs:[],
                created_at:"",
                description:""
            }],
        pet:{
            name:"加載中.....",
            headimg:"",
            age:'',
            species:"",
            weight:"",
            vaccined:false,
            currentloc:"",
            description: "",
            created_at : "",
            updated_at: "",
            institution:""
        },
        history_days:""
      }
    
    const [data, setData] = useState([initialData]);

    // Function
    const fetchAPI = async ()=>{
        fetch("https://lively-nimbus-415015.de.r.appspot.com/api/pet-track-record/member/"+uuid+'/',{
            method:"GET"})
            .then(res=>{return(res.json());})
            .then(res=>{
                if(res.length > 0){
                    setData(res)
                }
            })
            .catch(err=>{console.log(err);})
    };

    // Hooks
    useEffect(()=>{
        fetchAPI();
    },[])

  return(
    <Tab.Navigator>
        {data.map((item,i)=>(<Tab.Screen key= {i} name={item.pet.name} component = {UserTrackScreen} initialParams={{param1:item, param2 : item.pet.uuid}} />))}
    </Tab.Navigator>
  );
}


