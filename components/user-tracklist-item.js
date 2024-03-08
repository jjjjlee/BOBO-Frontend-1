import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, ImageBackground, View} from "react-native";
import { Svg, Line, Circle } from 'react-native-svg';

const UserTracklistItem = ({id,imgs_arr,update_date,update_text})=>{
    return(
        <View style={styles.baseframe}>
            <View style={styles.date_frame}>
                    <Svg style={styles.ellipse} width="11" height="215" viewBox="0 0 11 12" fill="none"  >
                        <Circle cx="5.5" cy="6" r="5.5" fill="#292929"/>
                        <Line x1="5.5" y1="6" x2="5.5" y2="1000" stroke="#292929" strokeWidth="3"/>
                    </Svg>
                    <Text style={styles.date_text}>{update_date}</Text>
            </View>
            <View style={styles.imgsframe}>
                    <View style={styles.imgscontent}>
                        {imgs_arr.map((url,i)=>{
                            return(<ImageBackground style={styles.img} source={{uri:url}}/>)
                        })}
                    </View>
            </View>
            <Text style = {styles.update_text}>{update_text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    baseframe:{
        alignSelf: "stretch",
        flexShrink: 0,
        alignItems: "flex-start",
        rowGap: 8,

    },
    date_frame:{
        flexShrink: 0,
        width: 99,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8
    },
    ellipse:{
        position:"absolute",
        flexShrink: 0,
        width: 11,
        height: 11,
        overflow: "visible"
    },
    date_text: {
        flexShrink: 0,
        textAlign: "left",
        marginLeft: 20,
        color: "rgba(41, 41, 41, 1)",
        fontFamily: "PingFang TC",
        fontSize: 14,
        fontWeight: "400",
        letterSpacing: 0.7
    },
    imgsframe:{
        flexShrink: 0,
        height: 60,
        width: 311,
        alignItems: "flex-start",
        rowGap: 0
    },
    imgscontent:{
        position: "absolute",
        flexShrink: 0,
        left: 20,
        flexDirection: "row",
        alignItems: "flex-start",
        columnGap: 6
    },
    img:{
        flexShrink: 0,
        height: 60,
        width: 60,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 15.600000381469727,
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.05,
        alignItems: "flex-start",
        rowGap: 0,
        borderRadius: 12
    },
    update_text:{
        left:20,
        alignSelf: "stretch",
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(41, 41, 41, 1)",
        fontFamily: "PingFang TC",
        fontSize: 12,
        fontWeight: "400",
        letterSpacing: 0.6
    },
    line:{
        position: "absolute",
        flexShrink: 0,
        top: 406,
        bottom: 310,
        left: -309,
        width: 667,
        overflow: "visible"
    },
})

export default UserTracklistItem;