import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View,Text } from 'react-native';

// formik
import { Formik } from 'formik';

// icons
import {Octicons} from '@expo/vector-icons'

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
    ButtonText,
} from './../components/styles'

//colors
const {brand, darklight,holderwords, primary} = Colors;

const Login = ()=>{
    return (
        <StyledContainer>
            <StatusBar style='dark'/>
            <InnerContainer>
                <PageLogo resizeMode = 'cover' source={require('./../assets/paws.png')}/>
                <PageTitle>Furever</PageTitle>
                <SubTitle>Account Register</SubTitle>
                <Formik
                  initialValues={{email: '', password: ''}}
                  onSubmit={(values)=>{console.log(values);}}
                >
                  {({handleChange, handleBlur, handleSubmit, values})=>(<StyledFormArea>
                    <MyTextInput 
                        label = 'Your Email Address'
                        icon = 'mail'
                        placeholder ='abcdefg@gmail.com'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('email')}
                        onBlur = {handleBlur('email')}
                        value = {values.email}
                        keyboardType = 'email-address'
                    />
                    <MyTextInput 
                        label = 'Your Password'
                        icon = 'lock'
                        placeholder ='password'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('password')}
                        onBlur = {handleBlur('password')}
                        value = {values.password}
                        keyboardType = 'email-address'
                        
                    />
                    <MyTextInput 
                        label = 'Confirm Your Password'
                        icon = 'lock'
                        placeholder ='password'
                        placeholderTextColor = {holderwords}
                        onChangeText = {handleChange('password')}
                        onBlur = {handleBlur('password')}
                        value = {values.password}
                        keyboardType = 'email-address'
                    />

                  

                    
                  </StyledFormArea>)}

                    
                </Formik>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{ flex: 1, paddingRight: 5 }}>
                    <StyledButton 
                    onPress={() => console.log('Button Pressed')}      

                        
                    />
                    
                </View>

                <View style={{ flex: 1, paddingLeft: 5 }}>
                    <StyledButton 
                    onPress={() => console.log('Button Pressed')}          
                    ButtonText = "gred"              
                    />
                    
                </View>
                </View>
            </InnerContainer>
        </StyledContainer>

    );
}

const MyTextInput = ({label, icon, ...props})=>{
    return(<View>
        <LeftIcon>
            <Octicons name = {icon} size = {30} color = {brand}/>
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props}/>
    </View>
    )
}


export default Login;
