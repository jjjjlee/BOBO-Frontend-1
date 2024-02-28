import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View , TouchableOpacity, SafeAreaView,ScrollView, Dimensions,Modal,TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


// Styled components
import {
    Colors,
    Headsticker,
    ImageContainer,
} from './../components/styles'

//colors
const {holderwords,orange,gray,white} = Colors;


     
    
const Adoptformik = ()=>{

/////////////////////////////下拉式選單//////////////////////////////////////
    const [selectedHouse, setSelectedHouse] = useState('');
    const [selectedFamily,setSelectedFamily] = useState('');
    const [selectedBudget,setSelectedBudget] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [showOptionsF, setShowOptionsF] = useState(false);
    const [showOptionsB, setShowOptionsB] = useState(false);
    const HouseOptions  = ['公寓', '透天', '套房', '豪宅'];
    const FamilyOptions = ['1','2','3','4','5','6','>6'];
    const BudgetOptions = ['1萬以下','1萬到5萬','5萬到10萬','10萬到20萬','20萬到50萬','50萬到100萬','100萬以上'];

    const handleToggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleToggleOptionsF = () => {
        setShowOptionsF(!showOptionsF);
    };
    const handleToggleOptionsB = () => {
        setShowOptionsB(!showOptionsF);
    };


    const handleChangeF = (Family) => {
        setSelectedFamily(Family);
        setShowOptionsF(false);
    }
    const handleChangeB = (Budget) => {
        setSelectedBudget(Budget);
        setShowOptionsB(false);
    }

    const handleChange = (House) => {
        setSelectedHouse(House);
        setShowOptions(false);
    };

   ////////////////////////////////讀取螢幕長度////////////////////////////////
    const [screenheight, setScreenheight] = useState(Dimensions.get('window').height);
    useEffect(() => {
      const updateScreenheight = () => {
        setScreenheight(Dimensions.get('window').height);
      };
  
      Dimensions.addEventListener('change', updateScreenheight);
  
      
    }, []);
  
    const calculateAbsoluteheight = (percentage) => {
      return (screenheight * percentage) / 100;
    };

////////////////////////////日期/////////////////////////////
    const [date, setDate] = useState(new Date(1376699000000));
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


/////////////////////////////跳出式選單////////////////////////
    const [text, setText] = useState('生活方式包括工作時間、活動水平、是否經常外出等，以確保您有足夠的時間和資源照顧寵物');       //生活方式
    const [text2, setText2] = useState('種類、數量、以及飼養寵物的成功經驗或挑戰');     //寵物經驗
    const [text3, setText3] = useState('每天的散步時間、餵食計畫、定期醫療檢查');       //照顧計畫
    const [text4, setText4] = useState('原因，以及您期望寵物與您家庭的互動方式');       //領養目的
    const [text5, setText5] = useState('有無親友可協助照顧寵物，或是當您外出時的寵物照顧安排');       //應急計畫
    const [text6, setText6] = useState('自行看怎麼輸入，但可以證明您的能力');       //經濟能力
    const [text7, setText7] = useState('自身或同居人是否有過敏情況');       //過敏狀況

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible5, setModalVisible5] = useState(false);
    const [modalVisible6, setModalVisible6] = useState(false);
    const [modalVisible7, setModalVisible7] = useState(false);

    const handleOpenModal = () => {setModalVisible(true);};
    const handleOpenModal2 = () => {setModalVisible2(true);};
    const handleOpenModal3 = () => {setModalVisible3(true);};
    const handleOpenModal4 = () => {setModalVisible4(true);};
    const handleOpenModal5 = () => {setModalVisible5(true);};
    const handleOpenModal6 = () => {setModalVisible6(true);};
    const handleOpenModal7 = () => {setModalVisible7(true);};

    const handleCloseModal = () => {setModalVisible(false);};
    const handleCloseModal2 = () => {setModalVisible2(false);};
    const handleCloseModal3 = () => {setModalVisible3(false);};
    const handleCloseModal4 = () => {setModalVisible4(false);};
    const handleCloseModal5 = () => {setModalVisible5(false);};
    const handleCloseModal6 = () => {setModalVisible6(false);};
    const handleCloseModal7 = () => {setModalVisible7(false);};


    const handleSaveText = () => {handleCloseModal();};   //API
    const handleSaveText2 = () => {handleCloseModal2();}; //API
    const handleSaveText3 = () => {handleCloseModal3();}; //API
    const handleSaveText4 = () => {handleCloseModal4();}; //API
    const handleSaveText5 = () => {handleCloseModal5();}; //API
    const handleSaveText6 = () => {handleCloseModal6();}; //API
    const handleSaveText7 = () => {handleCloseModal7();}; //API





    return(
        <SafeAreaView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={{ flexGrow: 1, height: '200%'}}>

            <View style={{ width:'100%', height: calculateAbsoluteheight(12),backgroundColor:orange,flexDirection:'row',flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>{}} >
                    <Text style={{fontSize:20,left:15,color:'#fff'}}>取消</Text>
                </TouchableOpacity>
                </View>                                                             
                                                                                    {/* 上面橘色框框 */}
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize:25,color:'#fff'}}> 上傳認養資料</Text>
                </View>

                <View style={{justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>{}} >
                    <Text style={{fontSize:20,right:15,color:'#fff'}}>完成</Text>
                </TouchableOpacity>
                </View>
            </View>
                                                                                        {/* 之後需換圖片API */}
            <ImageContainer>
                <StatusBar style='dark'/>                                              
                <Headsticker resizeMode = 'cover' source={require('./../assets/Frame1.png')}/>
            </ImageContainer>

            <Text style={{fontSize:20,textAlign:'left',position:'absolute',top:calculateAbsoluteheight(30),left:'5%'}}>生日</Text>
            
                <View style={{flexDirection:'row',justifyContent: 'center',bottom:calculateAbsoluteheight(40),left:'3%'}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#fff',
                            padding:10,
                            height:calculateAbsoluteheight(6),
                            width:'80%',
                            justifyContent: 'space-between',
                            flexDirection:'row',
                            right:'10%',
                            borderRadius:20
                            }}
                            onPress={showDatepicker}>
                        <Text style={{fontSize:19,color:holderwords}}>  {date.toISOString().slice(0,10).replace(/-/g,"/")}  </Text>
                        {show && (
                            <DateTimePicker
                            value={date}
                            mode={mode}                         
                            onChange={onChange}
                            />
                        )}              
                    </TouchableOpacity>
                </View>

                <Text style={{fontSize:20,textAlign:'left',position:'absolute',top:calculateAbsoluteheight(40),left:'5%'}}>住房狀況</Text>
                <View style={{flexDirection:'row',justifyContent: 'center',bottom:calculateAbsoluteheight(36),left:'3%',zIndex:999}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#fff',
                            padding:10,
                            height:calculateAbsoluteheight(6),
                            width:'80%',
                            justifyContent: 'space-between',
                            flexDirection:'row',
                            right:'10%',
                            borderRadius:20
                            }}
                            onPress={handleToggleOptions}>
                        <Text style={{fontSize:19,color:holderwords}}>  {selectedHouse}  </Text>
                        {showOptions && (
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 20, padding: 10,width:'106%',}}>
                            {HouseOptions.map((House, index) => (
                                 <View style={{marginBottom:10}}>
                                <TouchableOpacity key={index} onPress={() => handleChange(House)}>
                                    <Text style={{ fontSize: 20 ,left:'30%'}}>  {House}  </Text>
                                </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        )}         
                    </TouchableOpacity>             
                </View>

                <Text style={{fontSize:20,textAlign:'left',position:'absolute',top:calculateAbsoluteheight(50),left:'5%'}}>家庭成員數量</Text>
                <View style={{flexDirection:'row',justifyContent: 'center',bottom:calculateAbsoluteheight(32),left:'3%',zIndex:500}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#fff',
                            padding:10,
                            height:calculateAbsoluteheight(6),
                            width:'80%',
                            justifyContent: 'space-between',
                            flexDirection:'row',
                            right:'10%',
                            borderRadius:20
                            }}
                            onPress={handleToggleOptionsF}>
                        <Text style={{fontSize:19,color:holderwords}}>  {selectedFamily}  </Text>                     
                        {showOptionsF && (    
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 20, padding: 10,width:'106%' }}>
                            {FamilyOptions.map((Family, index) => (
                                <TouchableOpacity key={index} onPress={() => handleChangeF(Family)}>
                                    <Text style={{ fontSize: 20 ,left:'30%'}}>  {Family}  </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}                  
                    </TouchableOpacity>               
                </View>

                <Text style={{fontSize:20,textAlign:'left',position:'absolute',top:calculateAbsoluteheight(60),left:'5%'}}>預算</Text>
                <View style={{flexDirection:'row',justifyContent: 'center',bottom:calculateAbsoluteheight(28),left:'3%',zIndex:300}}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#fff',
                            padding:10,
                            height:calculateAbsoluteheight(6),
                            width:'80%',
                            justifyContent: 'space-between',
                            flexDirection:'row',
                            right:'10%',
                            borderRadius:20
                            }}
                            onPress={handleToggleOptionsB}>
                        <Text style={{fontSize:19,color:holderwords}}>  {selectedBudget}  </Text>
                        {showOptionsB && ( 
                        <View style={{position: 'absolute', backgroundColor: '#fff', borderRadius: 20, padding: 10,width:'106%' }}>
                            {BudgetOptions.map((Budget, index) => (
                                <View style={{marginBottom:10}}>
                                <TouchableOpacity key={index} onPress={() => handleChangeB(Budget)}>
                                    <Text style={{ fontSize: 17 ,left:'30%'}}> {Budget} </Text>
                                </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )} 
                    </TouchableOpacity>
                </View>
                            
                <Text style={{fontSize:20,textAlign:'left',position:'absolute',top:calculateAbsoluteheight(70),left:'5%'}}>生活方式</Text>
                <TouchableOpacity onPress={handleOpenModal} style={{ padding: 20, backgroundColor: '#fff',bottom:calculateAbsoluteheight(24),width:'80%',height:calculateAbsoluteheight(12),left:'11.5%',borderRadius:20}}>
                    <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{text}</Text>
                </TouchableOpacity>
      
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleCloseModal}
                    >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:'30%'}}>
                            <TextInput
                                multiline={true} 
                                style={{ height:'60%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                                onChangeText={setText}
                                value={text}
                           />
                           <TouchableOpacity onPress={handleSaveText} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5 ,}}>
                                <Text>保存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

      <Text style={{fontSize:20,textAlign:'left',position:'absolute',top:calculateAbsoluteheight(86),left:'5%'}}>寵物經驗</Text>
      <TouchableOpacity onPress={handleOpenModal2} style={{ padding: 20, backgroundColor: '#fff',bottom:calculateAbsoluteheight(20),height:calculateAbsoluteheight(12),width:'80%',left:'11.5%',borderRadius:20}}>
            <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{text2}</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={handleCloseModal2}
        >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:'30%'}}>
            <TextInput
                multiline={true} 
                style={{ height:'60%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                onChangeText={setText2}
                value={text2}
            />
            <TouchableOpacity onPress={handleSaveText2} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5 ,}}>
              <Text>保存</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={{fontSize:20,textAlign:'left',position:'absolute',top:calculateAbsoluteheight(102),left:'5%'}}>照顧計畫</Text>
      <TouchableOpacity onPress={handleOpenModal3} style={{ padding: 20, backgroundColor: '#fff',bottom:calculateAbsoluteheight(16),height:calculateAbsoluteheight(12),width:'80%',left:'11.5%',borderRadius:20}}>
        <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{text3}</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={handleCloseModal3}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:'30%'}}>
            <TextInput
                multiline={true} 
                style={{ height:'60%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                onChangeText={setText3}
                value={text3}
            />
            <TouchableOpacity onPress={handleSaveText3} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5 ,}}>
              <Text>保存</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={{fontSize:20,textAlign:'left',position:'absolute',top:calculateAbsoluteheight(118),left:'5%'}}>領養目的</Text>
      <TouchableOpacity onPress={handleOpenModal4} style={{ padding: 20, backgroundColor:'#fff',bottom:calculateAbsoluteheight(12),height:calculateAbsoluteheight(12),width:'80%',left:'11.5%',borderRadius:20}}>
        <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{text4}</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible4}
        onRequestClose={handleCloseModal4}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:'30%'}}>
            <TextInput
                multiline={true} 
                style={{ height:'60%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                onChangeText={setText4}
                value={text4}
            />
            <TouchableOpacity onPress={handleSaveText4} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5 ,}}>
              <Text>保存</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={{fontSize:20,textAlign:'left',position:'absolute',top:calculateAbsoluteheight(134),left:'5%'}}>應急計畫</Text>
      <TouchableOpacity onPress={handleOpenModal5} style={{ padding: 20, backgroundColor: '#fff',bottom:calculateAbsoluteheight(8),height:calculateAbsoluteheight(12),width:'80%',left:'11.5%',borderRadius:20}}>
        <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{text5}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible5}
        onRequestClose={handleCloseModal5}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:'30%'}}>
            <TextInput
                multiline={true} 
                style={{ height:'60%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                onChangeText={setText5}
                value={text5}
            />
            <TouchableOpacity onPress={handleSaveText5} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5 ,}}>
              <Text>保存</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={{fontSize:20,textAlign:'left',position:'absolute',top:calculateAbsoluteheight(150),left:'5%'}}>經濟能力</Text>
      <TouchableOpacity onPress={handleOpenModal6} style={{ padding: 20, backgroundColor: '#fff',bottom:calculateAbsoluteheight(4),height:calculateAbsoluteheight(12),width:'80%',left:'11.5%',borderRadius:20}}>
        <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{text6}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible6}
        onRequestClose={handleCloseModal6}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:'30%'}}>
            <TextInput
                multiline={true} 
                style={{ height:'60%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                onChangeText={setText6}
                value={text6}
            />
            <TouchableOpacity onPress={handleSaveText6} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5 ,}}>
              <Text>保存</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        <Text style={{fontSize:20,textAlign:'left',position:'absolute',top:calculateAbsoluteheight(166),left:'5%'}}>經濟狀況</Text>
            <TouchableOpacity onPress={handleOpenModal7} style={{ padding: 20, backgroundColor: '#fff',bottom:calculateAbsoluteheight(0),height:calculateAbsoluteheight(12),width:'80%',left:'11.5%',borderRadius:20}}>
                <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{text7}</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible7}
                onRequestClose={handleCloseModal7}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:'30%'}}>
                        <TextInput
                            multiline={true} 
                            style={{ height:'60%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                            onChangeText={setText7}
                            value={text7}
                        />
                    <TouchableOpacity onPress={handleSaveText7} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5 ,}}>
                        <Text>保存</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </ScrollView>
        </SafeAreaView>
        
    )

}

export  default Adoptformik;