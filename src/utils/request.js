import axios from 'axios'
// MessageBox
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  // baseURL: 'http://park-cn.17disney.com/api/v3', // process.env.BASE_API, // api的base_url
  baseURL: '/',
  timeout: 15000 // 请求超时时间
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response
    // console.log(res)
    const { status } = res

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
    } else if (status === 204) {
      Message({
        message: '无内容',
        type: 'warning',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: res.data,
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject('error')
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
