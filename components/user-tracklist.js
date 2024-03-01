import { FlatList, RefreshControl, Text, View, StyleSheet } from "react-native";
import UserTracklistItem from "./user-tracklist-item";
import { Line, Svg } from "react-native-svg";


const UserTracklist = ({data}) => {
    const renderItem =({item}) =>{
        return <UserTracklistItem imgs_arr={item.imgs_arr} update_date={item.update_date} update_text={item.update_text}/>
    }
    return(
        <View style = {{width : "100%",height:"100%"}}>
            <FlatList
                data = {data}
                keyExtractor = {item=>item.id}
                renderItem = {renderItem}
                contentContainerStyle={{ paddingBottom: 70}}
                refreshControl = {
                    <RefreshControl
                    refreshing = {false}
                    onRefresh = {()=>console.log('refreshing...')}
                    />
                }
            />
        </View>
    );
}

export default UserTracklist;