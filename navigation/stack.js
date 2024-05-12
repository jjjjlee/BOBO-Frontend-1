// Import Screens
import Welcome from '../screens/welcom';
import Login from '../screens/login';
import Register from '../screens/register';
import PostScreen from '../screens/postscreen';
import Setting from '../screens/usersetting';
import Adoptformik from '../screens/adoption';
import Adoptformik2 from '../screens/adoptiontwo';
import Report from '../screens/report';
import CandidateScreen from '../screens/candidatescreen';
import RefundPreviewScreen from '../screens/refund-preview-screen';
import TrackPreviewScreen from '../screens/track-preview-screen';
import UserTrackScreen from '../screens/user-track-screen';
import TinderScreen from '../screens/tinder-screen';
import UserLikeScreen from '../screens/user-like-screen';
import MainScreen from '../screens/main-screen';
//import DogCard from '../screens/dogcard';

// Import Navigation
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {  TinderNavOption, navOptions } from './option';
import { CandidateTab, PostTab, UserTrackTab } from './tabs';
import { HomeTab } from './bottom-tab';








{/* <Stack.Screen name = "DogCard" component={DogCard}/>
<Stack.Screen name = "Welcome" component ={Welcome} options={{headerShown:false}}/>
<Stack.Screen name = "Login" component = {Login} options={{headerLeft:()=>{}}}/>
<Stack.Screen name = 'Register' component={Register} options={{headerLeft:()=>{}}}/> 
<Stack.Screen name = 'Setting' component={Setting}/>
<Stack.Screen name = 'Adoptformik' component={Adoptformik}/>
<Stack.Screen name = 'Report' component={Report}/>
<Stack.Screen name = "RefundPreview" component = {RefundPreviewScreen}/>
<Stack.Screen name = "UserTrack" component={UserTrackTab}/>
<Stack.Screen name = "UserLike" component={UserLikeScreen}/>
<Stack.Screen name = "HomeTab" component={HomeTab} options={TinderNavOption(navigation)}/>
<Stack.Screen name='Adoptformik2' component={Adoptformik2}/>
<Stack.Screen name = "Tinder" component={TinderScreen} options={TinderNavOption(navigation)}/>  */}
const Stack = createStackNavigator();

export const InitialStack = ()=>{
    const navigation = useNavigation();
    return(
        <Stack.Navigator screenOptions={navOptions} initialRouteName={"Welcome"}>
            <Stack.Screen name = "Welcome" component ={Welcome} options={{headerShown:false}}/>
            <Stack.Screen name = "Login" component = {Login} options={{headerLeft:()=>{}}}/>
            <Stack.Screen name = "MainScreen" component={MainScreen}/>
            <Stack.Screen name = "PostScreen" component = {PostScreen}/>   
            <Stack.Screen name = "PostTab" component = {PostTab}/>
            <Stack.Screen name = "CandidateTab" component = {CandidateTab}/>
            <Stack.Screen name = "Candidates" component = {CandidateScreen}/>
            <Stack.Screen name = "TrackPreview" component = {TrackPreviewScreen}/>
        </Stack.Navigator>
    )
}
