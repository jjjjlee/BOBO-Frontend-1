import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/welcom';
import Login from '../screens/login';
import { navOptions } from './option';
// Import Navigation
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();

export const InitialStack = ()=>{
    const navigation = useNavigation();
    return(
        <Stack.Navigator screenOptions={{headerShown:false,}}>
            <Stack.Screen name = "Welcome" component ={Welcome}/>
            <Stack.Screen name = "Login" component = {Login}/>
        </Stack.Navigator>
    )
}
