/**
 * Created by WolfTungsten on 2018/2/21.
 */
import React from 'react';
import { StyleSheet, Text, View, TextInput, Platform, TouchableOpacity, TouchableNativeFeedback} from 'react-native';

export default class HeraldCard extends React.Component {
    render () {
        return(
            <View style={{
                ...this.props.style,
                justifyContent:'center',
                alignItems:'stretch',
                paddingBottom:17
            }}>
                <View style={{
                    backgroundColor:'#555555',
                    padding:10,
                    flexDirection:'row',
                    alignSelf:'flex-start',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Text style={{
                        color:'#FFFFFF'
                    }}>{this.props.label}</Text>
                    {this.props.new ? <View style={{
                        backgroundColor:'#00FF00',
                        width:9,
                        height:9,
                        borderRadius:10,
                        marginLeft:5,
                        marginTop:0
                    }}><Text/></View> : <View><Text/></View>}
                </View>
                <View style={{
                    backgroundColor:'#F9F9F9'
                }}>
                    {this.props.children}
                </View>
            </View>
        )
    }
}