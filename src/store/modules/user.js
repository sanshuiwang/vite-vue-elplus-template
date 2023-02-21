import { reap } from 'safe-reaper'
import { getUsers } from '@/services/user'

const user = {
  state: {
    userName: '',
  },
  mutations: {
    SET_USERNAME: (state, payload) => {
      state.userName = payload.userName
    },
  },
  actions: {
    getUsers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        try {
          getUsers(payload)
            .then((res) => {
              const userName = reap(res, 'username', '')
              commit({
                type: 'SET_USERNAME',
                userName,
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
    loginAsync({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        dispatch('getUsers', payload)
          .then((res) => {
            const token = reap(res, 'email', '') // 随意找个值作为token
            localStorage.setItem('token', token)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
}

export default { namespaced: true, ...user }
