import React from "react";
import HeraldCard from "../../herald-component/herald-card";
import {TouchableOpacity, StyleSheet, FlatList, Button, Text, View, Linking, WebView} from "react-native";
import { StackNavigator } from 'react-navigation';
import {heraldApp} from "../../AppInit";
import { ScrollView } from "react-native-gesture-handler";
// 教务处详情

const style = StyleSheet.create({
    text: {
        padding: 15,
        borderBottomColor: 'black',
    },
})

export default class JwcDetail extends React.Component {
    static navigationOptions(){
        return {
            title: 'Home',
        }
    };

    constructor(props){
        super(props);
        this.state = {
            list: '',
            fresh: false
        };

    }


    goto(url){
        Linking.openURL(url).catch((err)=>{  
          console.log('An error occurred', err);  
        });  
    }

    render(){
        const item = this.props.navigation.state.params.item;
        return (
            <View>
                <HeaderBar title={item.title} nav={this.props.navigation}/>
                <View style={{width: '100%', height: 500}}>
                <WebView  
                    style={{width: '100%', height: 700}}  
                    source={{uri: item.url,method: 'GET'}}  
                    javaScriptEnabled={true} 
                    domStorageEnabled={true} 
                    scalesPageToFit={false}
                    />  
                </View>
                <Button title='下载文件暂时从外部访问' onPress={()=>{this.goto(item.url)}} style={style.text}></Button>
            </View>

        )
    }
}

class HeaderBar extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <View style={{marginTop: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Button title="back" onPress={()=>{this.props.nav.goBack()}}></Button>
                <Text style={{marginRight: 10}} >{this.props.title}</Text>
            </View>
        )
    }
}