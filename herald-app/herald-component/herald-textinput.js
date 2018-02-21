/**
 * Created by WolfTungsten on 2018/2/19.
 */
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

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
        padding:10,
        alignSelf:'flex-start',
        fontSize:14
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
