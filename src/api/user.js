import request from '@/utils/request'
// request.post() 的返回值是promise对象
export const register = data => request.post('/user/register', data)
export const login = data => request.post('/user/login', data)
export const getUserInfo = () => {
  return request('/user/currentUser')
}
