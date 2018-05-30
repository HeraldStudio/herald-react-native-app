import {AsyncStorage} from 'react-native'

// 限制存储内容必须为可以字符串化的JSON对象

const storagePrefix = '@herald:'

const setStorage = async (key, value) => {
    let valueToStorage = JSON.stringify(value)
    return AsyncStorage.setItem(storagePrefix + key, value)
}

const getStorage = async (key) => {
    let value = await AsyncStorage.getItem(storagePrefix + key)
    return value
}

const clearStorage = async () => {
    let allKeys = await AsyncStorage.getAllKeys()
    allKeys = allKeys.filter(k => k.startsWith(storagePrefix))
    return AsyncStorage.multiRemove(allKeys)
}