/**
 * Created by WolfTungsten on 2018/2/19.
 */
import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";

/*
 * props:
 * - label：显示文字标签
 * - onChangeText：内容修改回调函数
 * - isPassword：是否为密码
 * - placeHolder：占位符
 * - value：controlled value
 * */
export default class HeraldTextInput extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            focus:this.props.autoFocus
        }
    }

    render () {
        return(
            <View style={style.container}>
                <Text style={style.label}>{this.props.label}</Text>
                <TextInput style={[style.input, this.state.focus && style.focus]} onChangeText={this.props.onChangeText}
                           underlineColorAndroid="rgba(0,0,0,0)"
                           autoFocus={this.props.autoFocus}
                           placeholder={this.props.placeholder}
                           secureTextEntry={this.props.isPassword}
                           keyboardType={this.props.keyboardType}
                           onFocus={() => {this.setState({focus:true})}}
                           onBlur={() => {this.setState({focus:false})}}
                           value={'' + this.props.value}
                />
            </View>
        )
    }
}

let style = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'stretch',
        paddingTop:17,
    },
    label:{
        color:'#FFFFFF',
        backgroundColor:'#555555',
        textAlign:'center',
        padding: 6,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf:'flex-start',
        fontSize: 14,
        fontWeight: 'bold'
    },
    input:{
        fontSize:14,
        height: 40,
        backgroundColor: '#F9F9F9',
        paddingLeft:10,
        color:'#555555',
    },
    focus:{
        borderColor:'#00ABD4',
        borderWidth:1
    }
})
