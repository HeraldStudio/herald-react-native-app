/**
 * Created by WolfTungsten on 2018/2/21.
 */
import React from "react";
import {ScrollView, View} from "react-native";

import {AllinoneCard} from "../allinoneCard/allinoneCard";

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
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    backgroundColor: '#FFFFFF'
                }}>
                    <AllinoneCard onPress={() => {
                        this.props.screenProps.stack.navigate('AllinoneCard')
                    }}/>
                    <AllinoneCard onPress={() => {
                        this.props.screenProps.stack.navigate('AllinoneCard')
                    }}/>
                    <AllinoneCard onPress={() => {
                        this.props.screenProps.stack.navigate('AllinoneCard')
                    }}/>
                    <AllinoneCard onPress={() => {
                        this.props.screenProps.stack.navigate('AllinoneCard')
                    }}/>
                    <AllinoneCard onPress={() => {
                        this.props.screenProps.stack.navigate('AllinoneCard')
                    }}/>
                    <AllinoneCard onPress={() => {
                        this.props.screenProps.stack.navigate('AllinoneCard')
                    }}/>
                </ScrollView>
            </View>
        )

    }
}

