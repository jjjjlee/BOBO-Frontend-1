import { FlatList, RefreshControl, Text, View } from "react-native";
import DoglistItem from "./doglist-item";
// Callback and searchtxt is for searchFilter to run properly.
const DogList = ({data,type,user,canShowDetail,callback,searchtxt}) => {
    const renderItem =({item}) =>{
        return <DoglistItem id = {item.id} name={item.pet.name} headimg = {item.pet.headimg} age = {item.pet.age} species = {item.pet.species} 
        weight = {item.pet.weight} vaccined = {item.pet.vaccined} currentloc = {item.pet.currentloc} description={item.pet.description} adoptloc={item.adoptloc} 
        adoptdate={item.adoptdate} likecount={item.likecount} update_status = {item.update_status} type={type} user={user} canShowDetail = {canShowDetail} matching_status={item.status} petuuid = {item.pet.uuid}/>
    }

    // Function
    const handleOnEnd = async ()=>{
        if((type === 'forPost' || type === 'forAdopt') && user === 'institute' && searchtxt === ''){
            //callback();
            console.log("Callback FetchAPI")
        }else{
            return true;
        }
    }
    return(
        <View>
            <FlatList
                data = {data}
                keyExtractor = {item=>item.pet.uuid}
                renderItem = {renderItem}
                contentContainerStyle={{ paddingBottom: 70}}
                refreshControl = {
                    <RefreshControl
                    refreshing = {false}
                    onRefresh = {()=>console.log('refreshing...')}
                    />
                }
                onEndReached={handleOnEnd}

            />
        </View>
    );
}

export default DogList;