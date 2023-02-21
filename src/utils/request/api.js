import axios from 'axios'
import { ElMessage } from 'element-plus'

let reqList = []

const stopRepeatRequest = function (reqList, url, cancel, errorMessage) {
  const errorMsg = errorMessage || ''
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      cancel(errorMsg)
      return
    }
  }
  reqList.push(url)
}

const allowOpenRequest = function (reqList, url) {
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      reqList.splice(i, 1)
      break
    }
  }
}

const configHeaders = () => {
  let headers = {}

  return headers
}

function createAPI(host, isCancelToken = true, headers = {}) {
  const API = axios.create({
    baseURL: host,
  })

  API.interceptors.request.use(
    (config) => {
      Object.assign(config.headers, { ...configHeaders(), ...headers })
      if (isCancelToken) {
        let cancel = () => {}
        config.cancelToken = new axios.CancelToken(function (c) {
          cancel = c
        })
        const mUrl = config.method + ':' + config.url
        stopRepeatRequest(reqList, mUrl, cancel, `${mUrl} 重复的请求被中断`)
      }

      return config
    },
    (error) => {
      ElMessage.error(`Axios request:: ${error.message}`)
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  API.interceptors.response.use(
    (response) => {
      isCancelToken &&
        setTimeout(() => {
          const mUrl = response.config.method + ':' + response.config.url
          allowOpenRequest(reqList, mUrl)
        }, 1000)

      const { data } = response
      const { code } = data
      if (code !== 200) {
        // TODO: 处理全局错误信息
        // showGlobalErrorMessage(code)
        return data
      }

      return data
    },
    (error) => {
      if (isCancelToken) {
        if (axios.isCancel(error)) {
          ElMessage.error(`Axios response is cancel:: ${error.message}`)
        } else {
          setTimeout(() => {
            allowOpenRequest(reqList, error.config.url)
          }, 1000)
        }
      }

      console.error('Axios response:: ', error.message)
      return Promise.reject(error)
    }
  )

  return API
}

export default createAPI
