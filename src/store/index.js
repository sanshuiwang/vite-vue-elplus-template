import { createStore } from 'vuex'
import user from './modules/user'
import home from './modules/home'
import getters from './getters'

export default createStore({
  modules: {
    user,
    home,
  },
  getters,
})
