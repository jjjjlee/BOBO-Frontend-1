import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import the tabs and screens
import TinderScreen from '../screens/tinder-screen';
import { UserTrackTab } from './tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


const Tab = createBottomTabNavigator();

export const HomeTab = ({ route })=>{
  const uuid = route.params;

  const setUUID = async ()=>{
    AsyncStorage.setItem("UUID", JSON.stringify(uuid)
    ).then(()=>{console.log("the uuid is set")});
  }

  useEffect(()=>{
    setUUID();
  },[])
  
  return (
    <Tab.Navigator
      screenOptions= {({route})=>({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle : {
          backgroundColor :'black',
        },
        tabBarActiveTintColor : 'orange',
        tabBarInactiveTintColor:'grey',
        tabBarIcon : ({focused,color,size})=>{
          let iconName;
          if (route.name === 'TinderScreen'){
            iconName = focused ? 'home' : 'home-outline'
          }
          else if (route.name === 'UserTrack'){
            iconName = focused ? 'newspaper' : 'newspaper-outline'
          }

          return <Ionicons name = {iconName} size={size} color = {color}/>
        }
      })}
    >
      <Tab.Screen name="TinderScreen" component={TinderScreen} initialParams={{uuid}} />
      <Tab.Screen name="UserTrack" component={UserTrackTab} initialParams={{uuid}}/>
    </Tab.Navigator>
  );
}