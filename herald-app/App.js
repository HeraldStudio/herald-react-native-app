import React from "react";
import {AppInit, heraldApp} from "./AppInit";
import SignInScreen from "./screen/signin/signin";
import Root from "./screen/rootpage/rootpage";
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
                <Root style={{flex: 1}}/>
            );
        } else {
            return (
                <SignInScreen/>
            );
        }
    }
}



