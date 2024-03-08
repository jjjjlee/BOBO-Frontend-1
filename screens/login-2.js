import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, StyleSheet ,ScrollView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// formik
import { Formik } from 'formik';

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
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
} from './../components/styles'

//Buttons
import { LongThinButton,CircleButton } from '../components/buttons';
import { useNavigation } from '@react-navigation/native';


//colors
const {brand,holderwords, orange} = Colors;

//AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login2 = ()=>{
    const navigation = useNavigation();
    const [authMail, setauthMail] = useState("");
    const [authPassword, setauthPassword] = useState("");
    // fetchData function
    const getToken = async (values)=>{
        fetch("api",{
            method:"POST",
            headers: {},
            body:{
                "email":values.email,
                "password":values.password
            },
        }).then(res=>{
            const data = res.json();
            if(/* the token exist */ true){
                /* 
                Save the token to asyn-storage 
                removeLikeCaredLocalStorage();
                navigate to the HomeTab
                */console.log("Get Token")
            }else{
                console.log("Get Token Failed")
                /*
                Alert.alert('Message','You enter the wrong email or password') -->Let user press button and repeate
                */}
        })
    }


    // Clean the local storage
    const removeLikeCardsLocalStorage = async ()=>{
      await AsyncStorage.removeItem("LikeCards")
      return true;
    }
    

    return (
        <KeyboardAwareScrollView style={{flex:1}} keyboardShouldPersistTaps={"never"} showsVerticalScrollIndicator={false}>
        <LoginContainer>
            <LoginLogoContainer>
              <StatusBar style='dark'/>
              <PageLogo resizeMode = 'cover' source={require('./../assets/bobo-logo2.png')}/>
              <LoginTitle>歡迎回來</LoginTitle>
              <LoginSubTitle>輸入您的資訊以繼續</LoginSubTitle>
            </LoginLogoContainer>
            <LoginFormContainer>
                <Formik
                  initialValues={{email: '', password: ''}}
                  validate = {values => {
                    const errors = {};
                    if(values.email !== authMail || values.password !== authPassword){
                      errors.password = "Wrong password or Email";
                    }
                    return errors;
                  }}
                  onSubmit={(values)=>{
                    getToken(values);
                    }}
                >
                  {({handleChange, handleBlur, handleSubmit, values,errors})=>(<StyledFormArea>
                    <MyTextInput 
                        label = 'Email Address'
                        icon = 'mail'
                        placeholder ='輸入信箱地址或手機號碼'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('email')}
                        onBlur = {handleBlur('email')}
                        value = {values.email}
                        keyboardType = 'email-address'
                    />
                    <MyTextInput 
                        label = 'Password'
                        icon = 'lock'
                        placeholder ='輸入您的密碼'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('password')}
                        onBlur = {handleBlur('password')}
                        value = {values.password}
                        keyboardType = 'email-address'
                    />
                    {errors.password && (
                      <Text style={styles.errtxt}>{errors.password}</Text>
                    )}
                    <View style = {{width:"100%",alignItems : 'flex-end'}}>
                      <Button onPress = {()=>{}} title = "忘記密碼?"  color = {orange} />
                    </View>
                    <View style = {{marginTop:20}}>
                      <LongThinButton onPress = {handleSubmit} title = "登入" backgroundColor = {orange}/>
                    </View>
                  </StyledFormArea>)}
                </Formik>
                <LoginButtonContainer>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop:20}}>
                        <View style={{flex: 1, height: 2, backgroundColor:orange}} />
                        <View>
                            <Text style={{textAlign: 'center', paddingHorizontal:8,color:orange}}>或使用其他方式登入</Text>
                        </View>
                        <View style={{flex: 1, height: 2, backgroundColor: orange}} />
                    </View>
                    <View style={styles.rowContainer}>
                        <CircleButton onPress={()=>{}} logoName = "logo-google" color = "orange"/>
                        <CircleButton onPress={()=>{}} logoName = "logo-apple" color = "orange"/>
                        <CircleButton onPress={()=>{}} logoName = "logo-facebook" color = "orange"/>
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
      marginTop: 30, 
    },
    errtxt:{
      fontSize:12,
      color:"#FF0D10"
    }
  });



export default Login2;
