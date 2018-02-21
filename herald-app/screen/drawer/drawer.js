/**
 * Created by WolfTungsten on 2018/2/21.
 */
import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer'
import HeraldButton from '../../herald-component/herald-button';
import {heraldApp} from '../../AppInit';

export default class DrawerContent extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return(<View style={{backgroundColor:'#00ABD4'}}>
            <Text>等待施工的抽屉视图</Text>
        </View>)
    }
}