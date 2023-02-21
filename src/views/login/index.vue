<template>
  <main class="appLogin">
    <section class="loginFormSection">
      <h1 class="title">VITE</h1>
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="64px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="loginForm.name" :maxlength="20" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" :maxlength="20" type="password" />
        </el-form-item>

        <el-footer class="footer">
          <el-row>
            <el-button type="primary" @click="onLoginSubmit()">登录</el-button>
          </el-row>
        </el-footer>
      </el-form>
    </section>

    <vue-particles />
  </main>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AppLogin',
  components: {},
  setup() {
    const store = useStore()
    const router = useRouter()

    const loginFormRef = ref()

    const loginForm = reactive({
      name: '',
      password: '',
    })

    const rules = {
      name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    }

    const onLoginSubmit = () => {
      loginFormRef.value.validate((valid) => {
        if (!valid) {
          return
        }
        store
          .dispatch('user/loginAsync', loginForm)
          .then(() => {
            ElMessage.success(`登录成功`)
            router.push({
              name: 'AppHome',
            })
          })
          .catch(() => {
            ElMessage.error(`登录失败！！！`)
          })
      })
    }

    return {
      loginFormRef,
      loginForm,
      rules,
      onLoginSubmit,
    }
  },
})
</script>
<style scoped lang="less">
.loginFormSection {
  padding: 20px;
  background: #ffffff;
  width: 400px;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;

  .title {
    text-align: center;
    margin-bottom: 20px;
  }

  .footer {
    height: auto;

    :deep(.el-row) {
      justify-content: center;
    }
    :deep(.el-button) {
      width: 200px;
    }
  }
}
</style>
