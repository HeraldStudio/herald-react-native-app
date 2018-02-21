/**
 * Created by WolfTungsten on 2018/2/19.
 */
/**
 * Created by WolfTungsten on 2018/2/19.
 */
import React from 'react';
import { StyleSheet, Text, View, TextInput, Platform, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import HeraldPlatform from './herald-platform';

export default class HeraldButton extends React.Component {
    constructor (props) {
        super(props);

    }
    render () {

        return (
        <View style={{marginTop:17,padding:10,backgroundColor:this.props.backgroundColor,alignSelf:'flex-start'}}>
            <TouchableOpacity onPress={this.props.onPress}>
            <Text style={{fontSize:14,color:this.props.textColor}}>{this.props.label}</Text>
            </TouchableOpacity>
        </View>
        )
    }
}
