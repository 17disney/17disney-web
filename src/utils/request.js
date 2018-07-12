import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: 'http://api.17disney.com/',
  // baseURL: '/',
  timeout: 15000
})

// 拦截器
service.interceptors.response.use(
  response => {
    const res = response
    const { status } = res

    // 正常返回
    if (status === 200) {
      const { message } = response.data
      if (message) {
        Message({
          message,
          type: 'warning',
          duration: 5 * 1000
        })
      }
      return response.data
    } else {
      Message({
        message: res.data,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res.data)
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
