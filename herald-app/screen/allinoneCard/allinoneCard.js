/**
 * Created by WolfTungsten on 2018/2/23.
 */
import React from "react";
import HeraldCard from "../../herald-component/herald-card";
import {Text, View} from "react-native";
import {heraldApp} from "../../AppInit";
// 主页一卡通卡片
export class AllinoneCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            balance: '...',
            todayAmount: '...',
            status: '...',
            fresh:false
        };

    }

    componentDidMount(){
        this.refresh();
    }

    refresh(){
        heraldApp.sdk.fetchUIData('/api/card', 'GET', {}, (data) => {this.databind(data)});
    }
    databind(data){

        console.log(data);
        if (data.source !== 'error') {
            this.setState({fresh: data.source === 'fetch'});
            this.setState({balance: data.data.info.balance});
        }

    }

    render(){
        return (
            <HeraldCard new={this.state.fresh} label="一卡通" onLabelPress={()=>{this.refresh()}} onPress={()=>{console.log('allinonecard')}}>
                <View>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'center',
                        alignItems:'center',
                        minHeight:80
                    }}>
                        <TextPanel label="当前余额" value={this.state.balance} />
                        <TextPanel label="今日消费" value={this.state.todayAmount} />
                        <TextPanel label="卡片状态" value={this.state.status} />
                    </View>
                </View>
            </HeraldCard>
        )
    }


}

class TextPanel extends React.Component {
    render(){
        return(
            <View style={{
                justifyContent:'center',
                alignItems:'center',
                flex: 1,
                paddingTop: 10,
                paddingBottom: 10
            }}>
                <Text style={{
                    textAlign:'center',
                    fontWeight:'bold',
                    color:'#555555',
                    padding:10
                }}>{this.props.label}</Text>
                <Text style={{
                    backgroundColor:'rgba(49,165,242,0)',
                    color:'rgba(49,165,242,1)',
                    fontWeight:'bold',
                    padding:10,
                }}>{this.props.value}</Text>
            </View>
        )
    }
}