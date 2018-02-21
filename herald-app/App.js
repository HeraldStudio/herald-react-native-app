import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {AppInit, heraldApp} from './AppInit'
import SignInScreen from './screen/signin/signin'
import RootPage from './screen/rootpage/rootpage'
import HeraldButton from './herald-component/herald-button'
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin:false,
            token:null
        };
        heraldApp.onLogin = (newToken) => {
            this.setState({isLogin:true, token:newToken})
        };
        heraldApp.onLogout = () => {
            this.setState({isLogin:false, token:null})
        };
        AppInit()
    }

    render() {
        if (this.state.isLogin) {
            return (
                <RootPage style={{flex:1}}/>
            );
        } else {
            return (
                <SignInScreen/>
            );
        }
    }
}



