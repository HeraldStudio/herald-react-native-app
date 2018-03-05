/**
 * Created by WolfTungsten on 2018/2/12.
 */
//React Native 基础
import React from "react";
import {Image, Text, View} from "react-native";
import {StackNavigator} from "react-navigation";
import style from "./styles";
import heraldStyle from "../../resource/herald-style";
import heraldColor from '../../resource/herald-color';
//Herald Component 自定义组件
import HeraldTextInput from "../../herald-component/herald-textinput";
import HeraldButton from "../../herald-component/herald-button";
//全局对象
import {heraldApp} from "../../AppInit";
class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cardnum:'',
            password:'',
            fail:false,
            failMessage:''
        }
    }

    async auth(){
        console.log('请求登陆');
        console.log({cardnum:this.state.cardnum, password:this.state.password});
        try {
            await heraldApp.sdk.auth(this.state.cardnum, this.state.password);
        } catch (e) {
            this.setState({
                fail:true,
                failMessage:e.message
            })
        }

    }
    render(){
        return(
            <View style={style.body}>
                <View style={style.signin}>
                    <View style={style.title}>
                    <Image style={style.image} resizeMode={Image.resizeMode.contain} source={require('../../assets/img/icon/icon.png')}/>
                    <Text style={[heraldStyle.textStyle.title, {paddingTop:20,paddingBottom:10,fontWeight:'bold'}]}>统一身份认证</Text>
                    <Image style={{width:6,height:4,alignSelf:'center'}} resizeMode={Image.resizeMode.cover} source={require('../../assets/img/polygon.png')}/>
                    <Text style={[heraldStyle.textStyle.text14, {paddingTop:10, paddingBottom:10, color:heraldColor.secondary}]}>专注公益更懂你</Text>
                    {this.state.fail ? <Text style={style.failMessage}>{this.state.failMessage}</Text> : null}
                    </View>
                    <HeraldTextInput label="一卡通号" value={this.state.cardnum} onChangeText={(text) => {
                        this.setState({cardnum: text})
                    }}
                                     keyboardType="numeric"/>
                    <HeraldTextInput label="统一身份认证密码" value={this.state.password} onChangeText={(text) => {
                        this.setState({password: text})
                    }}
                                     isPassword={true}/>
                    <HeraldButton style={style.button} textColor="#FFFFFF" backgroundColor="#00ABD4" label="现在登录" onPress={()=>{this.auth()}}/>
                </View>
                <View style={style.copyright}>
                    <View style={style.accept}>
                        <Text style={style.acceptText} onPress={() => {this.props.navigation.navigate('UserAgreement')}}>服务条款</Text>
                        <Text style={style.acceptText} onPress={() => {this.props.navigation.navigate('PrivateAgreement')}}>隐私协议</Text>
                    </View>
                    <Text style={{color:'#555555', fontSize:12}}>小猴偷米工作室 © 2007-2018</Text>
                </View>
            </View>
        )
    }
}

class UserAgreement extends React.Component {
    render () {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>-服务条款页面-</Text>
            </View>
        )
    }
}

class PrivateAgreement extends React.Component {
    render () {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>-隐私协议页面-</Text>
            </View>
        )
    }
}

let Navigator = StackNavigator(
    {
        //routes
        SignIn: {
            screen: SignIn,
        },
        UserAgreement: {
            screen: UserAgreement,
        },
        PrivateAgreement: {
            screen: PrivateAgreement
        }
    },
    {
        //props
        headerMode:'none'
    });

export default class SignInScreen extends React.Component {
    render() {
        return <Navigator/>
    }
}