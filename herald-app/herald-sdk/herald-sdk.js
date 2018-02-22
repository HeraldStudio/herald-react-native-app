/**
 * Created by WolfTungsten on 2018/2/21.
 * 鉴于通神的herald-js在react-native中兼容性表现不佳
 * 此处重新造轮子
 *
 * 特性：
 * 1.依旧使用axios作为本地请求后端
 * 2.根据路由持久化
 */

import {AsyncStorage} from "react-native";
import axios from "axios";
import qs from "querystring";

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
                            return qs.stringify(req)
                        }
                        return req
                    },
                });
                this.onLogin(token)
            } else {
                // 读取token不成功
                this.onLogout()
            }
        })
    }

    async auth(cardnum, password){
        let res;
        try {
            res = (await axios.post(this.serverURL + '/auth', {cardnum, password, platform:'react-native'})).data;
        } catch (e) {
            throw Error('Ooops，登录失败了，检查下网络连接状况？🤔')
        }
        if (res.success) {
            this.ready = true;
            let token = res.result;
            await this.storage.set('token', res.result);
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
            return true
        } else {
            throw Error('Ooops，登录失败了，密码输对了吗？🤨')
        }
    }

    deauth () {
        this.storage.clear();
        this.ready = false;
        this.token = '';
        this.onLogout()
    }

    async fetchData(url, options = {}, render = () => {
    }) {
        let {
            method: method = 'get',
            params: params = {},
            data: data = {},
            cache: cache = true, // 大多数请求是需要缓存的，对于不适合缓存的请求可是设置cache为false
        } = options;
        // 使用method+URL作为缓存的 storageKey
        let storageKey = `cache:${method.toUpperCase()}:${url}`;
        // 先读取缓存数据作为后面的比较依据
        let cacheData = await this.storage.get(storageKey);
        let timer;
        if (cache) {
            // 读取缓存的promise
            let cacheReader = new Promise((resolve, reject) => {
                // 若向服务器请求的数据不能再1s内到达，则先将缓存中的数据渲染到组件
                timer = setTimeout(() => {
                    resolve(cacheData)
                }, 1000);
            });
            cacheReader.then((data) => {
                render({
                    status: 'cache',
                    data
                })
            })
        }
        try {
            let fetchData = (await this.axios.request({url, method, params, data, timeout: 17000})).data;
            if (fetchData.code === 200) {
                //返回为200
                if (cache) {
                    // 如果启用了缓存
                    try {
                        clearTimeout(timer)
                    } catch (e) {
                    }
                    let newData = toString(fetchData.result);
                    if (newData !== toString(cacheData)) {
                        // 如果新数据和旧数据不同
                        // 重新渲染数据
                        render({
                            status: 'fetch',
                            data: fetchData.result
                        });
                        // 缓存数据
                        this.storage.set(storageKey, newData);
                    }
                }
                return fetchData; // 预留给需要直接获取到数据的情况
            } else if (fetchData.code === 401) {
                // 遇到401错误直接deauth，要求重新登录
                this.deauth()
            } else {
                // 其他服务端错误不展示给用户
            }
        } catch (e) {
            render({
                status: 'error'
            })
        }
    }


}
