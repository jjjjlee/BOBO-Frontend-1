import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View} from "react-native";
import { Icon } from "react-native-elements";

// Titleframe 在figma中是包含所有的 Text components,到自我介紹的部分,這裡面需要一個conditional rendering

const CandidateListItem = ({id,name,headimg, age,currentloc,currentloc_detail,description,email,type,warning,phone,rating,refund_status})=>{
    const navigation = useNavigation()
    return(
        <TouchableOpacity style = {styles.card} onPress = {()=>navigation.navigate("DogCard")}>
            <View style = {styles.baseframe}>
                {(type === 'forAdopt') & warning ?
                    <View style = {styles.warning}>
                        <Icon name = "alert-circle" type="ionicon" size={30} color='#F5544C' />
                    </View>:null
                }

                {type === 'forRefund'?
                    <View style={styles.image_frame}>
                        <ImageBackground style = {styles.image} source = {{uri:headimg}}/>
                        <View style = {styles.rating_frame}>
                            <View style={styles.rating_icon_frame}>
                                <Icon name = "star" type="ionicon" size={15} color='#F5544C' />
                            </View>
                            <Text style = {styles.rating_text}>{rating}/5</Text>
                        </View>
                    </View>
                    :<ImageBackground style = {styles.image} source = {{uri:headimg}}/>
                }

                <View style = {styles.contentframe}>
                    <View style={styles.titletextframe}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.age}>{age}歲</Text>
                    </View>
                    {type === 'forAdopt' ? 
                        <View style={styles.tag}>
                            <View style={styles.tagitem}>
                                <Text style={styles.tagitemtext}>tag1</Text>
                            </View>
                            <View style={styles.tagitem}>
                                <Text style={styles.tagitemtext}>tag2</Text>
                            </View>
                            <View style={styles.tagitem}>
                                <Text style={styles.tagitemtext}>tag3</Text>
                            </View>
                        </View>:
                        <View style={styles.tag}>
                            <View style={styles.tagitem}>
                                <Text style={styles.tagitemtext}>{refund_status}</Text>
                            </View>
                        </View>}
                    {type === 'forAdopt' ?
                        <View style={styles.location}>
                            <View style={styles.locicon}>
                                <Icon name="location" type="ionicon"  size={15} />
                            </View>
                            <Text style={styles.location}>{currentloc}</Text>
                        </View>:
                        <View style={styles.location}>
                            <View style={styles.locicon}>
                                <Icon name="location" type="ionicon"  size={15} />
                            </View>
                            <Text style={styles.location}>{currentloc_detail}</Text>
                        </View>
                    }
                    {type === "forAdopt" ? 
                        <View style={styles.descriptionframe}>
                            <Text style={styles.descriptiontext}>{description}</Text>
                        </View> :
                        <View>
                            <View style={styles.location}>
                                <View style={styles.locicon}>
                                    <Icon name="call" type="ionicon"  size={15} />
                                </View>
                                <Text style={styles.location}>{phone}</Text>
                            </View>
                            <View style={styles.location}>
                                <View style={styles.locicon}>
                                    <Icon name="mail" type="ionicon"  size={15} />
                                </View>
                                <Text style={styles.location}>123</Text>
                            </View>
                        </View> 
}
                </View>
            </View>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    card:{
        borderWidth:1,
        borderColor: '#c5c5c5',
        borderRadius:20,
        marginVertical:5,
        padding: 16,

        flexShrink: 0,
        backgroundColor: "rgba(255, 255, 255, 1)",
        shadowOffset: {
        width: 0,
        height: 0
        },
        shadowRadius: 16,
        shadowColor: "rgb(0, 0, 0)",
        shadowOpacity: 0.05,
        alignItems: "flex-end",
        rowGap: 12,
    },
    image : {
        flexShrink: 0,
        height: 100,
        width: 100,
        alignItems: "flex-start",
        rowGap: 0,
        borderRadius: 12
    },
    image_frame:{
        flexShrink: 0,
        alignItems: "center",
        rowGap: 8
    },
    contentframe:{
        width:"70%",
        flexShrink: 0,
        alignItems: "flex-start",
        rowGap: 4
    },
    titletextframe: {
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "flex-end",
        columnGap: 12
        },
    name: {
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(41, 41, 41, 1)",
        fontFamily: "PingFang TC",
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 1
        },
    age: {
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(41, 41, 41, 1)",
        fontFamily: "PingFang TC",
        fontSize: 15,
        fontWeight: "500",
        letterSpacing: 0.75
        },
    baseframe: {
        alignSelf: "stretch",
        flexShrink: 0,
        height: 110,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 12
        },
    tagitem:{
        flexShrink: 0,
        backgroundColor: "rgba(255, 234, 218, 1)",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 8
    },
    tagitemtext:{
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(237, 116, 34, 1)",
        fontFamily: "PingFang TC",
        fontSize: 11,
        fontWeight: "400",
        letterSpacing: 0
    },
    tag:{
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "flex-start",
        columnGap: 4
    },
    location:{
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 4
    },
    locicon:{
        flexShrink: 0,
        height: 14,
        width: 14,
        alignItems: "flex-start",
        rowGap: 0
    },
    descriptionframe:{
        alignSelf: "stretch",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        flexDirection: "row",
        alignItems: "flex-start",
        columnGap: 10,
        paddingVertical: 2,
        paddingHorizontal: 0
    },
    descriptiontext:{
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        height: 17,
        textAlign: "left",
        color: "rgba(41, 41, 41, 1)",
        fontFamily: "PingFang TC",
        fontSize: 12,
        fontWeight: "400",
        letterSpacing: 0.6
    },
    adoptbottomframe: {
        alignSelf:'flex-end',
        marginTop: 8,
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 16,
    },
    likecountframe: {
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8
    },
    likecounttext: {
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(237, 116, 34, 1)",
        fontFamily: "PingFang TC",
        fontSize: 12,
        fontWeight: "400",
        letterSpacing: 0.8
    },
    candidateframe: {
        flexShrink: 15,
        height: 30,
        backgroundColor: "rgba(237, 116, 34, 1)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 12,
        padding: 5,
        borderRadius: 20
    },
    candidatetext: {
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "PingFang TC",
        fontSize: 12,
        fontWeight: "600",
        letterSpacing: 0.8
    },
    posttextframe:{
        width:100,
        flexShrink: 15,
        height: 30,
        backgroundColor: "rgba(237, 116, 34, 1)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 12,
        padding: 5,
        borderRadius: 20
    },
    warning: {
        position: "absolute",
        flexShrink: 0,
        top: -4,
        height: 32,
        right: -1,
        width: 32,
        alignItems: "flex-start",
        rowGap: 0
    },
    rating_text: {
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(237, 116, 34, 1)",
        fontFamily: "PingFang TC",
        fontSize: 15,
        fontWeight: "500",
        letterSpacing: 0.75
    },
    rating_frame: {
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 8
    },
    rating_icon_frame:{
        position: "absolute",
        flexShrink: 0,
        top: 1,
        height: 32,
        right: 25,
        width: 32,
        alignItems: "flex-start",
        rowGap: 0
    }
})

export default CandidateListItem;