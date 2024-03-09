import React,{useState} from 'react';
import { Text, View , TouchableOpacity, Image,Modal,TextInput, Platform ,TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';



// Styled components
import {
    Colors,
} from './../components/styles'


//colors
const {holderwords,orange,white} = Colors;

const Reporttest = ()=>{

    const handlePressOutside = () => {
        Keyboard.dismiss(); 
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
        aspect: [15, 15],
        quality: 1,
      });
  
      if (!result.canceled) {
        const newImages = result.assets.map(asset => asset.uri);
        setImages([...images, ...newImages]);
      }
    };

    

    const [text, setText] = useState('毛孩有甚麼異常狀況嗎'); 
    const [text2, setText2] = useState('毛孩有甚麼異常狀況嗎'); 
    const [text3, setText3] = useState('請簡述您的退養原因'); 

    const [modalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => {setModalVisible(true);};
    const handleCloseModal = () => {setModalVisible(false);};
    const handleSaveText = () => {handleCloseModal();};   //API
    const [modalVisible2, setModalVisible2] = useState(false);
    const handleOpenModal2 = () => {setModalVisible2(true);};
    const handleCloseModal2 = () => {setModalVisible2(false);};
    const handleSaveText2 = () => {handleCloseModal2();};   //API

    return (
        <View style={{position:"absolute",height:'6%',width:'110%',top:"75%"}}>
                <TouchableOpacity onPress={handleOpenModal} style={{position:"absolute", backgroundColor:orange,width:'24%',height:'100%',top:'0%',left:'37%',borderRadius:30}}>
                    <Text style={{fontSize:16,textAlign:'center',color:white,marginTop:"10%"}}>回報</Text>
                </TouchableOpacity>
      
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleCloseModal}
                    >
                    <TouchableWithoutFeedback onPress={handlePressOutside}>
                    
                  
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <View style={{ width:'100%', height:'10%',backgroundColor:orange,flexDirection:'row',justifyContent:'center',flexDirection:'row',borderTopLeftRadius:30,borderTopRightRadius:30,top:'30%'}}
                            >
                                                                                      
                                                                                    
                            <View style={{justifyContent:'center'}}>
                                <Text style={{fontSize:25,color:'#fff'}}>寵物回報</Text>
                            </View>

                            
                        </View>
                        <View style={{ backgroundColor:'#EEEEEE', padding: 20, width:'100%',height:'62%',top:'14.5%'}}>
                            <Text style={{fontSize:16}}>新增照片(至多8張)</Text>

                            <View style={{backgroundColor:white,height:'40%',borderRadius:20,flexDirection:'row', alignItems: 'center',top:5}}>
                                
                                <View style={{ flexDirection: 'row' , flexWrap: 'wrap',height:80,width:'100%',bottom:'27%',left:'1.5%'}}>
                                        {images.slice(0, 8).map((uri, index) => (
                                        <Image key={index} source={{ uri }} style={{ width:80, height: 80, margin: 5 ,padding:10,borderRadius:10}} />
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

                            <Text style={{top:'9%',fontSize:16,color:holderwords,left:'35%'}}>飼養上遇到問題嗎</Text>
                            <TouchableOpacity onPress={handleOpenModal2} style={{ padding: 10, backgroundColor:'#787878', left:'73%',alignItems: 'center', borderRadius: 20 ,width:100,top:'3%'}}>
                                <Text style={{color:white}}>我要諮詢</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                </Modal>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible2}
                    onRequestClose={handleCloseModal2}
                    >
                    <TouchableWithoutFeedback onPress={handlePressOutside}>
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <View style={{ width:'100%', height:'8%',backgroundColor:orange,flexDirection:'row',justifyContent:'center',flexDirection:'row',borderTopLeftRadius:30,borderTopRightRadius:30,top:'43%'}}
                            >
                                                                                      
                                                                                    
                            <View style={{justifyContent:'center',bottom:5}}>
                                <Text style={{fontSize:25,color:'#fff'}}>退養申請</Text>
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
                </Modal>
                
        </View>

        





                                        
    );


}


export default Reporttest;
