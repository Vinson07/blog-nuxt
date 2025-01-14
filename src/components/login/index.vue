<script setup lang="ts">
import { useMessage } from 'naive-ui'

const userStore = useUserStore()
const router = useRouter()
const message = useMessage()

const { user } = useApi()

const emit = defineEmits<{
  (e: 'toggle', type: string): void
}>()

const formLogin = reactive({ username: '', password: '' })

const handleLogin = async () => {
  if (!formLogin.username) {
    message.warning('请输入邮箱号！')
    return
  }

  if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(formLogin.username)) {
    message.warning('邮箱格式有误！')
    return
  }

  if (!formLogin.password) {
    message.warning('请输入密码！')
  }

  // 取消useFetch响应式参数自动发送请求
  const params = Object.assign({}, formLogin)
  const { data } = await user.login(params)
  if (data.value?.flag) {
    userStore.setToken(data.value.data)
    message.success('登录成功')
    userStore.getUserInfo()
    router.push('/user')
  }
}
</script>

<template>
  <div class="form h-full w-full text-sm text-white">
    <h3 class="text-center text-3xl">Login</h3>
    <login-input
      v-model:value="formLogin.username"
      class="my-10"
      icon="ph:user-duotone"
      placeholder="Email"
    />
    <login-input
      v-model:value="formLogin.password"
      class="mb-5"
      type="password"
      icon="ph:lock-key-bold"
      placeholder="Password"
    />
    <div class="flex justify-end">
      <button @click="emit('toggle', 'forgotPassword')">Forgot Password?</button>
    </div>
    <div class="pt-10">
      <button class="btn-grad" @click="handleLogin">Login</button>
    </div>
    <div class="pt-9 text-center">
      <span>Don't have an account? </span>
      <button @click="emit('toggle', 'register')">Register</button>
    </div>
  </div>
</template>

<style scoped>
.form .btn-grad {
  width: 100%;
  background-image: linear-gradient(to right, #e8cbc0 0%, #636fa4 51%, #e8cbc0 100%);
  /* margin: 10px; */
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
}

.form .btn-grad:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
</style>
