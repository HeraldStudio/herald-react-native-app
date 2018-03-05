/**
 * Created by WolfTungsten on 2018/2/15.
 */
/**
    App 入口文件
**/
import {AsyncStorage} from 'react-native';
import { Font } from 'expo';

import {HeraldSDK} from './herald-sdk/herald-sdk';
const heraldApp = {};  // 应用全局对象

let AppInit = () => {
    heraldApp.sdk = new HeraldSDK({
        serverURL:'https://boss.myseu.cn/ws3',
        onLogin:heraldApp.onLogin,
        onLogout:heraldApp.onLogout
    });

};

export {heraldApp, AppInit}
