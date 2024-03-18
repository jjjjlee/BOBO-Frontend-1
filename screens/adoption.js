import React,{useState,useEffect} from 'react';
import { Text, View , TouchableOpacity, SafeAreaView,Image,ScrollView,Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';


// Styled components
import {
    Colors,
} from './../components/styles'

//AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

//colors
const {holderwords,orange,gray,white} = Colors;

import { useNavigation } from '@react-navigation/native';
     
    
const Adoptformik = ()=>{
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  
  const saveImages = async () => {
    try {
        await AsyncStorage.setItem('images', JSON.stringify(images));
    } catch (error) {
        console.error('Error saving images: ', error);
    }
  };
  const retrieveImages = async () => {
    try {
        const storedImages = await AsyncStorage.getItem('images');
        if (storedImages !== null) {
            setImages(JSON.parse(storedImages));
        }
    } catch (error) {
        console.error('Error retrieving images: ', error);
    }
};
  const handlePress = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('沒有權限');
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
        const asset = result.assets[0];
        setImages([asset.uri]);
        await saveImages();
       
    }
  };
/////////////////////////////下拉式選單//////////////////////////////////////
    const [birth,setSelected1] = useState('');        
    const [living_area,setSelected2] = useState('');        
    const [industry,setSelected3] = useState('');        
    const [ job_title,setSelected4] = useState('');             
    const [working_shift,setSelected5] = useState('');    
    const [position,setSelected6] = useState('');    
    const [housing_situation,setSelected7] = useState('');    
    const [number_family_membe,setSelected8] = useState('');      
    const [numownership_exp,setSelected11] = useState(''); 
    const [other_pets,setSelected10] = useState('');   
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      retrieveData();
      retrieveImages();
    }, []);
    

    const saveData = async () => {
      try {
          await AsyncStorage.setItem('birth', birth);
          await AsyncStorage.setItem('living_area', living_area);
          await AsyncStorage.setItem('industry', industry);
          await AsyncStorage.setItem(' job_title',  job_title);
          await AsyncStorage.setItem('working_shift', working_shift);
          await AsyncStorage.setItem('position', position);
          await AsyncStorage.setItem('housing_situation', housing_situation);
          await AsyncStorage.setItem('number_family_membe', number_family_membe);
          await AsyncStorage.setItem('numownership_exp', numownership_exp);
          await AsyncStorage.setItem('other_pets', other_pets);

          
      } catch (error) {
          console.error('Error saving data: ', error);
      }
    };


    
    const retrieveData = async () => {
      try {
          const value1 = await AsyncStorage.getItem('birth');
          const value2 = await AsyncStorage.getItem('living_area');
          const value3 = await AsyncStorage.getItem('industry');
          const value4 = await AsyncStorage.getItem(' job_title');
          const value5 = await AsyncStorage.getItem('working_shift');
          const value6 = await AsyncStorage.getItem('position');
          const value7 = await AsyncStorage.getItem('housing_situation');
          const value8 = await AsyncStorage.getItem('number_family_membe');
          const value11 = await AsyncStorage.getItem('numownership_exp');
          const value10 = await AsyncStorage.getItem('other_pets');
          

          if (value1 !== null) {
              setSelected1(value1);
          }
          if (value2 !== null) {
              setSelected2(value2);
          }
          if (value3 !== null) {
            setSelected3(value3);
          }
          if (value4 !== null) {
            setSelected4(value4);
          }
          if (value5 !== null) {
            setSelected5(value5);
          }
          if (value6 !== null) {
            setSelected6(value6);
          }
          if (value7 !== null) {
            setSelected7(value7);
          }
          if (value8 !== null) {
            setSelected8(value8);
          }
          if (value11 !== null) {
            setSelected11(value11);
          }
          if (value10 !== null) {
            setSelected10(value10);
          }
          
          
          } catch (error) {
            console.error('Error retrieving data: ', error);
          }
        };

        const handleComplete = async () => {
            const data = await AsyncStorage.getItem("UUID")
            const uuid = await JSON.parse(data)
            console.log(uuid);
           try {
            // if (Image) {
            //   await uploadImage(Image);
            // }
              
              const requestData = {
                "age":birth,
                "living_area":living_area,
                "industry":industry,
                "job_title":job_title,
                "working_shift":working_shift,
                "position":position,
                "housing_condition":housing_situation,
                "number_family_member":number_family_membe,
                "numownership_exp":numownership_exp,
                "other_pets":other_pets,
                 
              };
  
              
              const response = await 
                  fetch("https://lively-nimbus-415015.de.r.appspot.com/api/member-detail/patch/"+ uuid +"/", {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                    },
                  body: JSON.stringify(requestData),
              });
  
              if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
              }
  
               
               navigation.navigate("Adoptformik2");
              } 
              catch (error) {
              console.error('Error submitting data: ', error);

              
          }
      };

      const uploadImage = async (uri) => {

        try {
            
            const formData = new FormData();
            formData.append('image', {
                uri,
                type: 'image/jpeg', // 这里需要根据实际情况设置图片类型
                name: 'image.jpg',
            });
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const data = await response.json();
            console.log('Image uploaded:', data);
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };


    const [showOptions1,  setShowOptions1 ] = useState(false);
    const [showOptions2,  setShowOptions2 ] = useState(false);
    const [showOptions3,  setShowOptions3 ] = useState(false);
    const [showOptions4,  setShowOptions4 ] = useState(false);
    const [showOptions5,  setShowOptions5 ] = useState(false);
    const [showOptions6,  setShowOptions6 ] = useState(false);
    const [showOptions7,  setShowOptions7 ] = useState(false);
    const [showOptions8,  setShowOptions8 ] = useState(false);
    const [showOptions11, setShowOptions11] = useState(false);
    const [showOptions10, setShowOptions10] = useState(false);

    
    const Options1    = ['20歲以下','20~25','26~30','31~35','36~40','41~45','46~50','51~55','56~60','61~65'];
    const Options2    = ['台北市','新北市','基隆市','桃園市','桃園縣','新竹市','新竹縣','苗栗縣','台中市','彰化縣','南投縣','雲林縣','嘉義縣','嘉義市','屏東縣','宜蘭縣','花蓮縣','台東縣','離島',];
    const Options3    = ['營運/幕僚','人力資源','行銷/廣告/公關','財務/會計/金融','業務/銷售','行政/總務/客服','產品/專案管理','技術研發','軟體開發/MIS','生產製造/品管/環衛','採購/倉儲/物流','設計/創意','文字/傳媒','門市營業/餐飲服務','專業人員','其他'];
    const Options4    = ['企業經營人/負責人','高階主管','初中階主管','一般職員','專業人員/自由工作者','學生','其他'];
    const Options5    = ['日班','晚班','大夜班','輪班or不定時'];
    const Options6    = ['全職','兼職','派遣','無'];
    const Options7    = ['公寓(有電梯)','公寓(無電梯)', '透天','獨立套房', '套房', '雅房','店面','電梯大樓','辦公大樓'];
    const Options8    = ['1人','2人','3人','4人','5人','5人以上'];
    const Options10    = ['有','無'];
    const Options11   = ['有','無'];


    const handleToggleOptions1 = () => {setShowOptions1(!showOptions1);};
    const handleToggleOptions2 = () => {setShowOptions2(!showOptions2);};
    const handleToggleOptions3 = () => {setShowOptions3(!showOptions3);};
    const handleToggleOptions4 = () => {setShowOptions4(!showOptions4);};
    const handleToggleOptions5 = () => {setShowOptions5(!showOptions5);};
    const handleToggleOptions6 = () => {setShowOptions6(!showOptions6);};
    const handleToggleOptions7 = () => {setShowOptions7(!showOptions7);};
    const handleToggleOptions8 = () => {setShowOptions8(!showOptions8);};
    const handleToggleOptions11 = () => {setShowOptions11(!showOptions11);};
    const handleToggleOptions10 = () => {setShowOptions10(!showOptions10);};

    const handleChange1 = (a1) => {setSelected1(a1);setShowOptions1(false);saveData();}
    const handleChange2 = (a2) => {setSelected2(a2);setShowOptions2(false);saveData();}
    const handleChange3 = (a3) => {setSelected3(a3);setShowOptions3(false);saveData();}
    const handleChange4 = (a4) => {setSelected4(a4);setShowOptions4(false);saveData();}
    const handleChange5 = (a5) => {setSelected5(a5);setShowOptions5(false);saveData();}
    const handleChange6 = (a6) => {setSelected6(a6);setShowOptions6(false);saveData();}
    const handleChange7 = (a7) => {setSelected7(a7);setShowOptions7(false);saveData();}
    const handleChange8 = (a8) => {setSelected8(a8);setShowOptions8(false);saveData();}
    const handleChange11 = (a11) => {setSelected11(a11);setShowOptions11(false);saveData();}
    const handleChange10 = (a10) => {setSelected10(a10);setShowOptions10(false);saveData();}



    return(
        <SafeAreaView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={{ flexGrow: 1, height: '180%',flexDirection:'column',justifyContent:'space-between'}}>

            <View style={{flex:1,backgroundColor:orange,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                
                <TouchableOpacity  onPress={()=>navigation.goBack()}>
                    <Text style={{fontSize:20,left:15,color:'#fff'}}>取消</Text>
                </TouchableOpacity>
                                                                           
                                                                                                            {/* 上面橘色框框 */}
                
                    <Text style={{fontSize:25,color:'#fff'}}>  上傳認養資料</Text>
                

                
                <TouchableOpacity onPress={(handleComplete)} >
                    <Text style={{fontSize:20,right:15,color:'#fff'}}>下一頁</Text>
                </TouchableOpacity>
                
            </View>
            <View style={{ height: 10 }}></View>
            <Text  style={{fontSize:20,left:20}}>您的照片</Text>
            <View style={{ height: 10 }}></View>

            <View style={{ flex: 0.7, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {images.map((uri, index) => (
                    <TouchableOpacity key={index} onPress={handlePress}>
                        <Image source={{ uri }} style={{ width: 100, height: 100, margin: 5, padding: 10, borderRadius: 40 ,margin:'20'}} />
                    </TouchableOpacity>
                ))}
  
                {images.length === 0 &&
                    <TouchableOpacity onPress={handlePress}>
                        <Image source={require('./../assets/add.png')} style={{ height: 100, width: 100 }} />
                    </TouchableOpacity>
                }
            </View>

            <View style={{flex:10,flexDirection:'column',justifyContent:'flex-start'}}>
                
                <Text  style={{fontSize:20,left:20}}>您的年齡</Text>
                <View style={{flexDirection:'row',justifyContent: 'center',top:9,zIndex:999}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#fff',
                            padding:10,
                            width:'80%',
                            justifyContent: 'center',
                            flexDirection:'row',
                            borderRadius:20,
                            margin:5
                            }}
                            onPress={handleToggleOptions1}>
                        <Text style={{fontSize:19,color:holderwords}}>  {birth}  </Text>
                        {showOptions1 && (
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 20, padding: 10,width:'106%',}}>
                            {Options1.map((a1, index1) => (
                                 <View style={{marginBottom:10}}>
                                <TouchableOpacity key={index1} onPress={() => handleChange1(a1)}>
                                    <Text style={{ fontSize: 20 ,textAlign:'center'}}>  {a1}  </Text>
                                </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        )}         
                    </TouchableOpacity>             
                </View>
                 <View style={{margin:5}}></View>                   
                <Text  style={{fontSize:20,left:20,margin:5}}>您的居住縣市</Text>
                <View style={{flexDirection:'row',justifyContent: 'center',top:9,zIndex:950}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#fff',
                            padding:10,
                            width:'80%',
                            justifyContent: 'center',
                            flexDirection:'row',
                            borderRadius:20,
                            margin:5
                            }}
                            onPress={handleToggleOptions2}>
                        <Text style={{fontSize:19,color:holderwords}}>  {living_area}  </Text>
                        {showOptions2 && (
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 20, padding: 10,width:'106%',}}>
                            {Options2.map((a2, index) => (
                                 <View style={{marginBottom:10}}>
                                <TouchableOpacity key={index} onPress={() => handleChange2(a2)}>
                                    <Text style={{ fontSize: 20 ,textAlign:'center'}}>  {a2}  </Text>
                                </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        )}         
                    </TouchableOpacity>             
                </View>
                <View style={{margin:5}}></View>  
                <Text  style={{fontSize:20,left:20,margin:5}}>您的行業別</Text>
                <View style={{flexDirection:'row',justifyContent: 'center',top:9,zIndex:900}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#fff',
                            padding:10,
                            width:'80%',
                            justifyContent: 'center',
                            flexDirection:'row',
                            borderRadius:20,
                            margin:5
                            }}
                            onPress={handleToggleOptions3}>
                        <Text style={{fontSize:19,color:holderwords}}>  {industry}  </Text>
                        {showOptions3 && (
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 20, padding: 10,width:'106%',}}>
                            {Options3.map((a3, index) => (
                                 <View style={{marginBottom:10}}>
                                <TouchableOpacity key={index} onPress={() => handleChange3(a3)}>
                                    <Text style={{ fontSize: 20 ,textAlign:'center'}}>  {a3}  </Text>
                                </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        )}         
                    </TouchableOpacity>             
                </View>
                <View style={{margin:5}}></View>  
                <Text  style={{fontSize:20,left:20,margin:5}}>您的職位別</Text>
                <View style={{flexDirection:'row',justifyContent: 'center',top:9,zIndex:850}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#fff',
                            padding:10,
                            width:'80%',
                            justifyContent: 'center',
                            flexDirection:'row',
                            borderRadius:20,
                            margin:5
                            }}
                            onPress={handleToggleOptions4}>
                        <Text style={{fontSize:19,color:holderwords}}>  { job_title}  </Text>
                        {showOptions4 && (
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 20, padding: 10,width:'106%',}}>
                            {Options4.map((a4, index) => (
                                 <View style={{marginBottom:10}}>
                                <TouchableOpacity key={index} onPress={() => handleChange4(a4)}>
                                    <Text style={{ fontSize: 20 ,textAlign:'center'}}>  {a4}  </Text>
                                </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        )}         
                    </TouchableOpacity>             
                </View>
                <View style={{margin:5}}></View>  
                <Text  style={{fontSize:20,left:20,margin:5}}>您的工作時段</Text>
                <View style={{flexDirection:'row',justifyContent: 'center',top:9,zIndex:800}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#fff',
                            padding:10,
                            width:'80%',
                            justifyContent: 'center',
                            flexDirection:'row',
                            borderRadius:20,
                            margin:5
                            }}
                            onPress={handleToggleOptions5}>
                        <Text style={{fontSize:19,color:holderwords}}>  {working_shift}  </Text>
                        {showOptions5 && (
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 20, padding: 10,width:'106%',}}>
                            {Options5.map((a5, index) => (
                                 <View style={{marginBottom:10}}>
                                <TouchableOpacity key={index} onPress={() => handleChange5(a5)}>
                                    <Text style={{ fontSize: 20 ,textAlign:'center'}}>  {a5}  </Text>
                                </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        )}         
                    </TouchableOpacity>             
                </View>
                <View style={{margin:5}}></View>  
                <Text  style={{fontSize:20,left:20,margin:5}}>您的工作性質</Text>
                <View style={{flexDirection:'row',justifyContent: 'center',top:9,zIndex:750}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#fff',
                            padding:10,
                            width:'80%',
                            justifyContent: 'center',
                            flexDirection:'row',
                            borderRadius:20,
                            margin:5
                            }}
                            onPress={handleToggleOptions6}>
                        <Text style={{fontSize:19,color:holderwords}}>  {position}  </Text>
                        {showOptions6 && (
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 20, padding: 10,width:'106%',}}>
                            {Options6.map((a6, index) => (
                                 <View style={{marginBottom:10}}>
                                <TouchableOpacity key={index} onPress={() => handleChange6(a6)}>
                                    <Text style={{ fontSize: 20 ,textAlign:'center'}}>  {a6}  </Text>
                                </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        )}         
                    </TouchableOpacity>             
                </View>
                <View style={{margin:5}}></View>  
                <Text  style={{fontSize:20,left:20,margin:5}}>您的住房狀況</Text>
                <View style={{flexDirection:'row',justifyContent: 'center',top:9,zIndex:700}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#fff',
                            padding:10,
                            width:'80%',
                            justifyContent: 'center',
                            flexDirection:'row',
                            borderRadius:20,
                            margin:5
                            }}
                            onPress={handleToggleOptions7}>
                        <Text style={{fontSize:19,color:holderwords}}>  {housing_situation}  </Text>
                        {showOptions7 && (
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 20, padding: 10,width:'106%',}}>
                            {Options7.map((a7, index) => (
                                 <View style={{marginBottom:10}}>
                                <TouchableOpacity key={index} onPress={() => handleChange7(a7)}>
                                    <Text style={{ fontSize: 20 ,textAlign:'center'}}>  {a7}  </Text>
                                </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        )}         
                    </TouchableOpacity>             
                </View>
                <View style={{margin:5}}></View>  
                <Text  style={{fontSize:20,left:20,margin:5}}>您的家庭成員數量</Text>
                <View style={{flexDirection:'row',justifyContent: 'center',top:9,zIndex:650}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#fff',
                            padding:10,
                            width:'80%',
                            justifyContent: 'center',
                            flexDirection:'row',
                            borderRadius:20,
                            margin:5
                            }}
                            onPress={handleToggleOptions8}>
                        <Text style={{fontSize:19,color:holderwords}}>  {number_family_membe}  </Text>
                        {showOptions8 && (
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 20, padding: 10,width:'106%',}}>
                            {Options8.map((a8, index) => (
                                 <View style={{marginBottom:10}}>
                                <TouchableOpacity key={index} onPress={() => handleChange8(a8)}>
                                    <Text style={{ fontSize: 20 ,textAlign:'center'}}>  {a8}  </Text>
                                </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        )}        
                    </TouchableOpacity>             
                </View>
                <View style={{margin:5}}></View>  
                <Text  style={{fontSize:20,left:20,margin:5}}>曾經是否有飼養寵物經驗</Text>
                <View style={{flexDirection:'row',justifyContent: 'center',top:9,zIndex:600}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#fff',
                            padding:10,
                            width:'80%',
                            justifyContent: 'center',
                            flexDirection:'row',
                            borderRadius:20,
                            margin:5
                            }}
                            onPress={handleToggleOptions10}>
                        <Text style={{fontSize:19,color:holderwords}}>  {other_pets}  </Text>
                        {showOptions10 && (
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 20, padding: 10,width:'106%',}}>
                            {Options10.map((a10, index) => (
                                 <View style={{marginBottom:10}}>
                                <TouchableOpacity key={index} onPress={() => handleChange10(a10)}>
                                    <Text style={{ fontSize: 20 ,textAlign:'center'}}>  {a10}  </Text>
                                </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        )}         
                    </TouchableOpacity>             
                </View>
                <View style={{margin:5}}></View>  
                <Text  style={{fontSize:20,left:20,margin:5}}>家中現在是否有其他寵物</Text>
                <View style={{flexDirection:'row',justifyContent: 'center',top:9,zIndex:500}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#fff',
                            padding:10,
                            width:'80%',
                            justifyContent: 'center',
                            flexDirection:'row',
                            borderRadius:20,
                            margin:5
                            }}
                            onPress={handleToggleOptions11}>
                        <Text style={{fontSize:19,color:holderwords}}>  {numownership_exp}  </Text>
                        {showOptions11 && (
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 20, padding: 10,width:'106%',}}>
                            {Options11.map((a11, index) => (
                                 <View style={{marginBottom:10}}>
                                <TouchableOpacity key={index} onPress={() => handleChange11(a11)}>
                                    <Text style={{ fontSize: 20 ,textAlign:'center'}}>  {a11}  </Text>
                                </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        )}         
                    </TouchableOpacity>             
                </View>


                








            </View>
            

            </ScrollView>
        </SafeAreaView>
        
    )

}

export  default Adoptformik;