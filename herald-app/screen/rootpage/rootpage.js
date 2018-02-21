/**
 * Created by WolfTungsten on 2018/2/12.
 */
import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView, Platform} from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Drawer from 'react-native-drawer'
import style from './styles';
import HeraldButton from '../../herald-component/herald-button';
import {heraldApp} from '../../AppInit';

import Home from '../home/home';
import Notification from '../notification/notification';
import Activity from '../activity/activity';
import App from "../../App";


export default class RootPage extends React.Component {
    constructor(props){
        super(props)

    }
    render(){
        return(
        <Drawer
            type="static"
            content={<DrawerContent/>}
            openDrawerOffset={100}
            styles={{shadowColor: '#000000',shadowOpacity: 0.8, shadowRadius: 3}}
            tweenHandler={Drawer.tweenPresets.parallax}
            open={false}
            captureGestures="open"
            tapToClose={true}
            acceptPan={true}
            panOpenMask={0.25}
        >
            <AppBar/>
            <RootTab/>
        </Drawer>

        )
    }
}

class AppBar extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={{
                width:'100%',
                height:70 + (Platform.OS === 'ios' ? 10 : 0) ,
                flexDirection:'row',
                backgroundColor:'#FFFFFF',
                paddingTop:20,
                alignItems:'center',
                justifyContent:'flex-end',
                borderBottomWidth:1,
                borderBottomColor:'#E5E5E5'
            }}>
                <Image style={{
                    height:40,
                }} source={require('../../resource/img/AppBar.png')} resizeMode={Image.resizeMode.contain}/>
            </View>
        )
    }
}

// 抽屉内容
class DrawerContent extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#00ABD4'}}>
                <HeraldButton textColor="#FFFFFF" backgroundColor="#00ABD4" label="注销" onPress={()=>{heraldApp.sdk.deauth()}}/>
            </View>
        )
    }
}

// Tab图标
class TabIcon extends React.Component {
    render(){
        return(
            <View style={{
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#FFFFFF',
                width:50,
                height:50
            }}>
                <Image source={this.props.icon} style={{
                    width:30,
                    height:30
                }}/>
                <Text style={{
                    fontSize:8,
                    color:this.props.color,
                    paddingTop:5
                }}>{this.props.text}</Text>
            </View>
        )
    }
}

const activityIcon = require('../../resource/icon/tab/activity.png');
const notificationIcon = require('../../resource/icon/tab/notification.png');
const homeIcon = require('../../resource/icon/tab/home.png');
const activityIconSelected = require('../../resource/icon/tab/activity-selected.png');
const notificationIconSelected = require('../../resource/icon/tab/notification-selected.png');
const homeIconSelected = require('../../resource/icon/tab/home-selected.png');
//主屏TabNavigation
const RootTab = TabNavigator(
    {
        Home:{
            screen:Home,
            navigationOptions: ({ navigation }) => ({
                title: '日常',
            }),
        },
        Notification:{
            screen:Notification,
            navigationOptions: ({ navigation }) => ({
                title: '通知',
            }),
        },
        Activity:{
            screen:Activity,
            navigationOptions: ({ navigation }) => ({
                title: '校园活动',
            }),

        }
    },
    {
        tabBarComponent:TabBarBottom,
        tabBarPosition:'bottom',
        swipeEnabled:false,
        tabBarOptions:{
            activeTintColor:'#00B4FF',
            showIcon:true,
            activeBackgroundColor:'#FFFFFF',
            inactiveBackgroundColor:'#FFFFFF',
            showLabel:false,
            scrollEnabled:true,
            tabStyle:{
                flex:1
            },
            style:{
                backgroundColor:'#FFFFFF',
                height:60,
                paddingTop:0
            },
            iconStyle:{
                backgroundColor:'#FFFFFF',
                marginTop:0,
                width:60,
                height:60,
                position:'absolute'
            },
            indicatorStyle:{
                height:0
            }
        },
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let icon, text;
                if (routeName === 'Home') {
                    icon = focused ? homeIconSelected : homeIcon
                    text='日常'
                } else if (routeName === 'Notification') {
                    icon = focused ? notificationIconSelected : notificationIcon
                    text='通知'
                } else if (routeName === 'Activity') {
                    icon = focused ? activityIconSelected : activityIcon
                    text='校园活动'
                }
                return <TabIcon text={text} icon={icon} color={tintColor}/>

            },

        }),
    }
)


