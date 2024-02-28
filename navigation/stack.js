// Import Screens
import Welcome from '../screens/welcom';
import Login from '../screens/login';
import Register from '../screens/register';
import PostScreen from '../screens/postscreen';
import Candidate from '../screens/canif';
import Setting from '../screens/usersetting';
import Adoptformik from '../screens/adoption';
import Report from '../screens/report';
//import DogCard from '../screens/dogcard';

// Import Navigation
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navOptions } from './option';

//<Stack.Screen name = "DogCard" component={DogCard}/>
const Stack = createStackNavigator();

export const InitialStack = ()=>{
    const navigation = useNavigation();
    return(
        <Stack.Navigator screenOptions={navOptions}>
            <Stack.Screen name = "Welcome" component ={Welcome}/>
            <Stack.Screen name = "Login" component = {Login}/>
            <Stack.Screen name = "PostScreen" component = {PostScreen}/>   
            <Stack.Screen name = 'Register' component={Register}/>         
            <Stack.Screen name = 'Candidate' component={Candidate}/>
            <Stack.Screen name = 'Setting' component={Setting}/>
            <Stack.Screen name = 'Adoptformik' component={Adoptformik}/>
            <Stack.Screen name = 'Report' component={Report}/>
        </Stack.Navigator>
    )
}
