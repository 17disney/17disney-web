import request from '@/utils/request'

const base = 'timesguide-service'

export default {
  // 图片上传 Token
  uploadToken: function uploadToken() {
    return request({
      url: `${base}/v1/upload/token`,
      method: 'get'
    })
  },
  // 资源列表
  explorerList: function explorerList(data) {
    return request({
      url: `${base}/v2/timesguides`,
      method: 'get',
      params: data
    })
  },
  // 资源按 ID 查找
  explorerId: function id(id) {
    return request({
      url: `${base}/v1/timesguides/${id}`,
      method: 'get'
    })
  },
  // 资源按 ID 更新
  updateExplorerId: function updateExplorerId(id, data) {
    return request({
      url: `${base}/v1/timesguides/${id}`,
      method: 'put',
      data
    })
  },
  // 贡献列表
  contributesList: function timesguidesList() {
    return request({
      url: `${base}/v1/contributes/`,
      method: 'get'
    })
  },
  // 贡献审核
  activeContributesId: function activeContributesId(id, data) {
    return request({
      url: `${base}/admin/contributes/${id}`,
      method: 'put',
      data
    })
  }
}
