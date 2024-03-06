import { FlatList, RefreshControl, Text, View } from "react-native";
import DoglistItem from "./doglist-item";

const DogList = ({data,type,user}) => {
    const renderItem =({item}) =>{
        return <DoglistItem id = {item.id} name={item.name} headimg = {item.headimg} age = {item.age} species = {item.species} 
        weight = {item.weight} vaccined = {item.vaccined} currentloc = {item.currentloc} description={item.description} adoptloc={item.adoptloc} 
        adoptdate={item.adoptdate} likecount={item.likecount} update_status = {item.update_status} type={type} user={user} isadpoted = {item.isadpoted} matching_status={item.matching_status}/>
    }
    return(
        <View>
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

export default DogList;