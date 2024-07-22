// 该模块提供三个方法：setToken、getToken和delToken，用于操作本地存储。
const KEY = 'hmmj-vant-h5-90-token'
// 设置token
export const setToken = token => {
  localStorage.setItem(KEY, token)
}
// 获取token
export const getToken = () => {
  return localStorage.getItem(KEY)
}
// 删除token
export const delToken = () => {
  localStorage.removeItem(KEY)
}
