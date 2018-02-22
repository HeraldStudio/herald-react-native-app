/**
 * Created by WolfTungsten on 2018/2/22.
 */
//AppBar
import {Image, Platform, Text, TouchableOpacity, View} from "react-native";
import React from "react";

export default class HeraldAppBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOn: false
        }
    }

    toggleMenu() {
        this.setState({menuOn: !this.state.menuOn})
    }

    render() {
        return (
            <View style={{
                position: 'absolute',
                zIndex: 10,
                width: '100%'
            }}>
                <View style={{
                    width: '100%',
                    height: 70 + (Platform.OS === 'ios' ? 10 : 0),
                    flexDirection: 'row',
                    backgroundColor: '#FFFFFF',
                    paddingTop: 20,
                    paddingLeft: 17,
                    paddingRight: 17,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E5E5',
                }}>
                    {this.props.showLeft ?
                        <TouchableOpacity style={{}} onPress={this.props.onLeftButtonPress}>
                            <Image style={{
                                height: 30,
                                width: 30,
                            }} source={this.props.leftIcon} resizeMode={Image.resizeMode.contain}/>
                        </TouchableOpacity> : <View/>
                    }
                    <View style={{
                        flexGrow: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginLeft: 7

                    }}>
                        <Image style={{
                            height: 40,
                            width: 150,
                        }} source={this.props.icon} resizeMode={Image.resizeMode.contain}/>
                    </View>
                    {this.props.showRight ?
                        <TouchableOpacity style={{}} onPress={() => {
                            this.toggleMenu()
                        }}>
                            <Image style={{
                                height: 30,
                                width: 30
                            }} source={this.props.rightIcon} resizeMode={Image.resizeMode.contain}/>
                        </TouchableOpacity> : <View/>
                    }
                </View>
                {this.state.menuOn ?
                    <TouchableOpacity style={{
                        width: '100%',
                        height: 10000,
                        alignItems: 'flex-end',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        zIndex: 11
                    }} onPress={() => {
                        this.toggleMenu();
                        console.log('点击菜单背景了')
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#FFFFFF',
                            width: '40%',
                            minHeight: 60,
                            marginTop: 7,
                            borderRadius: 3,
                            borderWidth: 0,
                            borderColor: '#A6A6A6',
                            marginRight: 10,
                            zIndex: 12
                        }} onPress={() => {
                            this.toggleMenu();
                            console.log('点击菜单了')
                        }}>
                            {this.props.menu}
                        </TouchableOpacity>
                    </TouchableOpacity> : <View><Text> </Text></View>}
            </View>

        )
    }
}