import { useNavigation } from "@react-navigation/native";
    import { useState } from "react";
    import { StyleSheet, Text, TouchableOpacity, ImageBackground, View, Modal, Linking, Alert} from "react-native";
    import { Icon } from "react-native-elements";
    import TinderDetailScreen from "../screens/tinder-detail-screen";
    import { TextInput } from "react-native-gesture-handler";

    const DoglistItem = ({id,name,headimg, age,species,weight,vaccined,currentloc,description,adoptloc,adoptdate,likecount,type,user,update_status,canShowDetail,matching_status,petuuid})=>{
        const navigation = useNavigation()
        const [modalVisible, setModalVisible] = useState(false)
        const [modalSignVisible, setModalSignVisible] = useState(false)
        const [email, setEmail] = useState('');
        const handleOnPress = ()=>{
            if((type === "forPost" & canShowDetail)){
                setModalVisible(true)
            }else if(type === "forAdopt" & canShowDetail){
                navigation.navigate("CandidateTab",{pet_uuid:petuuid,detail_data:{
                    name : name,
                    age : age,
                    headimg : headimg,
                    species : species,
                    weight : weight,
                    vaccined : vaccined,
                    adoptloc : currentloc,
                    description : description
                }})
            }
        }
        const handleAdoption = ()=>{
            if (matching_status === "機構審查批准"){
                setModalSignVisible(true);
            }else if(matching_status !== "機構審查拒絕" & matching_status !=="機構審查(中)"){
                setModalVisible(false);
                navigation.navigate("Adoptformik",{petuuid:petuuid});
            }
          };
        
        // fetch簽名API
        const handleSignup = async ()=>{
            try{
                Alert.alert('處理中','請稍等約10秒鐘...')
                const formData = new FormData();
                formData.append("member_email", email);
                const response = await fetch('https://lively-nimbus-415015.de.r.appspot.com/api/kdan/sign-link/', {
                    method: 'POST',
                    body: formData,
                    redirect: "follow",
                });
                if(response.ok){
                    const data = await response.json();
                    const sign_url = data['sign_link'];
                    console.log(data['sign_link'])
                    const supported = await Linking.canOpenURL(sign_url);
                    if(supported){
                        await Linking.openURL(sign_url);
                    }else{
                        console.error('Cannot open URL:', sign_url);
                    }
                }else{
                    const data = await response.json();
                    console.log(data)
                    // Refresh token
                    const res1 = await fetch("https://lively-nimbus-415015.de.r.appspot.com/api/kdan/refresh-token/",{
                        method:'GET'
                    });
                    // Post again
                    const res2 = await fetch('https://lively-nimbus-415015.de.r.appspot.com/api/pet-track-record/post/', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    if(res2.ok){
                        const data = await response.json();
                        console.log(data)
                    }else{console.log("Unexpected HTTP error when fetcing Kdan API")}
                }
            }catch(e){
                console.log('Local Error when handleSingup', e);
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
                                <Text style={styles.tagitemtext}>{vaccined?"已施打疫苗":"未施打疫苗"}</Text>
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
                                <View style={styles.candidateframe}>
                                    <Text style={styles.candidatetext}>查看候選人</Text>
                                </View>
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
                        vaccined={vaccined?"已施打疫苗":"未施打疫苗"} adoptloc={currentloc} description={description} name = {name} age = {age} matching_status = {matching_status} route = {null}/>
                    <TouchableOpacity style = {styles.goback_frame} onPress={()=>setModalVisible(false)}><Text style={styles.goback_text}>返回 &gt;</Text></TouchableOpacity>
                    <Modal animationType="fade" transparent={true} visible={modalSignVisible} onRequestClose={() => setModalSignVisible(false)}>
                        <View style={styles.modalBackground}>
                            <View style={styles.functionWindow}>
                                <Text style={styles.signModaltitle}>輸入驗證的信箱帳號</Text>
                                <Text style = {styles.signModalsubtitle}>(需與認養時填寫之信箱相同)</Text>
                                <TextInput 
                                    style={styles.signEmailinput} 
                                    placeholder="asdfasdf"
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                    />
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style = {styles.deleteButton} onPress={()=>{setModalSignVisible(false)}}>
                                        <Text style={styles.buttonText}>取消</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.confirmButton} onPress = {()=>{handleSignup();}}>
                                        <Text style={styles.buttonText}>去簽名</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal> 
                </Modal>
            </TouchableOpacity>

        );
    }

    const styles = StyleSheet.create({
        signEmailinput: {
            width: '100%',
            height: 40,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            marginBottom: 20,
            paddingLeft: 10,
          },
        signModalsubtitle:{
            flexShrink: 0,
            textAlign: "center",
            color: "grey",
            fontFamily: "PingFang TC",
            fontSize: 12,
            fontWeight: "bold",
            letterSpacing: 0
        },
        signModaltitle:{
            flexShrink: 0,
            textAlign: "center",
            color: "black",
            fontFamily: "PingFang TC",
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 0
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          },
        deleteButton: {
            backgroundColor: '#808080',
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
          },
          confirmButton: {
            backgroundColor: "rgba(255, 107, 0, 1)",
            borderRadius: 5,
            padding: 10,
          },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          },
        modalBackground: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          },
        functionWindow: {
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '80%',
            alignItems: 'center',
          },
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
            height: 120,
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
            marginTop: 20,
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
        action:{
          position: "absolute",
          bottom: 32,
          left: "35%",
          
          flexDirection: "row",
          alignItems: "flex-start",
          columnGap: 21
      }
    })

    export default DoglistItem;