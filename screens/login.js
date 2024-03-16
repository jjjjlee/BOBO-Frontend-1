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

    const postData = async (return_obj)=>{
      // Convert to JSON
      const return_json = JSON.stringify(return_obj);
      console.log(return_json);
      // Post API
      if(return_obj.pet_uuid_list.length > 0){
        try{
          const response = await fetch("https://lively-nimbus-415015.de.r.appspot.com/api/member_pet_status/post/",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body : return_json
          })
          if(response.ok){
            console.log("Successfully posted")
          }else{
            const message = await response.json();
            console.log("Post failed:"+ message);
          }
        }catch(err){
          console.log(err);
        }
      }else{
        console.log("No LikeCards need to update")
      }
    }

    const removeLikeCardsLocalStorage = async () => {
      await AsyncStorage.removeItem("LikeCards");
      console.log("Clear the LikeCards Storage!");
      return true
    }

    const postLikeCardsLocalStorage = async (member_uuid)=>{
      const data = await AsyncStorage.getItem("LikeCards")
      let return_obj = {
        "member_uuid" : member_uuid,
        "status" : "0",
        "pet_uuid_list" :[]
      }
      let data_arr = JSON.parse(data);
      // Remove the safecard
      if(data_arr.length !== 0){
        data_arr.shift();
      }
      // Create array in the return_obj
      for(let i=0; i<data_arr.length; i++){
        return_obj.pet_uuid_list.push(data_arr[i].pet.uuid);
      }
      await postData(return_obj);
      return true;
    }
    
    const checkLocalStorage = async () =>{
      // Check if LikeCards return a null item
      const response = await AsyncStorage.getItem("LikeCards");
      if(!response){
        AsyncStorage.setItem("LikeCards", JSON.stringify([])
        ).then(()=>{console.log("Create a new LikeCard storage!")});
      }else{
        return true;
      }
    }

    const handleSubmit = async (values)=>{

      // Fetch API
      
      try{
        const response = await fetch('https://lively-nimbus-415015.de.r.appspot.com/api/member_login/',{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        })

        if (response.ok){
            Alert.alert("成功","您已登入成功");
            // Get the uuid
            const message = await response.json();
            // Check if user has LikeCards key in LocalStorage
            await checkLocalStorage();
            // Update the userlike backend
            await postLikeCardsLocalStorage(message["member_uuid"]);
            // Remove the likecards storage
            await removeLikeCardsLocalStorage();
            navigation.navigate("HomeTab",message['member_uuid'])
        } else{
            //const message = await response.json();
            Alert.alert('錯誤', '此帳密尚未註冊');
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



export default Login;
