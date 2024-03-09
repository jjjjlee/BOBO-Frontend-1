import React,{useState,useEffect} from 'react';
import { Text, View , Button,TouchableOpacity,  keyboardType,Image, TextInput,Modal,KeyboardAvoidingView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// formik
import { Formik } from 'formik';
// Styled components
import {
    Colors,
    Lefttextorange,

} from './../components/styles'
//colors
const {holderwords, orange,white,gray} = Colors;

import AsyncStorage from '@react-native-async-storage/async-storage';
     
    
const Setting = ()=>{

    const [text1, setText1] = useState('請介紹您自己讓機構更認識您!');
    const [modalVisible1, setModalVisible1] = useState(false);
    const handleOpenModal1 = () => {setModalVisible1(true);};
    const handleCloseModal1 = () => {setModalVisible1(false);};
    const handleSaveText1 = () => {handleCloseModal1();};
    
    const [selectedFrequency, setSelectedFrequency] = useState('每月一次');
    const [showOptions, setShowOptions] = useState(false);
    const FrequencyOptions = ['每周一次', '每月一次', '每半年一次', '永不提醒'];

    const handleToggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleChange = (frequency) => {
        setSelectedFrequency(frequency);
        setShowOptions(false);
    };

    const [date, setDate] = useState(new Date(3376699000000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
    showMode('date');
    };

    const [images, setImages] = useState([]);

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
    }
  };

  useEffect(() => {
    retrieveData();
    
}, []);

const saveData = async () => {
    try {
        await AsyncStorage.setItem('text1', text1);
        await AsyncStorage.setItem('selectedFrequency', selectedFrequency);
        await AsyncStorage.setItem('date', date.toString());
        await AsyncStorage.setItem('images', JSON.stringify(images));
    } catch (error) {
        console.error('Error saving data: ', error);
    }
};

const retrieveData = async () => {
    try {
        const savedText1 = await AsyncStorage.getItem('text1');
        if (savedText1) setText1(savedText1);

        const savedFrequency = await AsyncStorage.getItem('selectedFrequency');
        if (savedFrequency) setSelectedFrequency(savedFrequency);

        const savedDate = await AsyncStorage.getItem('date');
        if (savedDate) setDate(new Date(savedDate));

        const savedImages = await AsyncStorage.getItem('images');
        if (savedImages) setImages(JSON.parse(savedImages));
    } catch (error) {
        console.error('Error retrieving data: ', error);
    }
};


const [initialFormValues, setInitialFormValues] = useState({
    name: '', userid: '',Houseaddress:'', Correspondenceaddress:'',Phonenumber:'',Intro:''
});
useEffect(() => {
    saveData();
    const loadStoredFormValues = async () => {
        try {
          const storedFormValues = await AsyncStorage.getItem('formValues');
          if (storedFormValues) {
            setInitialFormValues(JSON.parse(storedFormValues));
          }
        } catch (error) {
          console.error('Error loading stored form data:', error);
        }
      };
  
      loadStoredFormValues();
}, [text1, selectedFrequency, date, images]);

    return (

        <KeyboardAwareScrollView style={{flex:1 }} contentContainerStyle={{ flexGrow: 1,height:'120%'}} keyboardShouldPersistTaps="handled">
            
            <View style={{flex:1.0,backgroundColor: 'white'}}>
                <Lefttextorange>吳執行長</Lefttextorange>    
            </View>

            <View style={{ height: 10 }}></View>
            <Text  style={{fontSize:20,left:20,color:orange}}>您的照片</Text>
            <View style={{ height: 10 }}></View>

            <View style={{ flex: 1.4, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {images.map((uri, index) => (
                    <TouchableOpacity key={index} onPress={handlePress}>
                        <Image source={{ uri }} style={{ width: 120, height: 120, margin: 5, padding: 10, borderRadius: 50 }} />
                    </TouchableOpacity>
                ))}
  
                {images.length === 0 &&
                    <TouchableOpacity onPress={handlePress}>
                        <Image source={require('./../assets/add.png')} style={{ height: 100, width: 100 }} />
                    </TouchableOpacity>
                }
            </View>

            <View style={{ height: 10 }}></View>
            <Text  style={{fontSize:20,left:20,color:orange}}>提醒設定</Text>
            <View style={{ height: 20 }}></View>

            <View style={{flex:0.7,justifyContent: 'center',alignItems:'center'}}>
                <TouchableOpacity 
                    style={{backgroundColor:'#fff',padding:10,borderRadius:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'80%',height:60}}
                    onPress={handleToggleOptions}>
                    
                    <Text style={{fontSize:17}}>提醒頻率</Text>
                    <Text style={{fontSize:17,color:holderwords,textAlign:'left'}}>{selectedFrequency}</Text>

                    {showOptions && (
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 10, padding: 10,width:'106%' }}>
                            {FrequencyOptions.map((frequency, index) => (
                                <TouchableOpacity key={index} onPress={() => handleChange(frequency)}>
                                    <Text style={{ fontSize: 18 ,padding: 2,textAlign:'right'}}>{frequency}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                    )}      
                </TouchableOpacity>
            </View>
                            
            <View style={{ height: 20 }}></View>
            <Text  style={{fontSize:20,left:20,color:orange}}>個人設定</Text>
            

                        
                <View style={{ height: 10 }}></View>
                
                <Formik
                     initialValues={initialFormValues}
                    onSubmit={async (values) => {
                        try {
                          await AsyncStorage.setItem('formValues', JSON.stringify(values));
                          console.log('Form submitted:', values);
                        } catch (error) {
                          console.error('Error saving form data:', error);
                        }
                      }}>
                    
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        
                        <View style={{flex:8,flexDirection:'column',alignItems:'center'}}>
                        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#fff', borderTopLeftRadius:10, borderTopRightRadius: 10, flexDirection: 'row',height:60, justifyContent:'center', alignItems: 'center', width: '80%'}}>
                        <Text style={{ fontSize: 18,left:10 }}>姓名</Text>
                        <TextInput
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            placeholder="請輸入您的姓名"
                            style={{ flex: 1, fontSize: 17, color: holderwords ,textAlign:'right',right:10}}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showDatepicker} style={{ backgroundColor: '#fff',  flexDirection: 'row', justifyContent:'space-between', alignItems: 'center',height:60, width: '80%'}}>
                        <Text style={{ fontSize: 18,left:10  }}>生日</Text>
                        <Text style={{fontSize:17,color:holderwords,textAlign:'right'}}>  {date.toISOString().slice(0,10).replace(/-/g,"/")}  </Text>
                        {show && (
                            <DateTimePicker
                            value={date}
                            mode={mode}                         
                            onChange={onChange}
                            />
                        )}
                        
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#fff',  flexDirection: 'row', justifyContent:'center', alignItems: 'center',height:60, width: '80%'}}>
                        <Text style={{ fontSize: 18,left:10  }}>身分證</Text>
                        <TextInput
                            onChangeText={handleChange('id')}
                            onBlur={handleBlur('id')}
                            value={values.id}
                            placeholder="請輸入您的身分證"
                            style={{ flex: 1, fontSize: 17, color: holderwords ,textAlign:'right',right:10}}
                            
                        />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#fff',  flexDirection: 'row', justifyContent:'center', alignItems: 'center',height:60, width: '80%'}}>
                        <Text style={{ fontSize: 18,left:10  }}>戶籍地址</Text>
                        <View style={{width:80}}></View>
                        <TextInput
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            value={values.address}
                            multiline={false}
                            placeholder="請輸入您的戶籍地址"
                            style={{ flex: 1, fontSize: 17, color: holderwords ,textAlign:'right',right:10}}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#fff',  flexDirection: 'row', justifyContent:'center', alignItems: 'center',height:60, width: '80%'}}>
                        <Text style={{ fontSize: 18,left:10  }}>通訊地址</Text>
                        <View style={{width:80}}></View>
                        <TextInput
                            onChangeText={handleChange('address2')}
                            onBlur={handleBlur('address2')}
                            value={values.address2}
                            placeholder="請輸入您的通訊地址"
                            multiline={false}
                            style={{ flex: 1, fontSize: 17, color: holderwords ,textAlign:'right',right:10}}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#fff',  flexDirection: 'row', borderBottomLeftRadius:10,borderBottomRightRadius:10,justifyContent:'center', alignItems: 'center',height:60, width: '80%'}}>
                        <Text style={{ fontSize: 18,left:10  }}>手機</Text>
                        <TextInput
                        
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                            placeholder="請輸入您的手機號碼"
                            style={{ flex: 1, fontSize: 17, color: holderwords ,textAlign:'right',right:10}}
                            keyboardType="numeric"
                        />
                        </TouchableOpacity>
                        
                        

                        </View> 
                    )}
                 </Formik>
                 
                
                
                 {/* <Text  style={{fontSize:20,left:20,color:orange}}>自我介紹</Text>
                <View style={{flex:1,flexDirection:'row',justifyContent: 'center'}}>
            <TouchableOpacity onPress={handleOpenModal1} style={{ padding: 20, backgroundColor: '#fff',width:'80%',borderRadius:20,height:'60%'}}>
                <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{text1}</Text>
            </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={handleCloseModal1}
                >
                    <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:'40%',flexDirection:'column',justifyContent:'space-between'}}>
                            
                            <TextInput
                            multiline={true} 
                            style={{ height:'60%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                            onChangeText={setText1}
                            value={text1}
                            />
                            <TouchableOpacity onPress={handleSaveText1} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5 ,}}>
                                <Text>保存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </KeyboardAvoidingView>
            </Modal> */}
            


               








                 
        
        </KeyboardAwareScrollView>

  )
}
export default Setting;

