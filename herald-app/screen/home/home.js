/**
 * Created by WolfTungsten on 2018/2/21.
 */
import React from "react";
import {ScrollView, Text, View} from "react-native";
import HeraldCard from "../../herald-component/herald-card";

export default class Home extends React.Component {

    constructor (props) {
        super(props)
    }

    render () {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#FFFFFF'
            }}>
                <ScrollView contentContainerStyle={{
                    padding: 17,
                    paddingTop: 90,
                    paddingBottom: 0,
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    backgroundColor: '#FFFFFF'
                }}>
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

