import Login from "../screens/login";
import PostScreen from "../screens/postscreen";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserTrackScreen from "../screens/user-track-screen";
import { useEffect, useState } from "react";
import AddScreen from "../screens/add-screen";
import CandidateScreen from "../screens/candidatescreen";
import TinderDetailScreen from "../screens/tinder-detail-screen";

const Tab = createMaterialTopTabNavigator();

export const PostTab = ({route})=>{
    const {inst_uuid} = route.params;
    return (
        <Tab.Navigator>
          <Tab.Screen name="已刊登" component={PostScreen} initialParams={{inst_uuid:inst_uuid}}/>
          <Tab.Screen name="未刊登" component={AddScreen} initialParams={{inst_uuid:inst_uuid}}/>
        </Tab.Navigator>
      );
}

export const CandidateTab = ({route})=>{
  const {pet_uuid,detail_data} = route.params;
  return(
    <Tab.Navigator>
      <Tab.Screen name="狗資訊" component={TinderDetailScreen} initialParams={detail_data}/>
      <Tab.Screen name="候選人" component={CandidateScreen} initialParams={{pet_uuid:pet_uuid}}/>
  </Tab.Navigator>
  );
}

// The data input should be an array of adopted dogs info
// Need to write a fetching method in this tab

export const UserTrackTab = ({route})=>{
    const uuid = route.params.uuid;

    const initialData = { 
        id : 0,
        track_item_arr : [
            {
                id:"",
                pettrace_imgs:[
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/20190303002313.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240330%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240330T150212Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=38aaeeadb7754504cca389eac4b47f44efc1f116975e643fd641481df9520cfcde13ed5c202fd7a2d3aef4204679c1fa26ed40c1e57a2158aef7373bd896f085b5b04e59650973b734e828738830c196d770dafcdf9606c8eb4c011aeeb43eef45956fa49ae225b0c8bd15d39a2e4e273b3efef49ffd74f9394944a58b5e4e7070d991b123aee0ae90b6dbb2c70b801bdebe325fbfbdc622825b0375748bde9e9013eaf03fb8124285c2a1268839af8de70880c9073dd567e30c366720fb38d7c15f3aa9b903611e81ba2c0a8ac30d7f2b795aef2650606c726aa7bdc9d71a30eec7ea3202efa8e97eedf1f462690e8a7b84cef7cb7ce6a39649c8b0ed68e44c",
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/images.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240330%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240330T150231Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=6003f8073d73dbfa3013b7df9d67bc8892b3f2583d83f77d4998dd92d9f95176adbf0eaef3a279af288a59312f2902396eed38f8ec8be63a4067afd3bee770d28b2f04da4d9a77b386dca3277b1702169ea7e635e3438ea3f9cd7eaa421afe176ca0f0bd8c2c605d7c6942c71f0b6e48ab9b1c2a63318234188102d11d50b9a42e33eca85f2587328995afcd57993777ac5c025bbeec0222729021c8d6b3ac261ca3bd72c4307b08b2928b94aeb28b9e6696f00e440813639e741e6917bc29867f2263f856e2f3f6e98a390f35b7b57954cb9365f20cecf46da997689eaede2ebacad38d5161d805e310444388e920bd9a69f85be4c8db0e15e314d448f1ea05",
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/%E4%B8%8B%E8%BC%89.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240330%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240330T150247Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=6ada38ba8c70c3c274f3c6a4d8c12d0d664239776f08d49d34222c4c53dae4a7dd141b902083cfb5899ecc34370e6ad38bcc935b77ad6a66be8f3534cc190499919df5b9b46f08e8a6634db3f385ea3dfa71b7bd4f5e07a9b74d41caff33cb1335f20c73a6a066fb3b6105aac69bdee78d2860cda4b9e92ab8eb2886f57e97ec3c03e77b1984ffb7e09b5dee61e224b5adcfffa0ef621b5749fedf83c36c7d5c0418447e304301f3101e6af257f501b1fa824716989e84cac0b82220247f8499d13fd4d901fd1bb987feee67f8902cba05b979532db2171ea19c68094aed40169b419d88db42572d73b9b80576498a430c72b963c0a48182b92c3716161dd59f",
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/fruits/220px-Golden_Retriever_Buddy_0311.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240330%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240330T150302Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=1c780a29c09e0db27539ff3e1cee53ae608a51b74184d5113d3f3044c7dd4168219bfefc3250d9cc73fb5479e7dd5acc8b4ee57488ed3b3c0364c6fd7462c8e8fc1c9f012ad9f5180f91c454f96cd95b00f2bfc04072218e5e14b23873f4f299704f8ba31bae19e557b73b6f68f2e590e8b45faf1c7cf53cfe36f4be8901f970d1d103bdc5cda0649d2155d3da5907d013ac074b3a44602a67fad6fcd0984a9a9035a05e85d4ad4625fb6e33708cde5b2053aabc1cbb2a612bbd4026cece02a5429e9b03876659b9ad31e50b0f9b13763fd7cb1e8438defc88247085d24cbba1d7b67c33721267216652940c81ddda6ebe113a69a49e562da1c637c731adc8c1"
                ],
                created_at:"",
                description:"領養屬於你的毛孩，在這邊跟他留下屬於你們的故事吧!"
            }],
        pet:{
            name:"加載中",
            headimg:"123",
            age:'...',
            species:"加載中",
            weight:60.0,
            vaccined:true,
            currentloc:"加載中",
            description: "加載中",
            created_at : "",
            updated_at: "",
            institution:""
        },
        history_days:"0"
      }
    
    const [data, setData] = useState([initialData]);
    // Fetching Data
    const fetchAPI = async ()=>{
      try{
        const response = await fetch("https://lively-nimbus-415015.de.r.appspot.com/api/member_pet_status/"+uuid+"/5/",{
          method: "GET"})
        if(response.ok){
          // First get all the adoption dog information
          const data = await response.json();
          let petarr = data.results.map(item =>{
            const {id,status,updated_at, ...rest} = item;
            return rest});
          //console.log(petarr);
          // Next, add track_item_arr to the petarr
          const res = await fetch("https://lively-nimbus-415015.de.r.appspot.com/api/pet-track-record/member/"+uuid+'/',{method:"GET"})
          if(res.ok){
            const data = await res.json();
            let trackarr = data;
            
            const mappedArr = petarr.map(obj1=>{
              // Find the corresponding object in trackarr
              const obj2 = trackarr.find(obj => obj.pet.uuid === obj1.pet.uuid);
              // Create a new object with the track_item_arr key
              return{
                ...obj1,
                track_item_arr : obj2 ? obj2.track_item_arr : [],
                history_days : obj2 ? obj2.history_days: 0,
              }
            })

            //console.log(mappedArr)
            if(mappedArr.length !== 0){
              setData(mappedArr)
            }
          }else{
            console.log("HTTP error when fetching initial track data1")
          }
        }else{
          console.log("HTTP error when fetching initial track data")
        }
      }catch(err){
        console.log("Local error when fetching initial track data")
      }
    }

    const fetchExampleImg = async ()=>{
        try{
          const res = await fetch("https://lively-nimbus-415015.de.r.appspot.com/api/example/",{method:"GET"});
          if(res.ok){
            const obj_arr = await res.json();
            // Extract Images
            img_arr = obj_arr.map((item,i)=>{return item.image})
            const headimg = img_arr[0];
            const trackimg_arr = img_arr.slice(1);
            // Reform initial data
            const demo = {
              id : -1,
                track_item_arr : [
                    {
                        id:"",
                        pettrace_imgs: trackimg_arr,
                        created_at:"",
                        description:"領養屬於你的毛孩，在這邊跟他留下屬於你們的故事吧!"
                    }],
                pet:{
                    name:"我是志工狗狗",
                    headimg:headimg,
                    age:'1',
                    species:"熱心的狗狗",
                    weight:60.0,
                    vaccined:true,
                    currentloc:"汪汪星球",
                    description: "你還沒有認養的寵物，快去尋找你的小毛怪吧",
                    created_at : "",
                    updated_at: "",
                    institution:""
                },
                history_days:"0"
            }
            // Set demo data
            setData([demo]);
          }else{
            console.log("Http error when fetching exampleImageUrl");
          }
        }catch(err){
          console.log("Local Error when fetching exampleImageUrl: "+err)
        }
      }
    
    // Functions
    const initialize = async ()=>{
      await fetchExampleImg();
      await fetchAPI(); 
    }
    // Hooks
    useEffect(()=>{
        initialize();
    },[])

  return(
    <Tab.Navigator>
        {data.map((item,i)=>(<Tab.Screen key= {i} name={item.pet.name} component = {UserTrackScreen} initialParams={{param1:item, param2 : item.pet.uuid}} />))}
    </Tab.Navigator>
  );
}


