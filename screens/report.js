import React,{useState,useEffect} from 'react';
import { Text, View , TouchableOpacity, Image,Modal,TextInput, Platform ,TouchableWithoutFeedback, Keyboard,Alert,KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Styled components
import {
    Colors,
} from './../components/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

//colors
const {holderwords,orange,white} = Colors;

const Reporttest = ({uuid})=>{
    // Variables
    const petid =uuid;
    // State variables
    const [memberid, setMemberid] = useState("");
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [images, setImages] = useState([]);
    const [text,  setText] = useState('毛孩有甚麼異常狀況嗎'); 
    const [text2, setText2] = useState('毛孩有甚麼異常狀況嗎'); 
    const [text3, setText3] = useState('請簡述您的退養原因'); 
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    // Initialization
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
          setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
          setKeyboardVisible(false);
        });
        // This is a cleanup function returned by the effect. 
        // It removes the event listeners when the component unmounts to avoid memory leaks. 
        // This cleanup function runs when the component unmounts or when the effect dependencies change.
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);

    useEffect(()=>{
        fetchUUID();
    },[]);

    // Funtcions
    const handlePressOutside = () => {
        
        if (isKeyboardVisible) {
          Keyboard.dismiss(); 
        } else {
          handleCloseModal(); 
          handleCloseModal2(); 
        }
      };
    const handleOpenModal2 = () => {setModalVisible2(true);};
    const handleCloseModal2 = () => {setModalVisible2(false);};
    const handleOpenModal = () => {setModalVisible(true);};
    const handleCloseModal = () => {setModalVisible(false);};

    // Async Functions
    const fetchUUID = async() =>{
        const response = await AsyncStorage.getItem("UUID")
        const data = await JSON.parse(response)
        console.log('memeberid is get',data)
        setMemberid(data);
    }
    // Add photo function
    const handlePress = async (uri) => {
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
        aspect: [15, 15],
        quality: 1,
      });
  
      if (!result.canceled) {

        const newImages = result.assets.map(asset => asset.uri);
        setImages([...images, ...newImages]);
        const { creationTime } = result;
        const photoCreationTime = moment(creationTime); 
        console.log(photoCreationTime)
        const monthAgo = moment().subtract(1, 'month'); 


  
        if (photoCreationTime.isBefore(monthAgo)) {
          Alert.alert('照片時間超過一個月', '請選擇其他照片');
          return;
      }
    };
    }
    // The final fetching function
    const handleSaveText = async () => {
      // 按下完成執行的function
      try {
        if (images && images.length > 0) {
          const formData = new FormData();
          // Add images
          for (var x = 0; x < images.length; x++) {
            let uri = images[x];
            formData.append("uploaded_images",{
              uri,
              type: 'image/jpeg', 
              name: 'image.jpg',
            });
        }
          // Add text
          formData.append("description",text);
          formData.append("pet",petid);
          formData.append("member",memberid)
          // Add deadline
          formData.append("deadline","2030-01-01")
          const response = await fetch('https://lively-nimbus-415015.de.r.appspot.com/api/pet-track-record/post/', {
              method: 'POST',
              body: formData,
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          const data = await response.json();
          console.log('回傳訊息:', data);
          handleCloseModal();
        }
        else{
          Alert.alert('錯誤','請上傳照片!')
        }
        
      } catch (error) {
        console.error('上傳失敗!請再試一次', error);
      }
    };
    // Replace photo function
    const handleReplaceImage = async (index) => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [15, 15],
        quality: 1,
      });

      if (!result.canceled) {
        const newImageUri = result.assets[0].uri;
        const updatedImages = [...images];
        updatedImages[index] = newImageUri;
        setImages(updatedImages);
      }
    };
    const handleSaveText2 =  async() => {
        const back ={
        member:memberid,
        pet:petid,
        pet_description:text2,
        reason:text3
      }
        try {
            const response = await fetch('https://lively-nimbus-415015.de.r.appspot.com/api/refund/post', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(back), 
            });
            const data = await response.json();
            console.log('上傳成功', data);
            handleCloseModal2();
          } catch (error) {
            console.error('上傳失敗!請再試一次', petid,memberid );
          }
    }; 

    return (
        <View style={{position:"absolute",height:'6%',width:'110%',top:"75%"}}>
          <TouchableOpacity onPress={handleOpenModal} style={{position:"absolute", backgroundColor:orange,width:'24%',height:'100%',bottom:30,left:'37%',borderRadius:30}}>
              <Text style={{fontSize:16,textAlign:'center',color:white,marginTop:"10%"}}>回報</Text>
          </TouchableOpacity>        

          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
              <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <TouchableWithoutFeedback onPress={handlePressOutside}>
              <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                  
                <View style={{ width:'100%', height:'7%',backgroundColor:orange,flexDirection:'row',justifyContent:'center',flexDirection:'row',borderTopLeftRadius:30,borderTopRightRadius:30,top:'28.5%'}}>                                                 
                    <View style={{justifyContent:'center'}}>
                        <Text style={{fontSize:25,color:'#fff'}}>寵物回報</Text>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => {}}>
                <View style={{ backgroundColor:'#EEEEEE', padding: 20, width:'100%',height:'75%',top:'13%'}}>
                    <Text style={{fontSize:16}}>新增照片(至多8張)</Text>

                    <View style={{backgroundColor:white,height:'40%',borderRadius:20,flexDirection:'row', alignItems: 'center',top:5}}>
                        
                        <View style={{ flexDirection: 'row' , flexWrap: 'wrap',height:80,width:'100%',bottom:'27%',left:'1.5%'}}>
                            {images.slice(0, 8).map((uri, index) => (
                            <TouchableOpacity key={index} onPress={() => handleReplaceImage(index)} style={{ margin: 5 }}>
                            <Image source={{ uri }} style={{ width: 80, height: 80, borderRadius: 10 }} />
                          </TouchableOpacity>
                            ))}
                            {images.length < 8 && (
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handlePress}>
                                <Image
                                    source={require('./../assets/add.png')}    style={{height:90,width:100,right:'10%'}}>                  
                                </Image>
                            </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    
                    <Text style={{top:'2%',fontSize:16}}>文字描述</Text>

                    <TextInput
                        multiline={true} 
                        style={{ height:'25%',color:holderwords,borderRadius:20, fontSize:18, marginBottom: 10,top:'4%',textAlignVertical: 'top',padding:10 ,backgroundColor:white}}
                        onChangeText={setText}
                        value={text}

                    />
                    <TouchableOpacity onPress={handleSaveText} style={{ padding: 10, backgroundColor:orange, left:'73%',alignItems: 'center', borderRadius: 20 ,width:100,top:'4%'}}>
                        <Text style={{color:white}}>完成</Text>
                    </TouchableOpacity>
                    
                    <View style={{ width: '100%', height: 1, borderBottomWidth: 1, borderBottomColor: '#787878', borderStyle: 'dashed' ,top:'6%'}} />

                    <Text style={{top:'9%',fontSize:16,color:holderwords,left:'30%'}}>飼養上遇到問題嗎</Text>
                    <TouchableOpacity onPress={handleOpenModal2} style={{ padding: 10, backgroundColor:'#787878', left:'73%',alignItems: 'center', borderRadius: 20 ,width:100,top:'3%'}}>
                        <Text style={{color:white}}>我要諮詢</Text>
                    </TouchableOpacity>

                </View>
                </TouchableWithoutFeedback>
                  
              </View>
              </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
          </Modal>


          <Modal animationType="slide" transparent={true} visible={modalVisible2} onRequestClose={handleCloseModal2}>
              <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <TouchableWithoutFeedback onPress={handlePressOutside}>
              <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                  <View style={{ width:'100%', height:'8%',backgroundColor:orange,flexDirection:'row',justifyContent:'center',flexDirection:'row',borderTopLeftRadius:30,borderTopRightRadius:30,top:'43%'}}>                         
                      <View style={{justifyContent:'center'}}>
                          <Text style={{fontSize:25,color:'#fff'}}>諮詢</Text>
                      </View>
                  </View>
                  <View style={{ backgroundColor:'#EEEEEE', padding: 20, width:'100%',height:'62%',top:'21%'}}>
                      <Text style={{fontSize:16,bottom:10}}>毛孩狀況</Text>

                      <TextInput
                          multiline={true} 
                          style={{ height:'25%',color:holderwords,borderRadius:20, fontSize:18, marginBottom: 10,textAlignVertical: 'top',padding:10 ,backgroundColor:white}}
                          onChangeText={setText2}
                          value={text2}

                      />
                      
                      <Text style={{fontSize:16}}>退養原因</Text>

                      <TextInput
                          multiline={true} 
                          style={{ height:'25%',color:holderwords,borderRadius:20, fontSize:18, marginBottom: 10,top:'2%',textAlignVertical: 'top',padding:10 ,backgroundColor:white}}
                          onChangeText={setText3}
                          value={text3}

                      />
                      <View style={{flexDirection:'row',justifyContent:'flex-end',top:'20%'}}>
                      <TouchableOpacity onPress={handleCloseModal2} style={{ padding: 10, alignItems: 'center', borderRadius: 20 ,width:100}}>
                          <Text style={{color:orange}}>取消</Text>
                      </TouchableOpacity>                


                      <TouchableOpacity onPress={handleSaveText2} style={{ padding: 10, backgroundColor:orange,alignItems: 'center', borderRadius: 20 ,width:100}}>
                          <Text style={{color:white}}>送出</Text>
                      </TouchableOpacity>
                      </View>
                  </View>
              </View>
              </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
          </Modal>
        </View>
    );


}


export default Reporttest;
