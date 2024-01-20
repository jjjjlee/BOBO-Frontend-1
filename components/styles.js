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
    orange:'#eb8934',
    green:'#34eb65',
    red:'#eb3434',
    holderwords : '#6b6b69'
};

const {primary, secondary, tertiary,darklight, brand, orange, green, red} = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top:${StatusBarHeight + 20}px;
    backgrouund-color:${primary};
`

export const InnerContainer = styled.View`
    flex : 1;
    width:100%;
    align-items : center;
`

export const PageLogo = styled.Image`
    width:70px;
    height:70px;
`

export const PageTitle = styled.Text`
    font-size :60px;
    text-align : center;
    font-weight : bold;
    color : ${brand};
    padding : 10px;
`
export const SubTitle = styled.Text`
    padding : 15px;
    font-size : 20px;
    text-align : center;
    font-weight : bold;
    color : ${darklight};
`

export const StyledFormArea = styled.View`
    width:90%;
`

export const StyledTextInput = styled.TextInput`
    background-color : ${secondary};
    padding : 15px;
    padding-left : 70px;
    padding-right : 55px;
    border-radius : 10px;
    font-size : 16px;
    height : 60px;
    margin-vertical:3px;
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