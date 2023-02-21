import API from '@/utils/request'

export function getUsers(payload) {
  return API({
    url: '/users/1',
    method: 'get',
    params: payload,
  })
}
