import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View , TouchableOpacity, SafeAreaView,ScrollView, Dimensions} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// formik
import { Formik } from 'formik';
// Styled components
import {
    Colors,
    Lefttextorange,
    Headsticker,
    UserTextInput,
    ImageContainer,
    UpperLefttextorange,
    Labeltext,
    UserFormArea,
    TOPLabeltext,
} from './../components/styles'
//colors
const {holderwords} = Colors;


     
    
const Setting = ()=>{

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

    return (
    <SafeAreaView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ width:'100%', height: calculateAbsoluteheight(12),backgroundColor: 'white'}}>
                <Lefttextorange>吳執行長</Lefttextorange>    
            </View>
                           
            <ImageContainer>
                <StatusBar style='dark'/>
                <Headsticker resizeMode = 'cover' source={require('./../assets/Frame1.png')}/>
                <View style={{ width: '100%', height:calculateAbsoluteheight(2)}}>
                    <UpperLefttextorange>提醒設定</UpperLefttextorange>
                </View> 
            </ImageContainer>
            <View style={{flex:1,flexDirection:'row',justifyContent: 'center'}}>
                <TouchableOpacity 
                    style={{backgroundColor:'#fff',padding:10,borderRadius:10,height:calculateAbsoluteheight(6),width:'80%',right:'3%',bottom:calculateAbsoluteheight(6),justifyContent: 'space-between',flexDirection:'row'}}
                    onPress={handleToggleOptions}>
                    
                    <Text style={{fontSize:17}}>提醒頻率</Text>
                    <Text style={{fontSize:17,color:holderwords}}>{selectedFrequency}</Text>

                    {showOptions && (
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 10, padding: 10,width:'106%' }}>
                            {FrequencyOptions.map((frequency, index) => (
                                <TouchableOpacity key={index} onPress={() => handleChange(frequency)}>
                                    <Text style={{ fontSize: 15 ,left:'30%'}}>{frequency}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                    )}      
                </TouchableOpacity>
            </View>
            

            <View style={{ width: '100%', height:calculateAbsoluteheight(2),bottom:calculateAbsoluteheight(9)}}>
                <UpperLefttextorange>個人設定</UpperLefttextorange>
            </View> 
                       
            <Formik
                initialValues={{name: '', userid: '',Houseaddress:'', Correspondenceaddress:'',Phonenumber:'',Intro:''}}
                    onSubmit={(values)=>{console.log(values);}}>   
                  {({handleChange, handleBlur, values})=>(<UserFormArea>
                    
                    <TOPTextInput 
                        style = {{borderTopRightRadius: 10}}
                        label = '        姓名'
                        placeholder ='        請輸入您的姓名'
                        numberOfLines={1}
                        ellipsizemode='tail'
                        placeholderTextColor = {holderwords}          
                        onChangeText = {handleChange('name')}
                        onBlur = {handleBlur('name')}
                        value = {values.name}
                        backgroundColor = 'white'
                    />

                   


                    <MyTextInput 
                        label = '    身分證'
                        placeholder ='    請輸入您的身分證'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('userid')}
                        onBlur = {handleBlur('userid')}
                        value = {values.userid}
                        backgroundColor = 'white'
                        keyboardType = 'email-address'
                        
                    />
                    <MyTextInput 
                        label = '戶籍地址'
                        placeholder ='請輸入您的戶籍地址'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('Houseaddress')}
                        onBlur = {handleBlur('Houseaddress')}
                        value = {values.Houseaddress}
                        backgroundColor = 'white'
                    />
                    <MyTextInput 
                        label = '通訊地址'
                        placeholder ='請輸入您的通訊地址'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('Correspondenceaddress')}
                        onBlur = {handleBlur('Correspondenceaddress')}
                        value = {values.Correspondenceaddress}
                        backgroundColor = 'white'
                    />
                    <MyTextInput 
                        label = '手機號碼'
                        placeholder ='請輸入您的手機號碼'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('Phonenumber')}
                        onBlur = {handleBlur('Phonenumber')}
                        value = {values.Phonenumber}
                        backgroundColor = 'white'
                        
                    />

                    <View style={{flexDirection:'row',justifyContent: 'center'}}>
                        <TouchableOpacity 
                            style={{
                                backgroundColor:'#fff',
                                padding:10,height:'100%',
                                width:'80%',
                                justifyContent: 'space-between',
                                flexDirection:'row',
                                right:'10%',
                                borderBottomRightRadius: 10,
                                borderBottomLeftRadius: 10}}
                                onPress={showDatepicker}>
                    
                        <Text style={{fontSize:17}}>         生日</Text>
                        <Text style={{fontSize:17,color:holderwords}}>  {date.toISOString().slice(0,10).replace(/-/g,"/")}  </Text>

                        {show && (
                            <DateTimePicker
                            value={date}
                            mode={mode}                         
                            onChange={onChange}
                            />
                    )}
                    
                        </TouchableOpacity>
                
                        </View>

                                     
                    <View style={{ width: '100%', height: '8%',top:'6%' }}>
                        <UpperLefttextorange>自我介紹</UpperLefttextorange>
                    </View>

                    <TextInput 
                        overflow= 'hidden'
                        label = '自我介紹'
                        placeholder ='    請介紹您自己讓機構更認識您'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('Intro')}
                        onBlur = {handleBlur('Intro')}
                        value = {values.Intro}
                        backgroundColor = 'white'
                        borderRadius={10}
                        
                    />

             </UserFormArea>)}

                     
            </Formik>
  
        </ScrollView>  
        </SafeAreaView>

  )
}

const MyTextInput = ({ label, ...props }) => {
    return (
        <View style={{flexDirection:'row',height:'14%',width:'59%'}}>
            <Labeltext>{label}</Labeltext>
            
            <UserTextInput {...props} />
            
        </View>
        
    );
}

const TOPTextInput = ({ label, ...props }) => {
    return (
        <View style={{flexDirection:'row',height:'14%',width:'59%'}}>
            <TOPLabeltext>{label}</TOPLabeltext>
            
            <UserTextInput {...props} />
            
        </View>
        
    );
}

const TextInput = ({...props }) => {
    return (
        <View style={{flexDirection:'row',height:'14%',top:'5%',width:'80%'}}>
           
            
            <UserTextInput {...props} />
            
        </View>
        
    );
}


export default Setting;

