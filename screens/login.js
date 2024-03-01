import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, StyleSheet ,KeyboardAvoidingView,ScrollView} from 'react-native';

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

//colors
const {brand, darklight,holderwords, primary, orange} = Colors;

const Login = ()=>{
    return (
      
        <ScrollView style={{flex:1}}>
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
                    if (!values.email) {
                      errors.email = 'Required';
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                      errors.email = 'Invalid email address';
                    }
                    return errors;
                  }}
                  onSubmit={(values)=>{console.log(values);}}
                >
                  {({handleChange, handleBlur, handleSubmit, values})=>(<StyledFormArea>
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
                    
                  </StyledFormArea>)}
                </Formik>
                <View style = {{width:"80%",alignItems : 'flex-end'}}>
                    <Button onPress = {()=>{}} title = "忘記密碼?"  color = {orange} />
                </View>
                <LoginButtonContainer>
                    <LongThinButton onPress = {()=>{}} title = "登入" backgroundColor = {orange}/>
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
        </ScrollView>
        

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
  });



export default Login;
