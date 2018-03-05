/**
 * Created by WolfTungsten on 2018/2/21.
 */
/**
 * Created by WolfTungsten on 2018/2/21.
 */
import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView, FlatList, TouchableOpacity, Linking} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer'
import HeraldButton from '../../herald-component/herald-button';
import HeraldCard from '../../herald-component/herald-card';
import {heraldApp} from '../../AppInit';

export default class Notification extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <View  style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF'}}>

                <ScrollView contentContainerStyle={{
                    padding: 17,
                    paddingTop: 90,
                    paddingBottom: 0,
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    backgroundColor: '#FFFFFF'
                }}>
                    <Jwc nav={this.props.screenProps.stack}/>
                </ScrollView>

            </View>
        )
    }
}

const style = StyleSheet.create({
    text: {
        padding: 15,
        borderBottomColor: 'black',
    },
});

class Jwc extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allList: '',
            list: '',
            fresh: false,
            show: true,
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
            this.setState({allList: data.data});
            this.setState({list: data.data.filter(item => item.isImportant)});
        }
    }

    showDetail(item){
        if(item.isAttachment){
            Linking.openURL(item.url).catch((err)=>{  
                console.log('An error occurred', err);  
              }); 
        }
        else{
            this.props.nav.navigate('JwcDetail', {item: item});
        }
    }

    _keyExtractor = (item, index) => index;


    render(){
        return (
            <HeraldCard new={this.state.fresh} label="教务通知" onLabelPress={()=>{this.refresh()}} onPress={()=>{}}>
                <View>
                    <View style={{
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                        minHeight:80
                    }}>
                        {this.state.show && (!this.state.list ?
                         <Text onPress={()=>{this.setState({show: false})}}>暂无重要通知，点击查看更多</Text> :
                         <FlatList data={this.state.list} keyExtractor={ this._keyExtractor } renderItem={(item) =>{
                            return (
                                <TouchableOpacity onPress={()=>{this.showDetail(item.item)}}>
                                    <Text style={style.text}>{item.item.isAttachment ? "[附件] "+ item.item.title :item.item.title}</Text>
                                </TouchableOpacity>)
                                }} />
                            )}

                        {this.state.show && <Text style={style.text} onPress={()=>{this.setState({show: false})}}>点击查看更多</Text>}
                        
                        {!this.state.show && (<FlatList keyExtractor={ this._keyExtractor } data={this.state.allList} renderItem={(item) =>{
                            return (
                                <TouchableOpacity onPress={()=>{this.showDetail(item.item)}}>
                                    <Text style={style.text}>{item.item.isAttachment ? "[ 附件 ] " + item.item.title :item.item.title}</Text>
                                </TouchableOpacity>
                                )}} />
                            )}
                        
                        {!this.state.show && <Text style={style.text} onPress={()=>{this.setState({show: true})}}>点击收起</Text>}
                    </View>
                </View>
            </HeraldCard>
        )
    }
}
