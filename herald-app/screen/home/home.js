/**
 * Created by WolfTungsten on 2018/2/21.
 */
import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer'
import HeraldButton from '../../herald-component/herald-button';
import HeraldCard from '../../herald-component/herald-card';
import {heraldApp} from '../../AppInit';

export class HomePage extends React.Component {
    static navigationOptions = {
        headerMode:'none'
    };
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <View style={{
                flex:1
            }}>
        <ScrollView contentContainerStyle={{padding:17,paddingBottom:0,justifyContent:'flex-start',alignItems:'stretch',backgroundColor:'#FFFFFF'}}>
            <HeraldCard label="测试卡片" new={false}>
                <View style={{
                    height:200,
                    alignItems:'center',
                    display:'flex',
                    justifyContent:'center'
                }}>
                    <Text>测试卡片</Text>
                </View>
            </HeraldCard>
            <HeraldCard label="测试卡片" new={false}>
                <View style={{
                    height:200,
                    alignItems:'center',
                    display:'flex',
                    justifyContent:'center'
                }}>
                    <Text>测试卡片</Text>
                </View>
            </HeraldCard>
            <HeraldCard label="测试卡片" new={false}>
                <View style={{
                    height:200,
                    alignItems:'center',
                    display:'flex',
                    justifyContent:'center'
                }}>
                    <Text>测试卡片</Text>
                </View>
            </HeraldCard>
            <HeraldCard label="测试卡片" new={false}>
                <View style={{
                    height:200,
                    alignItems:'center',
                    display:'flex',
                    justifyContent:'center'
                }}>
                    <Text>测试卡片</Text>
                </View>
            </HeraldCard>
            <HeraldCard label="测试卡片" new={false}>
                <View style={{
                    height:200,
                    alignItems:'center',
                    display:'flex',
                    justifyContent:'center'
                }}>
                    <Text>测试卡片</Text>
                </View>
            </HeraldCard>
        </ScrollView>
            </View>
        )

    }

}

export default Home = StackNavigator({
    Home:{screen:HomePage}
},{
    headerMode:'none'
})