/**
 * Created by WolfTungsten on 2018/2/21.
 */
import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

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
                    padding: 6,
                    paddingLeft: 10,
                    paddingRight: 10,
                    flexDirection:'row',
                    alignSelf:'flex-start',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Text style={{
                        color:'#FFFFFF'
                    }} onPress={() => {this.props.onLabelPress()}}>{this.props.label}</Text>
                    {this.props.new ? <View style={{
                        backgroundColor:'#00FF00',
                        width:9,
                        height:9,
                        borderRadius:10,
                        marginLeft:5,
                        marginTop:0
                    }}><Text/></View> : <View><Text/></View>}
                </View>
                <TouchableOpacity style={{
                    backgroundColor:'#F9F9F9'
                }} onPress={() => {
                    this.props.onPress()
                }}>
                    {this.props.children}
                </TouchableOpacity>
            </View>
        )
    }
}