import { Ionicons } from "@expo/vector-icons"
import { Image, Text, View } from "react-native"

//screenOptions={{headerTitleAlign: 'left', shadowColor: 'transparent', headerStyle: {height: 200}}}
export const navOptions = (nav)=>{
    return{
        headerTintColor : '#000000',
        
        headerStyle:{
            backgroundColor : '#fff',
            height:80
        }
    }
}

export const TinderNavOption = (nav)=>{
    return{
        headerRight: () => (
            <Ionicons
                name = "heart"
                size = {32}
                color = "#ED7422"
                onPress = {() =>nav.navigate("UserLike")}
            />
        ),
        headerTitle:()=><View style = {{left:-42,top:-3,transform: [{scale:0.025}]}}><Image  resizeMode="contain" source={require('./../assets/bobo_logo3.png')}/></View>
        }
}