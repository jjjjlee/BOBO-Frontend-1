import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Button,Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Formik and Yup for managing form
import { Formik } from 'formik';
import * as Yup from 'yup';

// icons
import {Octicons} from '@expo/vector-icons'

// Styled components
import {
    LoginButtonContainer,
    LoginLogoContainer,
    LoginContainer,
    LoginFormContainer,
    PageLogo,
    LoginTitle,
    LoginSubTitle,
    StyledFormArea,
    LeftIcon,
    
    StyledTextInput,
    
    Colors,
} from './../components/styles'

//Buttons
import { LongThinButton,CircleButton } from '../components/buttons';
import { navOptions } from '../navigation/option';

// Import Navigation
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//colors
const {brand,holderwords, orange} = Colors;

const Register = ({route})=>{

    const navigation = useNavigation();
    
    const RegisterSchema = Yup.object().shape({
      password: Yup.string()
        .min(10, '密碼須超過10個字母!')
        .required('Required'),
      passwordagain: Yup.string()
        .min(10)
        .oneOf([Yup.ref('password')], "輸入錯誤")
        .required('請再次確認您的密碼'),
      phone: Yup.string().min(10,"請輸入10碼手機號碼").max(10,"請輸入10碼手機號碼").required('Required'),
    });
    
    const handleSubmit = async (values) =>{
      values.name = "emptyname";
      values.email = "emptymail@gmail.com"
      const jsonValue = JSON.stringify(values);
      // Pushing data
      try{
        const response = await fetch("https://lively-nimbus-415015.de.r.appspot.com/api/member_sign_up/",{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonValue
        });

        if (response.ok){
          const message = await response.json();
          console.log(message);
          Alert.alert('成功', '您已註冊成功');
          navigation.navigate("Login");
        } else{
          const message = await response.json();
          console.log(message);
          Alert.alert('錯誤', '此資料已被註冊過');
        }
      }catch(err){
        console.log("未知錯誤");
        Alert.alert('錯誤', "未知錯誤，請聯繫BOBO人員");
      }
    };

    return (
      <KeyboardAwareScrollView  keyboardShouldPersistTaps={'never'}
        style={{flex:1}}
        showsVerticalScrollIndicator={false}>
        <LoginContainer>
            <LoginLogoContainer>
            <StatusBar style='dark'/>
            <PageLogo resizeMode = 'cover' source={require('./../assets/bobo-logo2.png')}/>
            <LoginTitle>歡迎加入</LoginTitle>
            <LoginSubTitle>輸入您的資訊以繼續</LoginSubTitle>
            </LoginLogoContainer>
            <LoginFormContainer>
                <Formik
                  initialValues={{phone: '', password: '',passwordagain:''}}
                  validationSchema={RegisterSchema}
                  onSubmit={(values)=>{
                    handleSubmit(values)
                  }}
                >
                  {({values, errors, touched, handleChange, setFieldTouched, isValid ,handleSubmit})=>(<StyledFormArea>
                    <MyTextInput 
                        label = 'Phone Number'
                        icon = 'device-mobile'
                        placeholder ='輸入手機號碼'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('phone')}
                        onBlur = {()=>{setFieldTouched('phone')}}
                        value = {values.phone}
                    />
                    {touched.phone && errors.phone && (
                      <Text style={styles.errtxt}>{errors.phone}</Text>
                    )}
                    <MyTextInput 
                        label = 'Password'
                        icon = 'lock'
                        placeholder ='輸入您的密碼'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('password')}
                        onBlur = {()=>{setFieldTouched("password")}}
                        value = {values.password}
                        
                    />
                    {touched.password && errors.password && (
                      <Text style = {styles.errtxt}>{errors.password}</Text>
                    )}
                    <MyTextInput 
                        label = 'Password'
                        icon = 'lock'
                        placeholder ='確認密碼'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('passwordagain')}
                        onBlur = {()=>{setFieldTouched('passwordagain')}}
                        value = {values.passwordagain}
  
                    />
                    {touched.passwordagain && errors.passwordagain &&(
                      <Text style = {styles.errtxt}>{errors.passwordagain}</Text>
                    )}
                    <View style = {{width:"100%",alignItems : 'flex-end'}}>
                      <Button onPress = {()=>{navigation.navigate("Login")}} title = "我已有帳號"  color = {orange} />
                    </View>
                    <View style={{marginTop:20}}>
                      <LongThinButton onPress = {handleSubmit} disable = {!isValid} title = "註冊" backgroundColor = {orange}/>
                    </View>
                  </StyledFormArea>)}
                </Formik>
                
                <LoginButtonContainer>
                    {/* <View style={{flexDirection: 'row', alignItems: 'center', marginTop:20}}>
                        <View style={{flex: 1, height: 2, backgroundColor:'orange'}} />
                        <View>
                            <Text style={{textAlign: 'center', paddingHorizontal:8,color:'orange'}}>或使用其他方式註冊</Text>
                        </View>
                        <View style={{flex: 1, height: 2, backgroundColor: 'orange'}} />
                    </View>
                    <View style={styles.rowContainer}>
                        <CircleButton onPress={()=>{}} logoName = "logo-google" color = "orange"/>

                        <CircleButton onPress={()=>{}} logoName = "logo-apple" color = "orange"/>
                        <CircleButton onPress={()=>{}} logoName = "logo-facebook" color = "orange"/>
                    </View> */}
                </LoginButtonContainer>
            </LoginFormContainer>
        </LoginContainer>
      </KeyboardAwareScrollView>

    );
}

const MyTextInput = ({label, icon, ...props})=>{
    return(<View>
        <LeftIcon>
            <Octicons name = {icon} size = {30} color = {brand}/>
        </LeftIcon>
        <StyledTextInput {...props}/>
    </View>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20, 
      top:10,
      
    },
    errtxt:{
      fontSize:12,
      color:"#FF0D10"
    }
  });



export default Register;
