/**
 * Created by WolfTungsten on 2018/2/21.
 */
/**
 * Created by WolfTungsten on 2018/2/21.
 */
import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer'
import HeraldButton from '../../herald-component/herald-button';
import {heraldApp} from '../../AppInit';

export default class Notification extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <View  style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF'}}>
                <Text style={{fontFamily:'bold'}}>
                    正在施工的通知页面...
                </Text>
                <Text style={{fontWeight:'bold'}}>
                    正在施工的通知页面...
                </Text>
            </View>
        )

    }

}