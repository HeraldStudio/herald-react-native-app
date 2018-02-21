/**
 * Created by WolfTungsten on 2018/2/21.
 * 鉴于通神的herald-js在react-native中兼容性表现不佳
 * 此处重新造轮子
 *
 * 特性：
 * 1.依旧使用axios作为本地请求后端
 * 2.根据路由持久化
 */

import {AsyncStorage} from 'react-native';
import axios from 'axios';

const platform = 'react-native';
export class HeraldSDK {
    constructor(config) {
        // 载入配置
        this.serverURL = config.serverURL; // 服务器地址
        this.onLogin = config.onLogin;
        this.onLogout = config.onLogout;
        this.ready = false;
        // 读取token
        AsyncStorage.getItem('herald-token',(_, token) =>{
            if (token) {
                // 读取token成功
                this.token = token;
                this.ready = true;
                this.axios = axios.create({
                    baseURL:this.serverURL,
                    headers:{'token':token}
                });
                this.onLogin(token)
            } else {
                // 读取token不成功
                this.onLogout()
            }
        });
    }

    async auth(cardnum, password){
        let res;
        try {
            res = (await axios.post(this.serverURL + '/auth', {cardnum, password, platform:'react-native'})).data;
        } catch (e) {
            console.log(this.serverURL + '/auth')
            throw Error('Ooops，登录失败了，检查下网络连接状况？')
        }
        if (res.success) {
            this.ready = true;
            let token = res.result;
            await AsyncStorage.setItem('herald-token', res.result);
            this.axios = axios.create({
                baseURL:this.serverURL,
                headers:{'token':token}
            });
            console.log(`登录成功,token:${token}`)
            this.onLogin(token);
            return true
        } else {
            throw Error('Ooops，登录失败了，密码输对了吗？')
        }
    }

    deauth () {
        AsyncStorage.removeItem('herald-token')
        this.ready = false;
        this.token = '';
        this.onLogout()
    }


}
