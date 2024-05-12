import { FlatList, RefreshControl, Text, View } from "react-native";
import CandidateListItem from "./candidatelist-item";


const CandidateList = ({data,type,searchtxt,callback}) => {

    const renderItem =({item}) =>{
        return <CandidateListItem id = {item.id} name={item.name} headimg = {item.headimg} age = {item.age}  currentloc = {item.currentloc} 
        description={item.description} currentloc_detail={item.currentloc_detail} email = {item.email} warning={item.warning} type={type}
        phone = {item.phone} rating={item.rating} refund_status = {item.refund_status}/>
    }
    const handleOnEnd = async ()=>{
        if(type === 'forAdopt'&& searchtxt === ''){
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
                keyExtractor = {item=>item.id}
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

export default CandidateList;