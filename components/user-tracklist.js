import { FlatList, RefreshControl, View } from "react-native";
import UserTracklistItem from "./user-tracklist-item";


const UserTracklist = ({data}) => {
    const renderItem =({item}) =>{
        return <UserTracklistItem id = {item.id} imgs_arr={item.pettrace_imgs} update_date={item.created_at} update_text={item.description}/>
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