<script setup>
// Element Plus 组件 默认 使用英语, 这里注册zh版ElementPlus
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style lang="less"></style>
