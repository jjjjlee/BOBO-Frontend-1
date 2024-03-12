import React from 'react';
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


const TinderDetailScreen = ({name, age, headimg, species,weight, vaccined, adoptloc, description,matching_status})=>{
    const navigation = useNavigation();
    return(
        <View style = {styles.baseframe}>
            <View style={styles.content}>
                <ImageBackground style = {styles.image} source={{uri:headimg}}/>

                <View style = {styles.title}>
                    <Text style={styles.title_text}>基本資訊</Text>
                    <View style = {styles.title_content}>
                        <View style = {styles.tags}>
                            <View style={styles.tag}>
                                <Text style={styles.tag_text}>{species}</Text>
                            </View>
                            <View style={styles.tag}>
                                <Text style={styles.tag_text}>{weight}</Text>
                            </View>
                            <View style={styles.tag}>
                                <Text style={styles.tag_text}> {vaccined?"已注射疫苗":"未注射疫苗"}</Text>
                            </View>
                        </View>
                        <View style = {styles.location_frame}>
                            <Icon name = "location" type='ionicon'/>
                            <Text style = {styles.location_text}>{adoptloc}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.description_frame}>
                    <Text style = {styles.description_title}>關於我</Text>
                    <Text style = {styles.description_text}>{description}</Text>
                </View>
            </View>
            <View style={styles.action}>
                <TouchableOpacity  style={styles.adopt_button}  ><Text style={styles.adopt_button_text}>{matching_status === '機構審查批准'? "確定認養" : matching_status === '機構審查拒絕'? "機構拒絕" : matching_status === '機構審查(中)'? "審查中": "我要認養"}</Text></TouchableOpacity>
            </View>
            <View style={styles.header_frame}>
                <View style={styles.header_content}>
                    <View style={styles.header_text}>
                        <Text style={styles.name_text}>{name}</Text>
                        <Text style={styles.age_text}>{age}</Text>
                    </View>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    
    baseframe:{
        flexShrink: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(238, 238, 238, 1)",
        alignItems: "flex-start",
        rowGap: 0
    },
    content: {
        position: "absolute",
        flexShrink: 0,
        top: 116,
        left: 20,
        right: 20,
        alignItems: "flex-start",
        rowGap: 16
    },
    image:{
        alignSelf: "stretch",
        flexShrink: 0,
        height: 350,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 16,
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.05,
        alignItems: "flex-start",
        rowGap: 0,
        borderRadius: 20
    },
    title:{
        alignSelf: "stretch",
        flexShrink: 0,
        backgroundColor: "rgba(255, 255, 255, 1)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 15.600000381469727,
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.05,
        alignItems: "flex-start",
        rowGap: 12,
        padding: 16,
        borderRadius: 20
    },
    title_text:{
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(237, 116, 34, 1)",
        fontFamily: "PingFang TC",
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 1
    },
    title_content:{
        flexShrink: 0,
        alignItems: "flex-start",
        rowGap: 12
    },
    tags:{
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "flex-start",
        columnGap: 8
    },
    tag:{
        flexShrink: 0,
        backgroundColor: "rgba(255, 234, 218, 1)",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8
    },
    tag_text:{
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(237, 116, 34, 1)",
        fontFamily: "PingFang TC",
        fontSize: 12,
        fontWeight: "400",
        letterSpacing: 0
    },
    location_frame:{
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 4
    },
    location_text:{
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(41, 41, 41, 1)",
        fontFamily: "PingFang TC",
        fontSize: 14,
        fontWeight: "400",
        letterSpacing: 0.7
    },
    description_frame:{
        alignSelf: "stretch",
        flexShrink: 0,
        backgroundColor: "rgba(255, 255, 255, 1)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 15.600000381469727,
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.05,
        alignItems: "flex-start",
        rowGap: 12,
        padding: 16,
        borderRadius: 20
    },
    description_text:{
        flexShrink: 0,
        width: 318,
        height: 100,
        textAlign: "left",
        color: "rgba(41, 41, 41, 1)",
        fontFamily: "PingFang TC",
        fontSize: 14,
        fontWeight: "400",
        letterSpacing: 0.7
    },
    description_title:{
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(237, 116, 34, 1)",
        fontFamily: "PingFang TC",
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 1
    },
    action:{
        position: "absolute",
        bottom: 32,
        left: "35%",
        
        flexDirection: "row",
        alignItems: "flex-start",
        columnGap: 21
    },
    pass:{
        flexShrink: 0,
        height: 48,
        width: 48,
        backgroundColor: "rgba(255, 255, 255, 1)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 16,
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.25,
        alignItems: "flex-start",
        rowGap: 10,
        padding: 16,
        borderRadius: 40
    },
    like:{
        flexShrink: 0,
        height: 48,
        width: 48,
        backgroundColor: "rgba(255, 255, 255, 1)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 16,
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.25,
        alignItems: "flex-start",
        rowGap: 10,
        padding: 16,
        borderRadius: 40
    },
    adopt_button_text: {
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "PingFang TC",
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 1
    },
    adopt_button:{
        flexShrink: 0,
        backgroundColor: "rgba(237, 116, 34, 1)",
        shadowRadius: 16,
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.25,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 40
    },
    header_frame:{
        position: "absolute",
        flexShrink: 0,
        height: 96,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255, 255, 255, 1)",
        alignItems: "flex-start",
        rowGap: 0
    },
    header_content: {
        position: "absolute",
        flexShrink: 0,
        top: 48,
        height: 32,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
        paddingVertical: 0,
        paddingHorizontal: 20
    },
    header_text:{
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "flex-end",
        columnGap: 20
    },
    name_text:{
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(41, 41, 41, 1)",
        fontFamily: "PingFang TC",
        fontSize: 24,
        fontWeight: "600",
        letterSpacing: 1.2
    },
    age_text:{
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(41, 41, 41, 1)",
        fontFamily: "PingFang TC",
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 1
    }

})


export default TinderDetailScreen;