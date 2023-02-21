import createAPI from './api'

// API请求路径前缀
const baseURL = '/vite-api'
const isCancelToken = true
const token = localStorage.getItem('token') || ''
const headers = {
  VITE_TOKEN: token,
}

export default createAPI(baseURL, isCancelToken, headers)
