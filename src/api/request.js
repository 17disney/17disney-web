import axios from 'axios'
import store from '@/store'
import { Toast } from 'mint-ui'

const service = axios.create({
  // baseURL: ,
  timeout: 5000
})

// service.interceptors.request.use(
//   config => {
//     if (store.getters.token) {
//       // config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     console.log(error)
//     Promise.reject(error)
//   }
// )

service.interceptors.response.use(
  response => response.data,
  error => {
    Toast({
      message: error,
      position: 'bottom',
      duration: 5000
    })
    console.log('err' + error)
  }
)

export default service
