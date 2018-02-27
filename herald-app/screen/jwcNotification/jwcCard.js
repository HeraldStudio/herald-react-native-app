import React from "react";
import HeraldCard from "../../herald-component/herald-card";
import {TouchableOpacity, StyleSheet, FlatList, Text, View} from "react-native";
import {heraldApp} from "../../AppInit";
import { ScrollView } from "react-native-gesture-handler";
// 主页教务处卡片

const style = StyleSheet.create({
    text: {
        margin: 15,
    },
})

export default class JwcCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: '',
            fresh: false
        };

    }

    componentDidMount(){
        this.refresh();
    }

    refresh(){
        heraldApp.sdk.fetchUIData('/api/jwc', 'GET', {}, (data) => {this.databind(data)});
    }

    databind(data){
        if (data.source !== 'error') {
            this.setState({fresh: data.source === 'fetch'});
            this.setState({list: data.data.filter(item => item.isImportant)});
        }
    }

    showDetail(item){
        if(item.isAttachment){
            // download the file
        }
        else{
            // go to new page
        }
    }

    render(){
        return (
            <HeraldCard new={this.state.fresh} label="教务通知" onLabelPress={()=>{this.refresh()}} onPress={()=>{}}>
                <View>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'center',
                        alignItems:'center',
                        minHeight:80
                    }}>
                    {!this.state.list ? <Text>暂无重要通知，点击查看更多</Text>
                     :<FlatList data={this.state.list} keyExtractor={(item)=>item.index} renderItem={(item) =>{
                         return (
                             <TouchableOpacity key={item.index} onPress={()=>{console.log(item.item.title)}}>
                            <Text key={item.index}  style={style.text}>{item.item.title}</Text>
                            </TouchableOpacity>)}} />}
                    </View>
                </View>
            </HeraldCard>
        )
    }


}