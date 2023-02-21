import network from './modules/network'

const initPlugins = function (app) {
  console.log(network)
  app.use(network)
}

export default initPlugins
