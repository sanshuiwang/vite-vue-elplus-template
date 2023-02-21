import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from './router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (to.path !== '/login') {
    store.dispatch('user/getUsers')
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
