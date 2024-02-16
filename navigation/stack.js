// Import Screens
import Welcome from '../screens/welcom';
import Login from '../screens/login';
import PostScreen from '../screens/postscreen';
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
        </Stack.Navigator>
    )
}
