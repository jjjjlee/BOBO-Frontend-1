import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, ImageBackground, Text, View } from 'react-native';

//Import style components
import {
    WelcomeTitleBig,
    WelcomeTitleSmall,
    WelcomeLogoContainer,
    WelcomeTextContainer,
    WelcomeButtonContainer,
    Colors
} from './../components/styles'
const {brand, darklight,holderwords, primary, orange,transparent} = Colors;

// Import Buttons
import { LongThinButton } from '../components/buttons';

// Import Navigation
import { useNavigation } from '@react-navigation/native';

const Welcome = ()=>{
    const navigation = useNavigation();
    return(
        <ImageBackground
        source={require('../assets/image-6.png')}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <WelcomeLogoContainer>
            <Image
        source={require('../assets/bobo-logo.png')}
        style={{justifyContent: 'center',alignItems:'center'}}/>
            </WelcomeLogoContainer>
            <WelcomeTextContainer>
                <WelcomeTitleBig>加入我們</WelcomeTitleBig>
                <WelcomeTitleSmall>讓每個毛孩，都有個永續的未來</WelcomeTitleSmall>
            </WelcomeTextContainer>
            <WelcomeButtonContainer>
                <LongThinButton onPress={()=>navigation.navigate("Register")} title="註冊新帳號" backgroundColor = {orange}/>
                <LongThinButton onPress={()=>navigation.navigate("Login")} title="我已經有帳號" backgroundColor = {transparent}/>
            </WelcomeButtonContainer>
        </ImageBackground>
    );
};



export default Welcome;