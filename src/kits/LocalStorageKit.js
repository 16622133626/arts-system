// 因为原生的localstorage 仅能处理string
//所以我们对此需要封装

export const getArray = key => {
    const item = localStorage.getItem(key)
    return item === null ? [] : item.split(',')
}

export const setArray = (key,val) => {
    const arr = getArray(key)
    const index  = arr.indexOf(val)
    if(index >= 0){
        arr.splice(index,1) //数组去重
    }
    arr.unshift(val)
    localStorage.setItem(key,arr.toString())
}

export const clearItem = key => localStorage.removeItem(key)

export const getItem = (key) => {
    return localStorage.getItem(key) ? localStorage.getItem(key) : ""
}

export const setItem = (key,value) => {
         localStorage.setItem(key,value)
}