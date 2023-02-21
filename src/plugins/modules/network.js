import { ElNotification } from 'element-plus'

const Network = function () {}

Network.prototype.install = function () {
  let notification = null
  window.addEventListener('offline', function () {
    notification = ElNotification({
      title: '网络异常',
      message: '请检查您的网络',
      type: 'error',
      duration: 0,
    })
  })
  window.addEventListener('online', function () {
    notification.close()
  })
}

Network.prototype.off = function () {
  window.removeEventListener('offline', this.eventHandle)
  window.removeEventListener('online', this.eventHandle)
}

const network = new Network()

export default network
