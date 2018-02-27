/**
 * Created by WolfTungsten on 2018/2/22.
 */
//AppBar
import {Image, Platform, TouchableOpacity, View} from "react-native";
import React from "react";

export default class HeraldAppBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOn: false
        }
        setInterval(() => {
            this.render()
        }, 10)
    }

    toggleMenu() {
        this.setState({menuOn: !this.state.menuOn})
    }

    render() {
        return (
            <View style={{
                zIndex: 10,
                width: '100%',
                backgroundColor: '#FFFFFF'
            }}>
                <View tint="default" intensity={80} style={{
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
                    <View tint="default" intensity={80} style={{
                        flexGrow: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginLeft: 7

                    }}>
                        <Image style={{
                            height: 40,
                            width: 150,
                            backgroundColor: '#FFFFFF'
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
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#FFFFFF',
                            width: '40%',
                            minHeight: 60,
                            marginTop: 7,
                            borderRadius: 0,
                            borderWidth: 0,
                            borderColor: '#A6A6A6',
                            marginRight: 10,
                            zIndex: 12
                        }} onPress={() => {
                            this.toggleMenu();
                        }}>
                            {this.props.menu}
                        </TouchableOpacity>
                    </TouchableOpacity> : <View/>}
            </View>

        )
    }
}