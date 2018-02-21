/**
 * Created by WolfTungsten on 2018/2/19.
 */
import {Platform} from 'react-native';
import React from 'react';

export default class HeraldPlatform extends React.Component {
    constructor(props) {
        super(props);
        React.Children.map(this.props.children, (child, _) => {
            if (child.type === 'iOS') {
                this.iosComponent = child
            }
            if (child.type === 'Android') {
                this.androidComponent = child
            }
        })

    }
    render(){
       if (Platform.OS === 'ios') {return this.iosComponent}
       if (Platform.OS === 'android') {return this.androidComponent}
    }
}

export class Android extends React.Component {
    render(){
        return this.props.children
    }
}

export class iOS extends React.Component {
    render(){
        return this.props.children
    }
}