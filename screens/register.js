import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet } from 'react-native';

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
    
    StyledTextInput,
    
    Colors,
} from './../components/styles'

//Buttons
import { LongThinButton,CircleButton } from '../components/buttons';
import { navOptions } from '../navigation/option';

// Import Navigation
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

//colors
const {brand, darklight,holderwords, primary, orange} = Colors;

const Register = ()=>{
    const navigation = useNavigation();
    return (
      <ScrollView style={{flex:1}}>

      
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
                        
                    />
                    <MyTextInput 
                        label = 'Password'
                        icon = 'lock'
                        placeholder ='確認密碼'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('passwordagain')}
                        onBlur = {handleBlur('passwordagain')}
                        value = {values.passwordagain}
                        
                    />
                  </StyledFormArea>)}
                </Formik>
                
                <LoginButtonContainer>
                    <LongThinButton onPress = {()=>{}} title = "註冊" backgroundColor = {orange}/>
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
      top:10,
      
    },
  });



export default Register;
