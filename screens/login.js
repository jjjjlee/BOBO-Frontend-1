import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, StyleSheet, Alert } from 'react-native';
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



const Login = ()=>{
    const navigation = useNavigation();
    
    // API function
    const handleSubmit = async (values)=>{

      // Fetch API
      
      try{
        const response = await fetch('https://lively-nimbus-415015.de.r.appspot.com/api/institution_login/',{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        })
        if (response.ok){
            Alert.alert("成功","您已登入成功");
            // Get the uuid
            const message = await response.json();
            navigation.navigate("MainScreen", {uuid:message['institution_uuid']});
        } else{
            Alert.alert('錯誤', '密碼錯誤或是帳號尚未註冊');
        }

      }catch(err){
        Alert.alert('錯誤', err.message);
      }
      
      //await patchLikeCardsLocalStorage();
    }
    
    return (
        <KeyboardAwareScrollView style={{flex:1}} keyboardShouldPersistTaps={"never"} showsVerticalScrollIndicator={false} >
        <LoginContainer>
            <LoginLogoContainer>
              <StatusBar style='dark'/>
              <PageLogo resizeMode = 'cover' source={require('./../assets/bobo-logo2.png')}/>
              <LoginTitle>歡迎回來</LoginTitle>
              <LoginSubTitle>輸入您的資訊以繼續</LoginSubTitle>
            </LoginLogoContainer>
            <LoginFormContainer>
                <Formik
                  initialValues={{phone: '', password: ''}}
                  validate = {values => {
                  }}
                  onSubmit={(values)=>{
                    handleSubmit(values);
                    
                    }}
                >
                  {({handleChange, handleBlur, handleSubmit, values,errors})=>(<StyledFormArea>
                    <MyTextInput 
                        label = 'Phone Number'
                        icon = 'device-mobile'
                        placeholder ='輸入您的手機號碼'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('phone')}
                        onBlur = {handleBlur('phone')}
                        value = {values.phone}
                    />
                    <MyTextInput 
                        label = 'Password'
                        icon = 'lock'
                        placeholder ='輸入您的密碼'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('password')}
                        onBlur = {handleBlur('password')}
                        value = {values.password}
                    />
                    {errors.password && (
                      <Text style={styles.errtxt}>{errors.password}</Text>
                    )}
                    <View style = {{width:"100%",alignItems : 'flex-end'}}>
                      <Button onPress = {()=>{navigation.navigate("Register")}} title = "點此註冊"  color = {orange} />
                    </View>
                    <View style = {{marginTop:20}}>
                      <LongThinButton onPress = {handleSubmit} title = "登入" backgroundColor = {orange}/>
                    </View>
                  </StyledFormArea>)}
                </Formik>
                <LoginButtonContainer>
                    {/* <View style={{flexDirection: 'row', alignItems: 'center', marginTop:20}}>
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
      marginTop: 30, 
    },
    errtxt:{
      fontSize:12,
      color:"#FF0D10"
    }
  });



export default Login;
