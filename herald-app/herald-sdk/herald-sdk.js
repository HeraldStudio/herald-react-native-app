/**
 * Created by WolfTungsten on 2018/2/21.
 * 鉴于通神的herald-js在react-native中兼容性表现不佳
 * 此处重新造轮子
 *
 * 特性：
 * 1.依旧使用axios作为本地请求后端
 * 2.根据路由持久化
 */

import {AsyncStorage, Platform} from "react-native";
import axios from "axios";
const qs = require('querystring');

const platform = 'react-native';

let toJSON = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return str;
    }
};

let toString = (obj) => {
    try {
        return JSON.stringify(obj);
    } catch (e) {
        return obj;
    }
}

class HeraldStorage {
    // 对AsyncStorage的封装
    keyHead = "heraldApp";

    async set(key, value) {
        await AsyncStorage.setItem(`${this.keyHead}-${key}`, value);
    }

    async get(key) {
        let data = await AsyncStorage.getItem(`${this.keyHead}-${key}`);
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    }

    async clear() {
        let allKeys = await AsyncStorage.getAllKeys();
        let myKeys = allKeys.filter((value) => {
            return value.startsWith(this.keyHead);
        });
        await AsyncStorage.multiRemove(myKeys);
    }
}

export class HeraldSDK {
    constructor(config) {
        // 载入配置
        this.serverURL = config.serverURL; // 服务器地址
        this.onLogin = config.onLogin;
        this.onLogout = config.onLogout;
        this.ready = false;
        this.storage = new HeraldStorage();
        this.storage.get('token').then((token) => {
            if (token) {
                // 读取token成功
                this.token = token;
                this.ready = true;
                this.axios = axios.create({
                    baseURL:this.serverURL,
                    headers: {'token': token},
                    transformRequest(req) {
                        if (typeof req === 'object') {
                            return qs.stringify(req);
                        }
                        return req;
                    },
                });
                this.token = token;
                this.onLogin(token);
            } else {
                // 读取token不成功
                this.onLogout();
            }
        })
    }

    async auth(cardnum, password){
        let res;
        try {
            let request = new Request(this.serverURL + '/auth', {
                method: 'POST',
                body: qs.stringify({cardnum, password, platform: 'react-native-' + Platform.OS}),
                headers: new Headers({'content-type': 'application/x-www-form-urlencoded'})
            });
            let response = await fetch(request);
            res = await response.json();
        } catch (e) {
            throw Error('Ooops，登录失败了，检查下网络连接状况？🤔')
        }
        if (res.success) {
            this.ready = true;
            let token = res.result;
            await this.storage.set('token', res.result);
            // 即将废弃
            this.axios = axios.create({
                baseURL:this.serverURL,
                headers: {'token': token},
                transformRequest(req) {
                    if (typeof req === 'object') {
                        return qs.stringify(req)
                    }
                    return req
                },
            });
            this.onLogin(token);
            this.token = token;
            return true
        } else {
            console.log(res);
            throw Error('Ooops，登录失败了，密码输对了吗？🤨')
        }
    }

    deauth () {
        this.storage.clear();
        this.ready = false;
        this.token = '';
        this.onLogout()
    }

    async fetchUIData(url, method, args, callback){
        // Step1: Load data from storage and rend it into UI immediately.
        let storageKey = `cache:${method.toUpperCase()}:${url}:${JSON.stringify(args)}`;
        let cacheData = await this.storage.get(storageKey);
        if (cacheData) {
            // The first kind of data, comes from cache with `source` field of 'cache'
            callback({
                source:'cache',
                data:cacheData
            });
        }
        // Step2: Fetch data from server.
        // Construct request
        let headers = new Headers({
            'token': this.token,
            'content-type': 'application/x-www-form-urlencoded'
        });
        let request;
        method = method.toUpperCase();
        if (args) {
            args = qs.stringify(args);
        } else {
            args = '';
        }
        if ( method === 'GET' || method === 'DELETE' ) {
            // Need to convert args to query string
            url = this.serverURL + url + '?' +args;
            request = new Request(url, {method, headers})
        } else {
            url = this.serverURL + url;
            request = new Request(url, {method, headers, body:args});
        }
        // Fetch in the hole!
        try {
            let response = await fetch(request);
            let body = await response.json();
            if (body.code === 200) {
                // Step3: Check if data is new
                cacheData = toString(cacheData);
                let fetchData = toString(body.result);
                console.log(cacheData);
                console.log(fetchData);
                if (fetchData !== cacheData) {
                    // Got new data
                    callback({
                        source:'fetch',
                        data:body.result
                    });
                    // Update the storage
                    this.storage.set(storageKey, fetchData);
                }
            } else if (body.code === 401) {
                this.deauth();
            } else {
                // ignore the other error
            }
        } catch (e) {
            console.log(e.message);
            callback({
                source:'error'
            })
        }
    }
}
