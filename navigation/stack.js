// Import Screens
import Welcome from '../screens/welcom';
import Login from '../screens/login';
import CandidateScreen from '../screens/candidatescreen';
import RefundPreviewScreen from '../screens/refund-preview-screen';
import TrackPreviewScreen from '../screens/track-preview-screen';
import UserTrackScreen from '../screens/user-track-screen';
import TinderScreen from '../screens/tinder-screen';
import UserLikeScreen from '../screens/user-like-screen';
//import DogCard from '../screens/dogcard';

// Import Navigation
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {  TinderNavOption, navOptions } from './option';
import { PostTab, UserTrackTab } from './tabs';
import { HomeTab } from './bottom-tab';







//<Stack.Screen name = "DogCard" component={DogCard}/>
const Stack = createStackNavigator();

export const InitialStack = ()=>{
    const navigation = useNavigation();
    return(
        <Stack.Navigator screenOptions={navOptions}>
            <Stack.Screen name = "Welcome" component ={Welcome} options={{headerShown:false}}/>
            <Stack.Screen name = "Login" component = {Login}/>
            <Stack.Screen name = "PostTab" component = {PostTab}/>
            <Stack.Screen name = "Candidates" component = {CandidateScreen}/>
            <Stack.Screen name = "RefundPreview" component = {RefundPreviewScreen}/>
            <Stack.Screen name = "TrackPreview" component = {TrackPreviewScreen}/>
            <Stack.Screen name = "UserTrack" component={UserTrackTab}/>
            <Stack.Screen name = "Tinder" component={TinderScreen} options={TinderNavOption(navigation)}/>
            <Stack.Screen name = "UserLike" component={UserLikeScreen}/>
            <Stack.Screen name = "HomeTab" component={HomeTab} options={TinderNavOption(navigation)}/>
        </Stack.Navigator>
    )
}
