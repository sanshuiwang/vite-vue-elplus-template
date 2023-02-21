<template>
  <el-container>
    <el-main class="appLayout">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component" class="view"></component>
        </transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppLayout',
  components: {},
  setup() {
    return {}
  },
})
</script>
<style lang="less" scoped>
.appLayout {
  :deep(.fade-transform-leave-active),
  :deep(.fade-transform-enter-active) {
    transition: all 0.5s;
  }

  :deep(.fade-transform-enter) {
    opacity: 0;
    transform: translateX(-30px);
  }

  :deep(.fade-transform-leave-to) {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
