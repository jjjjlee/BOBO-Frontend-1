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
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/images.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240328%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240328T121712Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=bba70e48409c91e399760ae866db0d5b3ee02d8fe5f233547051652c940fd7df06a13e9ac76c7911ee1053dccb37f614dc18386d2384cf3987fe71c87a2c7ac6dbdad2180dd794dd45acb00589eba01cf7005c49f6e5c64da35e5134ba05692a54c245f7e67ce250a486004de2e1f2d61d84e4865988070df22dc6b55ea2996fb8e3a6fcf75d75bcbe1f6cdb3576cf7f7b29c66620e6507514ab6690c245a7f5b2dfceea994f65196da55c93d17a472529ad70327b19724c8fdb7df46b1d7d24327a0a651cb70061ff60118e3a16743ced5542051a36cd4a4a2d252a316994ffd0161582a9000adfd73296708f73a01c77531de3351c4fe2cfb4ca34cc5896bc",
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/20190303002313.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240328%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240328T122147Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=1b436856915cd0a81c516addee93a0427037926eaf6827e93f170673778cf6be3b4ae24d7a92f15c76c8d4ba5eaf6d06b31ba4a860d570b543c7ffae8ba1dd27b41f0f20723c3433a64dc8150247b74c5cbf13bc1476ff1d43c2c551e76b00f9293717f8c200ce60fa5050b4018fb314350518db9a25f4aa7db9199fad3d8d6d62b0f225494709e4f309f847324c8aeafef4f75230c22efe2180a313895aa9ac3df925bad6a948c16aa09b8de58810915f2e532e3ee44698cf85691ccd393f66b74a5cc749fb3975368720a226281354b83ae52032240076673f8232951080c14f4ce4042691f7578b1826d4867a648f9d15916241acc25498d3c85ebe309fe9",
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/%E4%B8%8B%E8%BC%89.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240328%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240328T121733Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=c26c623e066e0c3a08a11cd9d1d66c51e5d199ceab6eb21d750549edc02fb82b48b8b32a52622cccf20a32869926f91cde180ef70334a27698a340e3477d9730ff0d6168ebe66057230e7653a4b073f90e5befb06f0ff411677407f9200b21787d5f3fc16c1ab8b28ee0788641eaf43f6d06456caf4de6bd3726f311b2c895437921ed0c7dcbc261aef6510d69e21a4a77908c2b10653bc4e92301f5a40adeaa0be2b94ecb1954c73391f3ba8034e7a13eb5162583386dd223bbc87c8563142b5e00c16d8a138aa67ee3c65c0f9d4af31d00504b58b8d941d4e73e4c9922f32b119aac8fd0457298c0f52d2d0388d7c72c4ac76e2135f39d15129f352f25aa4a",
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/220px-Golden_Retriever_Buddy_0311.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240328%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240328T121751Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=a6408c3c1e71e4e31e194e690f6d7e0ce101128117baafe99e260a65e6224387222eeca41f0901b46a73b76a7bfb97165b50bddc5ac7d1f5ede58791c3fc3ba629dcf3d86f026b6f8b941b0e0c1cac2bcff957bedfa89da90a22914af8527e0c670f91aaef606c366dd92b0517a659aad2f418b04491df5998020e68d8653493f4e97b04bcffac6637e0804531811bee52dbf66b9fe61e9f89bf662a41b477d81561e60c851f8501f52a559a42bdffeb5ff40c1265002ce413e7ff7b19fc98838540e9afd2fca20c0294c761a02a124cc47ef162ba4d3f290a5c9a00d7d586fce8b56b49498c7a24ec8ff74d9638077a58ba6596139d1f5276f9e583e2319b82"
                ],
                created_at:"",
                description:"領養屬於你的毛孩，在這邊跟他留下屬於你們的故事吧!"
            }],
        pet:{
            name:"我是志工狗狗",
            headimg:"https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/11234.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240328%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240328T121548Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=b0c3004de7aa6c87cba65faf26827389035556ebf5cc8c0c384815a4a9c72c0be47278438812d1af4313e5c38d334006c2874cbc6428ffeaf294f3d8e42c35bb21033ab50a53fe5d73522afe3fadd0e07379f377adcf2fbc8465636ba6019ff306fa0a8d2bc14429bd78c00affd3e2f18b3ceb3724f59da4cea6fe1fa5244d00e898cf3ecd9d9d412315da4eca5ba0f848b22eab88f8f4b53f8267f1fd436c749c1a553911f778d94321ed33d146fe27ef30b7482e0643b0d87028542e3555f0c02565831358bd5339a5271d98f1df755946f8206d659a790a8aa745f431960a557d1b87925b29077282ad9e790e0de0866ef70859848ef10eed8675d73e3273",
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


