import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View, Modal} from "react-native";
import { Icon } from "react-native-elements";
import TinderDetailScreen from "../screens/tinder-detail-screen";

const DoglistItem = ({id,name,headimg, age,species,weight,vaccined,currentloc,description,adoptloc,adoptdate,likecount,type,user,update_status,isadopted,matching_status})=>{
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)
    const handleOnPress = ()=>{
        if(user !== "institute" & type === "forPost" & !isadopted){
            setModalVisible(true)
        }
    }


    return(
        <TouchableOpacity style = {styles.card} onPress = {()=>{handleOnPress();}}>
            <View style = {styles.baseframe}>
                {(type === 'forTrack') & (update_status === "正常") ?
                        <View style = {styles.warning}>
                            <Icon name = "checkmark-circle" type="ionicon" size={30} color='#4DB66A'/>
                        </View>:(type === 'forTrack') & (update_status === "將到期")?
                            <View style = {styles.warning}>
                                <Icon name = "alert-circle" type="ionicon" size={30} color='#FDD015'/>
                            </View>:(type === 'forTrack') & (update_status === "已到期")?
                                <View style = {styles.warning}>
                                    <Icon name = "alert-circle" type="ionicon" size={30} color='#F5544C'/>
                                </View>:null                                             
                    }
                <ImageBackground
                    style = {styles.image}
                    source = {{uri:headimg}}
                />
                <View style = {styles.titleframe}>
                    <View style={styles.titletextframe}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.age}>{age}歲</Text>
                    </View>
                    <View style={styles.tag}>
                        <View style={styles.tagitem}>
                            <Text style={styles.tagitemtext}>{species}</Text>
                        </View>
                        <View style={styles.tagitem}>
                            <Text style={styles.tagitemtext}>{weight} 公斤</Text>
                        </View>
                        <View style={styles.tagitem}>
                            <Text style={styles.tagitemtext}>{vaccined}</Text>
                        </View>
                    </View>                    
                    <View style={styles.location}>
                        <View style={styles.locicon}>
                            <Icon name="location" type="ionicon"  size={15} />
                        </View>
                        <Text style={styles.location}>{currentloc}</Text>
                    </View>
                    {type === "forAdopt" || type === "forPost" ? 
                        <View style={styles.descriptionframe}>
                            <Text style={styles.descriptiontext}>{description}</Text>
                        </View> : 
                        <View style={styles.location}>
                            <View style={styles.locicon}>
                                <Icon name="time-outline" type="ionicon"  size={15} />
                            </View>
                            <Text style={styles.location}>送養: {adoptdate}  {adoptloc}</Text>
                        </View>}
                    {type === "forAdopt" ? 
                        <View style={styles.adoptbottomframe}>
                            <View style={styles.likecountframe}>
                                <Icon name = "heart" type = "ionicon" size = {20} color="orange"/>
                                <Text style={styles.likecounttext}>{likecount} 人</Text>
                            </View>
                            <TouchableOpacity style={styles.candidateframe}>
                                <Text style={styles.candidatetext}>查看候選人</Text>
                            </TouchableOpacity>
                        </View>:null
                    }
                    {(type === "forPost") & (user === "institute")  ? 
                        <View style={styles.adoptbottomframe}>
                            <TouchableOpacity style={styles.posttextframe}>
                                <Text style={styles.candidatetext}>刊登</Text>
                            </TouchableOpacity>
                        </View>:null
                    }
                </View>
            </View>
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <TinderDetailScreen headimg={headimg} species={species} weight={weight}
                    vaccined={vaccined} adoptloc={adoptloc} description={description} name = {name} age = {age} matching_status = {matching_status}/>
                <TouchableOpacity style = {styles.goback_frame} onPress={()=>setModalVisible(false)}><Text style={styles.goback_text}>返回 &gt;</Text></TouchableOpacity> 
            </Modal>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    card:{
        width:"100%",
        borderWidth:1,
        borderColor: '#c5c5c5',
        borderRadius:20,
        marginVertical:5,
        padding: 16,
        backgroundColor: "rgba(255, 255, 255, 1)",
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
    titleframe:{
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
        height: 101,
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
    warning:{
        position: "absolute",
        flexShrink: 0,
        top: -4,
        height: 32,
        right: -1,
        width: 32,
        alignItems: "flex-start",
        rowGap: 0
    },
    goback_frame:{
        position:"absolute", 
        top:55, 
        right:5,
      },
    goback_text:{
        color: "#808080",
        fontFamily: "PingFang TC",
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 0
    }
})

export default DoglistItem;