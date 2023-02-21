import API from '@/utils/request'

export function getTodos(payload) {
  return API({
    url: '/todos',
    method: 'get',
    params: payload,
  })
}

export function deleteTodoById(payload) {
  return API({
    url: `/todos/${payload.id}`,
    method: 'DELETE',
  })
}

export function addTodo(payload) {
  return API({
    url: '/todos',
    method: 'POST',
    data: payload,
  })
}
