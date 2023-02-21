import { getTodos, deleteTodoById, addTodo } from '@/services/home'

const user = {
  state: {
    todos: [],
  },
  mutations: {
    SET_TODOS: (state, payload) => {
      state.todos = payload.todos
    },
  },
  actions: {
    getTodos({ commit }, payload) {
      return new Promise((resolve, reject) => {
        try {
          getTodos(payload)
            .then((res) => {
              const todos = res || []
              commit({
                type: 'SET_TODOS',
                todos,
              })
              resolve(res)
            })
            .catch((error) => {
              console.error(error)
              reject(error)
            })
        } catch (error) {
          reject(error)
        }
      })
    },
    deleteTodo(context, payload) {
      return new Promise((resolve, reject) => {
        try {
          deleteTodoById(payload).then((res) => {
            resolve(res)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    addTodo(context, payload) {
      return new Promise((resolve, reject) => {
        try {
          addTodo({
            ...payload,
            userId: 1,
            completed: false,
          }).then((res) => {
            resolve(res)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
  },
}

export default { namespaced: true, ...user }
