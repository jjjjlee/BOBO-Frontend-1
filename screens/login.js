import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, StyleSheet } from 'react-native';
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
    const [authMail, setauthMail] = useState("");
    const [authPassword, setauthPassword] = useState("");
    
    // API function
    const fetchData = async ()=>{
      AsyncStorage.getItem("RegisterData"
      ).then(data=>{return(JSON.parse(data));}
      ).then(data=>{
        setauthMail(data.email);
        console.log("authMail Set!")
        setauthPassword(data.password);
        console.log('authPassword Set!')}
      ).catch(e=>{console.log(e);});
    }

    const patchData = async (userid, petid)=>{
      //Change the code here to patch the data
      setTimeout(function() {
        console.log(userid+petid);
      },1000)
    }

    const removeLikeCardsLocalStorage = async () => {
      await AsyncStorage.removeItem("LikeCards");
      console.log("Delete!");
      return true
    }

    const patchLikeCardsLocalStorage = async ()=>{
      const data = await AsyncStorage.getItem("LikeCards")
      let obj_arr = JSON.parse(data);
      // Remove the safecard
      obj_arr.shift();
      // For each card, patch the status using pathData async function
      for(let i=0; i<obj_arr.length; i++){
        let data = await AsyncStorage.getItem("RegisterData");
        data = JSON.parse(data);
        await patchData(data.email,obj_arr[i].pet.uuid);
      }
    }
    
    const handleSubmit = async ()=>{
      await patchLikeCardsLocalStorage();
      await removeLikeCardsLocalStorage();
      navigation.navigate("HomeTab");
    }

    useEffect(()=>{
      fetchData();
    },[])
    
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
                  initialValues={{email: '', password: ''}}
                  validate = {values => {
                    const errors = {};
                    if(values.email !== authMail || values.password !== authPassword){
                      errors.password = "Wrong password or Email";
                    }
                    return errors;
                  }}
                  onSubmit={(values)=>{
                    handleSubmit();
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
