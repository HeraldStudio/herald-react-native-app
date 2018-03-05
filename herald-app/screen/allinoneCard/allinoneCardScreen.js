/**
 * Created by WolfTungsten on 2018/2/24.
 */
import React from "React";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import HeraldTextInput from "../../herald-component/herald-textinput";
import HeraldAppBar from "../../herald-component/herald-appbar";
import {heraldApp} from "../../AppInit";

const appbarIcon = require('../../resource/icon/appbar/allinoneAppbar.png');

export default class AllinoneCardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            target: 'card',
            password: '',
            status: 0, // 0-准备就绪 1-正在充值 2-充值成功 -1-充值失败,
            reason: ''
        }
    }

    async doIt() {
        this.setState({status: 1});
        let args = {
            amount: this.state.value,
            eacc: (this.state.target === 'eacc' ? 1 : 0),
            password: this.state.password
        };
        let res = await heraldApp.sdk.fetch('/api/card', 'PUT', args);
        console.log(res);
        if (res.success) {
            this.setState({status: 2});
        } else {
            this.setState({reason: res.reason, status: -1});
            if (res.reason === "密码错误，请重试") {
                setTimeout(() => {
                    this.setState({status: 0})
                }, 2000);
            }
        }
    }

    render() {
        return (<View style={style.background}>
            <HeraldAppBar icon={appbarIcon} showLeft={true} leftIcon={require('../../resource/img/backButton.png')}
                          onLeftButtonPress={() => {
                              this.props.navigation.goBack()
                          }}/>
            <View style={style.body}>
                <Text style={style.title}>充值</Text>
                <Text style={{color: '#31B1F2', marginTop: 17, padding: 2}}>消费明细</Text>
                <HeraldTextInput label="充值金额" value={this.state.value} onChangeText={(text) => {
                    this.setState({value: text})
                }}/>
                <View style={style.valueChoice}>
                    <ChoiceButton label="50" onPress={() => {
                        this.setState({value: 50})
                    }} chosen={this.state.value == 50}/>
                    <ChoiceButton label="100" onPress={() => {
                        this.setState({value: 100})
                    }} chosen={this.state.value == 100}/>
                    <ChoiceButton label="200" onPress={() => {
                        this.setState({value: 200})
                    }} chosen={this.state.value == 200}/>
                    <ChoiceButton label="300" onPress={() => {
                        this.setState({value: 300})
                    }} chosen={this.state.value == 300}/>
                    <ChoiceButton label="500" onPress={() => {
                        this.setState({value: 500})
                    }} chosen={this.state.value == 500} tail={true}/>
                </View>
                <HeraldTextInput label="查询密码" isPassword={true} value={this.state.password} onChangeText={(text) => {
                    this.setState({password: text})
                }}/>
                <View style={{
                    marginTop: 17,
                    backgroundColor: '#555555',
                    padding: 8,
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>充值到</Text>
                </View>
                <View style={style.valueChoice}>
                    <ChoiceButton label="一卡通账户" onPress={() => {
                        this.setState({target: 'card'})
                    }} chosen={this.state.target === 'card'}/>
                    <ChoiceButton label="电子钱包" tail={true} onPress={() => {
                        this.setState({target: 'eacc'})
                    }} chosen={this.state.target === 'eacc'}/>
                </View>
                {this.state.status === 0 ? <TouchableOpacity style={style.button} onPress={() => {
                    this.doIt()
                }}>
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>确认充值</Text>
                </TouchableOpacity> : <View/>}
                {this.state.status === 1 ? <Text style={{color: '#555555', marginTop: 17, padding: 10}}>请稍候...</Text> :
                    <View/>}
                {this.state.status === 2 ? <Text style={{color: '#27AE60', marginTop: 17, padding: 10}}>👌充值成功！</Text> :
                    <View/>}
                {this.state.status === -1 ?
                    <Text style={{color: '#EB5757', marginTop: 17, padding: 10}}>{this.state.reason}</Text> : <View/>}

            </View>
        </View>);
    }

}


let style = StyleSheet.create({
    background: {
        width: '100%',
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    body: {
        paddingTop: 23,
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        width: '100%',
        flex: 1,
        padding: 17
    },
    title: {
        fontSize: 36,
        color: '#555555',
        fontFamily:'regular'
    },
    valueChoice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#31B1F2',
        padding: 8,
        alignSelf: 'flex-start',
        marginTop: 17
    }


});

class ChoiceButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<TouchableOpacity style={{flexGrow: 1, marginTop: 10, marginRight: (this.props.tail ? 0 : 10)}}
                                  onPress={this.props.onPress}>
            <Text style={this.props.chosen ? {
                backgroundColor: '#31B1F2',
                color: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#31B1F2',
                textAlign: 'center',
                padding: 6
            } : {
                backgroundColor: '#F9F9F9',
                color: '#555555',
                borderWidth: 1,
                borderColor: '#F9F9F9',
                textAlign: 'center',
                padding: 6
            }}>
                {this.props.label}
            </Text>
        </TouchableOpacity>)
    }

}


