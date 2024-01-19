import styled from 'styled-components/native'
import { View, Image,Text } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

//colors
export const Colors = {
    primary:'#ffffff',
    secondary: 'E5E7EB',
    tertiary:'#eb4034',
    darklight:'#34c6eb',
    brand:'#eb8934',
    orange:'#eb8934',
    green:'#34eb65',
    red:'#eb3434',
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
    font-size :30px;
    text-align : center;
    font-weight : bold;
    color : ${brand};
    padding : 10px;
`