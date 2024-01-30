import styled from 'styled-components/native'
import { View, Image,Text,TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

//colors
export const Colors = {
    primary:'#ffffff',
    secondary: '#E5E7EB',
    tertiary:'#eb4034',
    darklight:'#332d2c',
    brand:'#eb8934',
    orange:"rgba(255, 107, 0, 1)",
    green:'#34eb65',
    red:'#eb3434',
    holderwords : '#6b6b69',
    white:'#ffffff',
    transparent :'rgba(0, 0, 0, 0)',
    mainbackground : "#FEFCFA"
};

const {primary, secondary, tertiary,darklight, brand, orange, green, red,mainbackground} = Colors;

// Welcome Page
export const WelcomeLogoContainer = styled.View`
    flex: 1;
    padding-top:${StatusBarHeight + 35}px;
`
export const WelcomeTextContainer = styled.View`
    flex: 1;
`
export const WelcomeTitleBig = styled.Text`
    font-size :30px;
    text-align : center;
    font-weight : bold;
    color : ${primary};
    padding : 10px;
`
export const WelcomeTitleSmall = styled.Text`
    font-size :15px;
    text-align : center;
    font-weight : bold;
    color : ${primary};
    padding : 0px;
`
export const WelcomeButtonContainer = styled.View`
    flex :5;
    justifyContent: flex-end;
    padding-bottom :60px;
`


// Login Page
export const LoginContainer = styled.View`
    flex: 1;
    padding-top:${StatusBarHeight + 35}px;
    align-items : center;
`

export const LoginLogoContainer = styled.View`
    flex: 1;
    align-items : center;
    margin-top : 30px;
`

export const LoginFormContainer = styled.View`
    flex : 2.5;
    width:100%;
    align-items : center;
    justifyContent: flex-top;
`

export const PageLogo = styled.Image   `
    width:70px;
    height:70px;
    transform : scale(1.6);
`

export const LoginTitle = styled.Text`
    font-size :30px;
    text-align : center;
    font-weight : bold;
    color : ${darklight};
    padding : 5px;
    margin-top : 40px;
`
export const LoginSubTitle = styled.Text`
    padding : 0px;
    font-size : 20px;
    text-align : center;
    font-weight : bold;
    color : ${darklight};
`
export const LoginButtonContainer = styled.View`
    flex : 1;
    width : 80%;
    margin-top:30;
`

export const StyledFormArea = styled.View`
    width:80%;
`

export const StyledTextInput = styled.TextInput`
    background-color : ${secondary};
    padding : 15px;
    padding-left : 70px;
    padding-right : 55px;
    border-radius : 10px;
    font-size : 16px;
    height : 60px;
    margin-vertical:20px;
    margin-bottom : 10px;
    color : ${darklight};
`

export const StyledInputLabel = styled.Text`
    color : ${darklight};
    font-size : 13px;
    text-align : left;
`

export const LeftIcon = styled.View`
    left : 15px;
    top : 33px;
    position : absolute;
    z-index : 1;
`

export const RightIcon = styled.TouchableOpacity`
    left : 15px;
    top : 38px;
    position : absolute;
    z-index : 1;
`

export const StyledButton = styled.TouchableOpacity`
    padding : 15px;
    background-color : ${brand};
    justify-content : center;
    border-radius : 5px;
    margin-vertical: 5px;
    height : 69px;
`

export const ButtonText = styled.Text`
    color : ${primary};
    font-size : 16px;
`