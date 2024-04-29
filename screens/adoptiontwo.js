import React,{useState,useEffect} from 'react';
import { Text, View , TouchableOpacity, SafeAreaView,ScrollView,Modal,TextInput,KeyboardAvoidingView,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Styled components
import {
    Colors,
} from './../components/styles'

//colors
const {holderwords,orange,gray,white} = Colors;

import AsyncStorage from '@react-native-async-storage/async-storage';


const Adoptformik2 = ({route})=>{ 
    const navigation = useNavigation();
    const [family_composition, setText01] = useState('');       
    const [pet_breed, setText02] = useState('');       
    const [ care_exp, setText03] = useState('');      
    const [reason, setText04] = useState('');       
    const [care_plan, setText05] = useState('');       
    const [addition, setText06] = useState('');  

    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible5, setModalVisible5] = useState(false);
    const [modalVisible6, setModalVisible6] = useState(false);

    const handleOpenModal1 = () => {setModalVisible1(true);};
    const handleOpenModal2 = () => {setModalVisible2(true);};
    const handleOpenModal3 = () => {setModalVisible3(true);};
    const handleOpenModal4 = () => {setModalVisible4(true);};
    const handleOpenModal5 = () => {setModalVisible5(true);};
    const handleOpenModal6 = () => {setModalVisible6(true);};

    const handleCloseModal1 = () => {setModalVisible1(false);};
    const handleCloseModal2 = () => {setModalVisible2(false);};
    const handleCloseModal3 = () => {setModalVisible3(false);};
    const handleCloseModal4 = () => {setModalVisible4(false);};
    const handleCloseModal5 = () => {setModalVisible5(false);};
    const handleCloseModal6 = () => {setModalVisible6(false);};


    const handleSaveText1 = () => {handleCloseModal1();saveData();}; //API
    const handleSaveText2 = () => {handleCloseModal2();saveData();}; //API
    const handleSaveText3 = () => {handleCloseModal3();saveData();}; //API
    const handleSaveText4 = () => {handleCloseModal4();saveData();}; //API
    const handleSaveText5 = () => {handleCloseModal5();saveData();}; //API
    const handleSaveText6 = () => {handleCloseModal6();saveData();}; //API

  


/////////////////////////////下拉式選單//////////////////////////////////////
    const [ current_pets,setSelected01] = useState('');        
    const [monthly_care_budge,setSelected02] = useState('');        
    const [monthly_salary,setSelected03] = useState('');        
    const [allergies,setSelected04] = useState('');             
  
 


    const [showOptions1, setShowOptions1] = useState(false);
    const [showOptions2, setShowOptions2] = useState(false);
    const [showOptions3, setShowOptions3] = useState(false);
    const [showOptions4, setShowOptions4] = useState(false);



    
    

    const Options1    = ['0隻','1隻','2隻','3隻','4隻','5隻','5隻以上'];
    const Options2    = ['一千到五千','五千到一萬','一萬到五萬','5萬到10萬','10萬到20萬','20萬到50萬'];
    const Options3    = ['三萬以下','三萬到四萬','四萬到五萬','五萬到六萬','六萬到七萬','七萬到八萬','八萬到九萬','九萬到十萬','十萬以上'];
    const Options4    = ['是','否'];

    const handleToggleOptions1 = () => {setShowOptions1(!showOptions1);};
    const handleToggleOptions2 = () => {setShowOptions2(!showOptions2);};
    const handleToggleOptions3 = () => {setShowOptions3(!showOptions3);};
    const handleToggleOptions4 = () => {setShowOptions4(!showOptions4);};



    const handleChange1 = (a1) => {setSelected01(a1);setShowOptions1(false);saveData();}
    const handleChange2 = (a2) => {setSelected02(a2);setShowOptions2(false);saveData();}
    const handleChange3 = (a3) => {setSelected03(a3);setShowOptions3(false);saveData();}
    const handleChange4 = (a4) => {setSelected04(a4);setShowOptions4(false);saveData();}

    //////////////////////////////////////////儲存////////////////////////////
    useEffect(() => {
        retrieveData();
    }, []);

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('family_composition', family_composition);
            await AsyncStorage.setItem('pet_breed', pet_breed);
            await AsyncStorage.setItem(' care_exp',  care_exp);
            await AsyncStorage.setItem('reason', reason);
            await AsyncStorage.setItem('care_plan', care_plan);
            await AsyncStorage.setItem('addition', addition);

            await AsyncStorage.setItem(' current_pets',  current_pets);
            await AsyncStorage.setItem('monthly_care_budge', monthly_care_budge);
            await AsyncStorage.setItem('monthly_salary', monthly_salary);
            await AsyncStorage.setItem('allergies', allergies);
        } catch (error) {
            console.error('Error saving data: ', error);
        }
    };
    
    const retrieveData = async () => {
        try {
            const value1 = await AsyncStorage.getItem('family_composition');
            setText01(value1 || '');
            const value2 = await AsyncStorage.getItem('pet_breed');
            setText02(value2 || '');
            const value3 = await AsyncStorage.getItem(' care_exp');
            setText03(value3 || '');
            const value4 = await AsyncStorage.getItem('reason');
            setText04(value4 || '');
            const value5 = await AsyncStorage.getItem('care_plan');
            setText05(value5 || '');
            const value6 = await AsyncStorage.getItem('addition');
            setText06(value6 || '');

            const selectedValue1 = await AsyncStorage.getItem(' current_pets');
            setSelected01(selectedValue1 || '');
            const selectedValue2 = await AsyncStorage.getItem('monthly_care_budge');
            setSelected02(selectedValue2 || '');
            const selectedValue3 = await AsyncStorage.getItem('monthly_salary');
            setSelected03(selectedValue3 || '');
            const selectedValue4 = await AsyncStorage.getItem('allergies');
            setSelected04(selectedValue4 || '');
        } catch (error) {
            console.error('Error retrieving data: ', error);
        }
    };
    const {petuuid} = route.params;
    const handleComplete = async () => {
        const data = await AsyncStorage.getItem("UUID");
        const uid = await JSON.parse(data);
    
          

        try {
            const requestData = {
                "family_composition":family_composition|| '未填寫',
                "pet_breed":pet_breed|| '未填寫',
                "ownership_exp":care_exp|| '未填寫',
                "reason":reason|| '未填寫',
                "care_plan":care_plan|| '未填寫',
                "addition":addition|| '未填寫',
                "current_pets":current_pets|| '未填寫',
                "monthly_care_budget":monthly_care_budge|| '未填寫',
                "monthly_salary":monthly_salary|| '未填寫',
                "allergies":allergies|| '未填寫',
               
            };

            const data ={
                "status":'1',
            }
            const response = await fetch("https://lively-nimbus-415015.de.r.appspot.com/api/member-detail/patch/" + uid +"/", 
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(requestData),
            });
            console.log(uid,petuuid);
            const response2 = await fetch("https://lively-nimbus-415015.de.r.appspot.com/api/member_pet_status/patch/" + uid +"/"+ petuuid +"/",
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
              }
            if (!response2.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
              }
              Alert.alert('','感謝您認真填寫表單，請等待送養機構審核(約3~5天)，如有通過審核將會於系統提醒，還請留意，謝謝!')
            navigation.navigate("TinderScreen");
         } 
         catch (error) {
             console.error('Error submitting data: ', error);
           Alert.alert('Error', '請聯繫客服');
         }
    };




    return(
        <SafeAreaView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={{ flexGrow: 1, height: '170%',flexDirection:'column',justifyContent:'space-between'}} style={{flex:1}}>

            <View style={{height:"7%",backgroundColor:orange,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                
                <TouchableOpacity onPress={()=>navigation.navigate("Adoptformik")}>
                    <Text style={{fontSize:20,left:15,color:'#fff'}}>上一頁</Text>
                </TouchableOpacity>
                                                                           
                                                                                                            {/* 上面橘色框框 */}
                
                    <Text style={{fontSize:25,color:'#fff'}}>上傳認養資料  </Text>
                

                
                <TouchableOpacity onPress={handleComplete} >
                    <Text style={{fontSize:20,right:15,color:'#fff'}}>完成</Text>
                    
                </TouchableOpacity>
                
            </View>
            
            

            <View style={{flex:10,flexDirection:'column',justifyContent:'flex-start'}}>

            <Text  style={{fontSize:20,left:20,margin:5}}>您的家庭成員組成</Text>
            <View style={{flexDirection:'row',justifyContent: 'center',top:9}}>
            <TouchableOpacity onPress={handleOpenModal1} style={{ padding: 20, backgroundColor: '#fff',width:'80%',borderRadius:20}}>
                <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{family_composition}</Text>
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
                        <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:400,flexDirection:'column',justifyContent:'space-between'}}>
                            <Text style={{fontSize:15,margin:5}}>您的家庭成員組成可輸入:獨居、夫妻、情侶、室友、新生兒、10歲以下孩童、10歲以上孩童、20 歲以上家人、65歲以上長輩(可複選)</Text>
                            <TextInput
                            multiline={true} 
                            style={{ height:'50%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                            onChangeText={setText01}
                            value={family_composition}
                            />
                            <TouchableOpacity onPress={handleSaveText1} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5 ,}}>
                                <Text>保存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </KeyboardAvoidingView>
            </Modal>

            <View style={{margin:5}}></View>
                
                <Text  style={{fontSize:20,left:20,margin:5}}>飼養寵物的數量（現在）</Text>
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
                                onPress={handleToggleOptions1}>
                            <Text style={{fontSize:19,color:holderwords}}>  { current_pets}  </Text>
                            {showOptions1 && (
                            <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 20, padding: 10,width:'106%',}}>
                                {Options1.map((a1, index) => (
                                     <View style={{marginBottom:10}}>
                                    <TouchableOpacity key={index} onPress={() => handleChange1(a1)}>
                                        <Text style={{ fontSize: 20 ,textAlign:'center'}}>  {a1}  </Text>
                                    </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                            )}         
                        </TouchableOpacity>             
                    </View>

            <View style={{margin:5}}></View>  
            <Text  style={{fontSize:20,left:20,margin:5}}>您家中寵物類型(現在)</Text>
            <View style={{flexDirection:'row',justifyContent: 'center',top:9}}>
            <TouchableOpacity onPress={handleOpenModal2} style={{ padding: 20, backgroundColor: '#fff',width:'80%',borderRadius:20}}>
                <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{pet_breed}</Text>
            </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={handleCloseModal2}
                >
                    <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:300,flexDirection:'column',justifyContent:'space-between'}}>
                            <Text style={{fontSize:15,margin:5}}>請問您家中寵物類型?可輸入:狗狗、貓貓、兔子、鳥類、烏龜、其他(可複選)</Text>
                            <TextInput
                            multiline={true} 
                            style={{ height:'40%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                            onChangeText={setText02}
                            value={pet_breed}
                            />
                            <TouchableOpacity onPress={handleSaveText2} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5}}>
                                <Text>保存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </KeyboardAvoidingView>
            </Modal>

            <View style={{margin:5}}></View>  

            <Text  style={{fontSize:20,left:20,margin:5}}>補充您的寵物飼養經驗</Text>
            <View style={{flexDirection:'row',justifyContent: 'center',top:9,height:100}}>
            <TouchableOpacity onPress={handleOpenModal3} style={{ padding: 20, backgroundColor: '#fff',width:'80%',borderRadius:20}}>
                <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{ care_exp}</Text>
            </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible3}
                onRequestClose={handleCloseModal3}
                >
                    <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:300,flexDirection:'column',justifyContent:'space-between'}}>
                            <Text style={{fontSize:15,margin:5}}>請補充您的寵物飼養經驗</Text>
                            <TextInput
                            multiline={true} 
                            style={{ height:'50%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                            onChangeText={setText03}
                            value={ care_exp}
                            />
                            <TouchableOpacity onPress={handleSaveText3} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5}}>
                                <Text>保存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </KeyboardAvoidingView>
            </Modal>

            <View style={{margin:5}}></View> 

            <Text  style={{fontSize:20,left:20,margin:5}}>您領養寵物的原因</Text>
            <View style={{flexDirection:'row',justifyContent: 'center',top:9,height:100}}>
            <TouchableOpacity onPress={handleOpenModal4} style={{ padding: 20, backgroundColor: '#fff',width:'80%',borderRadius:20}}>
                <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{reason}</Text>
            </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible4}
                onRequestClose={handleCloseModal4}
                >
                    <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:300,flexDirection:'column',justifyContent:'space-between'}}>
                            <Text style={{fontSize:15,margin:5}}>請問您領養寵物的原因</Text>
                            <TextInput
                            multiline={true} 
                            style={{ height:'50%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                            onChangeText={setText04}
                            value={reason}
                            />
                            <TouchableOpacity onPress={handleSaveText4} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5}}>
                                <Text>保存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </KeyboardAvoidingView>
            </Modal>

            <View style={{margin:5}}></View> 

            <Text  style={{fontSize:20,left:20,margin:5}}>您的寵物飼養、照顧計畫</Text>
            <View style={{flexDirection:'row',justifyContent: 'center',top:9,height:100}}>
            <TouchableOpacity onPress={handleOpenModal5} style={{ padding: 20, backgroundColor: '#fff',width:'80%',borderRadius:20}}>
                <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{care_plan}</Text>
            </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible5}
                onRequestClose={handleCloseModal5}
                >
                    <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:400,flexDirection:'column',justifyContent:'space-between'}}>
                            <Text style={{fontSize:15,margin:5}}>請問您的寵物飼養、照顧計畫，可補充您對欲領養的品種了解，讓送養機構知道你準備好嘍！</Text>
                            <TextInput
                            multiline={true} 
                            style={{ height:'50%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                            onChangeText={setText05}
                            value={care_plan}
                            />
                            <TouchableOpacity onPress={handleSaveText5} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5}}>
                                <Text>保存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </KeyboardAvoidingView>
            </Modal>

            <View style={{margin:5}}></View>
                
            <Text  style={{fontSize:20,left:20,margin:5}}>您的寵物飼養預算（每月）</Text>
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
                            onPress={handleToggleOptions2}>
                        <Text style={{fontSize:19,color:holderwords}}>  {monthly_care_budge}  </Text>
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
                <Text  style={{fontSize:20,left:20,margin:5}}>您的經濟狀況（每月）</Text>
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
                            onPress={handleToggleOptions3}>
                        <Text style={{fontSize:19,color:holderwords}}>  {monthly_salary}  </Text>
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
                <Text  style={{fontSize:20,left:20,margin:5}}>您是否有寵物過敏狀況？</Text>
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
                            onPress={handleToggleOptions4}>
                        <Text style={{fontSize:19,color:holderwords}}>  {allergies}  </Text>
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
                <Text  style={{fontSize:20,left:20,margin:5}}>您有其他想要補充或是提問的事情嗎？</Text>
                    <View style={{flexDirection:'row',justifyContent: 'center',top:9,height:100}}>
                        <TouchableOpacity onPress={handleOpenModal6} style={{ padding: 20, backgroundColor: '#fff',width:'80%',borderRadius:20}}>
                            <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{addition}</Text>
                        </TouchableOpacity>
                    </View>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible6}
                onRequestClose={handleCloseModal6}
                >
                    <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:300,flexDirection:'column',justifyContent:'space-between'}}>
                            <Text style={{fontSize:15,margin:5}}>您是否有其他想要補充或是提問的事情</Text>
                            <TextInput
                            multiline={true} 
                            style={{ height:'50%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                            onChangeText={setText06}
                            value={addition}
                            />
                            <TouchableOpacity onPress={handleSaveText6} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5}}>
                                <Text>保存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </KeyboardAvoidingView>
            </Modal>                   







            </View>
            

            </ScrollView>
        </SafeAreaView>
        
    )

}

export  default Adoptformik2;