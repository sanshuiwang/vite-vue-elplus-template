<template>
  <div class="particles-js-box">
    <div id="particlesId"></div>
  </div>
</template>

<script>
import particlesConfig from './particles.json'
import { defineComponent, onMounted } from 'vue'
import { scriptLoader } from '@/utils/scriptLoader.js'
export default defineComponent({
  name: 'VueParticles',
  setup() {
    let init = () => {
      try {
        window.particlesJS('particlesId', particlesConfig)
        document.body.style.overflow = 'hidden'
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      // 登录页面粒子效果
      scriptLoader('/particles.js').then(() => {
        init()
      })
    })
  },
})
</script>

<style scoped>
.particles-js-box {
  height: 100vh;
}
#particlesId {
  background-color: #2d3a4b;
  width: 100%;
  height: 100%;
}
</style>
