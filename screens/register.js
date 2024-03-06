import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Button } from 'react-native';
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
    const storeData = async (name,value) =>{
      try{
        await AsyncStorage.setItem(name,value);
      }catch(e){
        console.log(e);
      }
    };
    const RegisterSchema = Yup.object().shape({
      password: Yup.string()
        .min(10, '太短!')
        .required('Required')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/,"密碼須超過10個字母, 且須包含大小寫和特殊字元"),
      passwordagain: Yup.string()
        .min(10)
        .oneOf([Yup.ref('password')], "輸入錯誤")
        .required('請再次確認您的密碼'),
      email: Yup.string().email('Invalid email').required('Required'),
    });
   
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
                  initialValues={{email: '', password: '',passwordagain:''}}
                  validationSchema={RegisterSchema}
                  onSubmit={values=>{
                    const jsonValue = JSON.stringify(values);
                    storeData("RegisterData",jsonValue);
                    navigation.navigate("Login");
                    }} 
                >
                  {({values, errors, touched, handleChange, setFieldTouched, isValid ,handleSubmit})=>(<StyledFormArea>
                    <MyTextInput 
                        label = 'Email Address'
                        icon = 'mail'
                        placeholder ='輸入信箱地址'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('email')}
                        onBlur = {()=>{setFieldTouched('email')}}
                        value = {values.email}
                        keyboardType = 'email-address'
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errtxt}>{errors.email}</Text>
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
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop:20}}>
                        <View style={{flex: 1, height: 2, backgroundColor:'orange'}} />
                        <View>
                            <Text style={{textAlign: 'center', paddingHorizontal:8,color:'orange'}}>或使用其他方式註冊</Text>
                        </View>
                        <View style={{flex: 1, height: 2, backgroundColor: 'orange'}} />
                    </View>
                    <View style={styles.rowContainer}>
                        <CircleButton onPress={()=>navigation.navigate("Setting")} logoName = "logo-google" color = "orange"/>

                        <CircleButton onPress={()=>navigation.navigate("Adoptformik")} logoName = "logo-apple" color = "orange"/>
                        <CircleButton onPress={()=>navigation.navigate("Report")} logoName = "logo-facebook" color = "orange"/>
                    </View>
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
