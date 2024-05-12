import {StyleSheet, View, Text, TextInput} from "react-native"
import { StatusBar } from 'expo-status-bar';
import DogList from "../components/doglist";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {Colors} from './../components/styles'
const {brand, darklight,holderwords, primary, orange} = Colors;

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
        "history_days": 22,
    },
    {
        "track_item_arr": [
            {
                "created_at": "2024-04-10",
                "pettrace_imgs": [],
                "description": "很乖"
            },
            {
                "created_at": "2024-04-10",
                "pettrace_imgs": [
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/image_6B0ozeV.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240502%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240502T134541Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=a4908cf161326d8e25dd4b871f81d86940caedddda2f877b55b532b9bcce9724bb0f48a488b59921c13d0d4f77dd94707a4c9f9e86d70675199097fb652adce68b02e369e25aff447301892ee145329d53147857d4c034ae47a7c1bb2699cf454b989e9f248572265fdf5ee565dcfd942f43401278bbae96ba2795dd8cb9a2f95f0ff2cfbe42c1e12b318ffd2d1d144fb734fed3195118cfb752cf84611ed432c3e3f30feb6916269828ebd4bdacc03e665ecc1875b2ecce1f693e5160d637ca46d6033d8a594da4874bdbc249c79dd3976e50c5e57280028ad4cfeb83e7ee3284f5f4d1cce51851471a98d8b6da77a92c3d868e978998ca24515dabf81fa7ab"
                ],
                "description": "很乖"
            },
            {
                "created_at": "2024-04-10",
                "pettrace_imgs": [
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/image_Ma6po47.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240502%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240502T134545Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=358479ce76b276bd95c5d000676fc0672d608b06ae9ad78a452a4a169e6345454edfe321b2db14dbb73ff2c49ae674f0dd420d6e5d2f56b4487759fd583f0e6ea33dd6ddbcb95306119b881305fabf29e04027c0fbff3d952b5b9c52bd785a8df8c245b1a3025d4b93d685fe6c1334676d7a8b184d63eeb98ec1ab865aa50a3c70c27f243c4841ede2e7035379cbdfa84abda05a9e2ab5386cbd2ddf32fd6487b372c138915f961243374fb3895575b6b61501aa0465b411538a5528229449731e738e720ca691e4c9c871b3a8d6d011753127fa2e78e7f5181049e34584c38325ad177e52483825d669b756de1649233188db380fc44a647c196f64bde7b2ef"
                ],
                "description": "很乖"
            },
            {
                "created_at": "2024-04-11",
                "pettrace_imgs": [
                    "https://storage.googleapis.com/bobo_backend_0001_formal/images/image_qDdcBm1.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240502%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240502T134545Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=3825cd3c3684ccc46460cb47a75fc43d92475950b9aac3aa01a31d7d4ecd51626f66a6e82db1f44d84a3c5e81fca7f77ff52fab6f3f9603fb14cf5c40e70450ef8b1fe2d9a4ba44cbd200dfc80ef55029800e1a851a0002e789bb8fe0edd7a1760bcaef812966dd88dd0c2eb88db311d16fd3858ef40f332f2174ed8c39f3f5fe6953fb2e106eb7e1307f5d8fa2bf4193992cb112c0abe15e03b6a8b98f7f8a5b9622b9d962b4c5b635736ae382f1b5e28350fd44c6598e373d870042dee0da8011c1fcf27a2149ab227fc3a1418e5ec304fd0b16a7f4940ebeff2b43baa8634441755d6e7dba7b617838ac7c5366f66c6f3a13c9f248cbb604ef8c44ad08bd5"
                ],
                "description": "很乖"
            }
        ],
        "pet": {
            "uuid": "2cbba3f5-487a-4ed3-91bb-c749dfef3158",
            "species": "黃金獵犬",
            "species_general": "狗",
            "name": "小風",
            "age": 5,
            "weight": 14.0,
            "vaccined": false,
            "currentloc": "台南漁光島",
            "description": "嘿！我是小風，一陣溫柔的微風。生活雖然有時令人喘不過氣，但我總是會帶來些許清新與愉悅，讓你在忙碌中也能感受到片刻的寧靜。",
            "headimg": "https://storage.googleapis.com/bobo_backend_0001_formal/pet_images/%E9%BB%83%E9%87%91%E7%8D%B5%E7%8A%AC-2.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=bobo-987%40lively-nimbus-415015.iam.gserviceaccount.com%2F20240502%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240502T134546Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=00f4277c5d271cf94dc736440c0f061f551dbec91f80266c523bef1287a21b06867f91e6e95b622903a868c168b9a2fd155dbbfbdca17875cc14d71ac16158c6b1a7e401ab46249cbc847e5f1e8d0c8196c82d33563f7085bf05fe306d9f7d630c9ca2b09661cc9fa786a35f017f5955575dda54756e70ba25fc34030b6b1feeea38de78d2e8da08ee12d708c65109b7ecadef8c5819f4c9e4bf07d3cc117b313c047b0108c7562ac2391e208aadc93f0e2aaac050f97891b7b544131ec832035110a914b8b293036175af27ecc16700e1cc5376129c41d831d6fa87bb66b0706314deb84678ff06c5afbae843166fa725425b9c5384bb73a600a2f1cef17f32",
            "created_at": "2024-04-08T20:01:58.780173Z",
            "updated_at": "2024-04-08T20:01:58.780199Z",
            "institution": "2e491ec3-fd4c-4804-b801-950baa8c301e"
        },
        "history_days": 22
    }
     
]


const AddScreen = ({route})=>{

    const {inst_uuid} = route.params;
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    let api = "https://lively-nimbus-415015.de.r.appspot.com/api/institution_pet_status/"+inst_uuid+"/0/";
    // useEffect hooks
    useEffect(()=>{
        fetchData();
    },[])

    // functions
    const fetchData = async()=>{
        const currdata = data;
        console.log('Fetch Data')
        const response = await fetch(api,{
            method: 'GET'
        })
        
        if(response.ok){
            const res_data = await response.json();
            if(res_data.next !== null){
                api = res_data.next
            }
            const newdata = currdata.concat(res_data.results);
            setData(newdata);
            setFilterData(newdata);

        }else{
            console.log("Fetching data failed");
        }
        
    }

    // Searching function
    const searchFilter = (text)=>{
        if(text){
            const newData = data.filter((item)=>{
                const itemName = item.pet.name ? item.pet.name : '';
                const reginput = itemName.split('').join('|')
                const pattern = new RegExp(reginput);
                return pattern.test(text)

            });
            //console.log("Length",newData.length)
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
            <DogList data = {filterData} type = "forPost" user={"institute"} canShowDetail={true} callback = {fetchData} searchtxt={search}/>
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

export default AddScreen;
