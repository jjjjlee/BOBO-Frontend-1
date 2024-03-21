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
                pettrace_imgs:[
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/%E4%B8%8B%E8%BC%89.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240321%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240321T152032Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=800223523eb4a8a4f06788e861c8b3afe56fa781b260fed87e8d7ff1a2b3dab87ad89d65e251ca7954077b5dd5517b81201c1e5eadd65d1c85d17342b488278c74bd1774260f9dab9990eaa09d7e9555ab65487a4e5b97a54c47fae94288f1062725b67cc018b6c1086a50a6abe15ccbbc82e39ac4f903fcb8435f8dcd04da94ab776ed71e40d8839f15d070878e90a43cbda9c393ee0f337637b2a73d6baf5d52ca5506d9c2a8207d1d8f1bb3f53f8cc3a526f4378acaedeb888bbcfe9c9361e7ce773636bc4771bfdf6422b5d9177723ed310850ae5e1ea7cf13e7b86226729370fc08a673950140c3629b51dd1e530fe109afe7128efea26de45478bc93a1",
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/images.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240321%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240321T152136Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=19d255975659e9c2a59addf340300545a1ce84bc74e36b05d0ef5255ee236774dd0aa94ecfde42670031905e1d2b163e9525def2780f611a7b2c3893d2cbf0521f4aa84f9a8b01f39232ae41a291aabb6ca5e734b8e2af032c7e28c253f38317f72a3d81ff7268d4d620a5ff5126def54824bd4d5bed639ad5a3e944d290b8e6f618602d199407f97420dbc4b04cd45aba16e1ff2363f5a3c3200fb64d4ce2688196d7903fde992c1e7eacda067f22a0516e3be8daac56a59fd8df952f7b209c292cbb49f4d48b06997c99f9f075bf390068ce1f6a7184987c8efaf2243c027205b1a7561e0a96c3e911f12521d2e29f4226d607534f5607c0084940bc40a0f1",
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/11234.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240321%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240321T152156Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=b368dd90e00a3e8d86016a643bc5220829f56926914eab1eddc90866a2e50b147cfbca650f445e17b52bc9c788d5634df27debdaa78ac4a0b43583e9c169b4d803e86de6d0bdb958103f4b0536f1b1a3d02f5e4d749f6b350f159b88ca97765adddb81b078828e44b9dca3068580c383be796496740fabb5ece16708dfc4f4391d8ee8abc9c0e95cc3e2316b65d3ba9fc4d487b66a9c5fb76da837bbd31a34bfafd44addf770a3292ddba26ea329e2dbc6ed50fb85f8d617dbdca3cd7ed8b8dc070e265442757a5e6f0b92a8a3716031841ff0bef8b99d89ca71ea94fd2e87b6b7fdc863bc2ae03aeabeef4cc9c135c83ea1e240751cdfa5f5da7ab95b1ca22f",
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/20190303002313.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240321%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240321T152218Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=b787f9768be9b6917d2536bf30d9a21647b258239f6934b4d358821b4f4af2821717c8ee098159c956b40fe98f34c8007f69780b99a15ca1bf119dca91ac6b49a92ad97ceb3a3cb70632b250eb46133aa4e45a52c72172695ebb3017b913613bfe7ccf8d9bbe404330a560060eef9c8362b793f98cc6cf40c2deb8cf3019c511fad923c84f22b6787cbb3acde2da363ce55d780a25c1f5d5c762d3d937a59e901d88d563f5f33334ccc5552dab64718911db2dd8a57952e5299270990786d63b4a21c2c291f6411dd811006839d23987630b313898ce9cf35b97cd9d56c546cbc6861660da6039199f2a5d69de8f6f75236840a87065fa01a8621359073aed96"
                ],
                created_at:"",
                description:"領養屬於你的毛孩，在這邊跟他留下屬於你們的故事吧!"
            }],
        pet:{
            name:"我是志工狗狗",
            headimg:"https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/220px-Golden_Retriever_Buddy_0311.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240321%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240321T151933Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=2140401f0d21a8bf76648c3239ce901fdfb663a3e4f62eef9f7090a84c530478c6384843fb2a4e35356ef3fae4d3af601c6e9624f40cbff685da35ac811f996c131cb1efaafd377ebebfcd94cb5b2128a549a47fef7e6b78fece15fabd1ad963148688b77f4bfa130b461af64681da0733e07e0ba43ea7bd9e48bcd84dff9cad8ef78773d08419a2b04c0eb5c781f640b5c7ec22fcd17bf41191147d28919da1c92b5cf0a7643909da562b51e473914012d5e9653b2bd285a5327f1824913dfc3a58550cb6a46e43ab0ed0c2de14feadbe6576a3c829fb470d160d33a3200c382c812a6178305651b5cbdd4bbd16fb544ff01d5fb070a36b7dcc2c6143adca5b",
            age:'1',
            species:"熱心的狗狗",
            weight:60.0,
            vaccined:true,
            currentloc:"汪汪星球",
            description: "你還沒有認養的寵物，快去尋找屬於你的小毛怪吧",
            created_at : "",
            updated_at: "",
            institution:""
        },
        history_days:"0"
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


