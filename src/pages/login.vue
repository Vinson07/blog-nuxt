<script setup lang="ts">
import { useMessage, NButton } from 'naive-ui'

definePageMeta({
  layout: 'no-bottom'
})

const message = useMessage()
const { text: codeText, flag, timer } = useTimer('发送')
const userStore = useUserStore()
const imageStore = useImageStore()
const router = useRouter()
const route = useRoute()
const toggleForm = ref(false)
const formLogin = reactive({ account: '', password: '' })
const fromRegister = reactive({ username: '', code: '', password: '' })

const { user } = useApi()

function handleToggleForm() {
  toggleForm.value = !toggleForm.value
}

const handleLogin = async () => {
  if (!formLogin.account) {
    message.warning('请输入邮箱号！')
    return
  }

  if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(formLogin.account)) {
    message.warning('邮箱格式有误！')
    return
  }

  if (!formLogin.password) {
    message.warning('请输入密码！')
    return
  }

  const fd = new FormData()
  fd.append('username', formLogin.account.trim())
  fd.append('password', formLogin.password.trim())
  const { data } = await user.login(fd)
  if (data.value?.data) {
    userStore.setUserInfo(data.value.data)
    // router.push('/user')
    router.push(route.query.path as string)
  }
}

const onSendCode = async () => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!fromRegister.username.trim()) {
    message.warning('请输入邮箱号！')
    return
  }
  if (!reg.test(fromRegister.username)) {
    message.warning('邮箱格式有误！')
    return
  }

  const { data } = await user.sendCode(fromRegister.username)
  if (data.value?.flag) {
    timer(60)
    message.success('验证码已发送，请注意查收')
  }
}

const handleRegister = async () => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!fromRegister.username.trim()) {
    message.warning('请输入邮箱号！')
    return
  }

  if (!reg.test(fromRegister.username)) {
    message.warning('邮箱格式有误！')
    return
  }

  if (fromRegister.code.trim().length !== 6) {
    message.warning('请输入6位验证码！')
    return
  }

  if (!fromRegister.password.trim()) {
    message.warning('请输入密码！')
    return
  }

  const { data } = await user.register(fromRegister)
  if (data.value?.flag) {
    message.success('注册成功！')
    fromRegister.username = ''
    fromRegister.code = ''
    fromRegister.password = ''
  }
}
</script>

<template>
  <client-only>
    <div
      class="login flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${imageStore.pageList.login})` }"
    >
      <div
        class="box relative w-96 overflow-hidden rounded-3xl border-2 border-solid border-white max-md:w-80"
        :class="{ 'h-[500px]': toggleForm }"
      >
        <div
          class="form h-full w-full rounded-3xl bg-[hsla(0,0%,10%,0.1)] py-10 px-6 text-sm text-white backdrop-blur transition-all duration-500"
        >
          <h3 class="text-center text-3xl">Login</h3>
          <login-input
            v-model:value="formLogin.account"
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
          <!-- <div class="flex justify-end">
            <nuxt-link to="">Forgot Password?</nuxt-link>
          </div> -->
          <div class="pt-10">
            <button class="btn-grad" @click="handleLogin">Login</button>
          </div>
          <div class="pt-9 text-center">
            <span>Don't have an account? </span>
            <button @click="handleToggleForm">Register</button>
          </div>
        </div>
        <div
          class="form absolute top-0 left-96 h-full w-full rounded-3xl bg-[hsla(0,0%,10%,0.1)] py-10 px-6 text-sm text-white backdrop-blur transition-all duration-500"
          :style="{ left: toggleForm ? '0' : '' }"
        >
          <h3 class="text-center text-3xl">Register</h3>
          <login-input
            v-model:value="fromRegister.username"
            class="my-10"
            icon="ph:user-duotone"
            placeholder="Email"
          />
          <login-input
            v-model:value="fromRegister.code"
            class="mb-10"
            icon="material-symbols:code-rounded"
            placeholder="Code"
          >
            <template #right-icon>
              <n-button
                size="small"
                style="background: transparent"
                secondary
                strong
                :disabled="flag"
                @click="onSendCode"
              >
                {{ codeText }}
              </n-button>
            </template>
          </login-input>
          <login-input
            v-model:value="fromRegister.password"
            class="mb-5"
            type="password"
            icon="ph:lock-key-bold"
            placeholder="Password"
          />
          <div class="pt-5">
            <button class="btn-grad" @click="handleRegister">Register</button>
          </div>
          <div class="pt-9 text-center">
            <span>Existing account! </span>
            <button @click="handleToggleForm">Login</button>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>
