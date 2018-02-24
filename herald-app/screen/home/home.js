/**
 * Created by WolfTungsten on 2018/2/21.
 */
import React from "react";
import {ScrollView, Text, View} from "react-native";
import HeraldCard from "../../herald-component/herald-card";

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
                    paddingTop: 90,
                    paddingBottom: 0,
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    backgroundColor: '#FFFFFF'
                }}>
            <AllinoneCard/>
        </ScrollView>
            </View>
        )

    }
}

