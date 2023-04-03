<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { login } from '@/apis/user'

definePageMeta({
  layout: 'no-bottom'
})

const message = useMessage()
const userStore = useUserStore()
const router = useRouter()
const toggleForm = ref(false)
const formLogin = reactive({ account: '', password: '' })
const fromRegister = reactive({ account: '', code: '', password: '' })

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
  try {
    const fd = new FormData()
    fd.append('username', formLogin.account.trim())
    fd.append('password', formLogin.password.trim())
    const { code, data, message: msg } = await login(fd)
    if (code === 20000) {
      userStore.setUserInfo(data)
      router.push('/user')
    } else {
      message.warning(msg)
    }
  } catch (error) {
    console.warn(error)
  }
}
</script>

<template>
  <client-only>
    <div class="login">
      <div class="box h-[500px]" :class="{ active: toggleForm }">
        <div class="form bg-[hsla(0,0%,10%,0.1)]">
          <h3 class="text-center text-3xl">Login</h3>
          <LoginInput
            v-model:value="formLogin.account"
            class="my-10"
            icon="ph:user-duotone"
            placeholder="Email"
          />
          <LoginInput
            v-model:value="formLogin.password"
            class="mb-5"
            type="password"
            icon="ph:lock-key-bold"
            placeholder="Password"
          />
          <div class="flex justify-end">
            <nuxt-link to="">Forgot Password?</nuxt-link>
          </div>
          <div class="pt-5">
            <button class="w-full rounded-lg bg-white py-4 text-lg text-black" @click="handleLogin">
              Login
            </button>
          </div>
          <div class="pt-9 text-center">
            <span>Don't have an account? </span>
            <button @click="handleToggleForm">Register</button>
          </div>
        </div>
        <div class="form register bg-[hsla(0,0%,10%,0.1)]">
          <h3 class="text-center text-3xl">Register</h3>
          <LoginInput
            v-model:value="fromRegister.account"
            class="my-10"
            icon="ph:user-duotone"
            placeholder="Email"
          />
          <LoginInput
            v-model:value="fromRegister.code"
            class="mb-10"
            icon="material-symbols:code-rounded"
            placeholder="Code"
          />
          <LoginInput
            v-model:value="fromRegister.password"
            class="mb-5"
            type="password"
            icon="ph:lock-key-bold"
            placeholder="Password"
          />
          <div class="pt-5">
            <button class="w-full rounded-lg bg-white py-4 text-lg text-black">Register</button>
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

<style lang="less">
.login {
  @apply flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat;
  background-image: url(https://cdn.sakura520.co/images/login-bg.png);
  .box {
    @apply relative w-96 max-md:w-80;
    transform-style: preserve-3d;
    transition: 1s;
    .form {
      @apply absolute top-0 left-0 h-full w-full rounded-3xl border-2 border-solid border-white  py-10 px-6 text-sm text-white backdrop-blur;
      backface-visibility: hidden;
    }
    .register {
      transform: rotateY(180deg);
    }
    &.active {
      transform: rotateY(180deg);
    }
  }
}
</style>
