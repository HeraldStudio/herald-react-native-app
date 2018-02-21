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

export default class Activity extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'stretch',backgroundColor:'#FFFFFF'}}>
                <Text>
                    正在施工的活动页面...
                </Text>
            </View>
        )

    }

}