<script setup lang="ts">
import { useMessage, NButton } from 'naive-ui'

interface Props {
  type: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle', type: string): void
}>()

const message = useMessage()
const fromRegister = reactive({ username: '', code: '', password: '' })

const { text: codeText, flag, timer } = useTimer('发送')
const { user } = useApi()

const text = computed(() => (props.type === 'register' ? 'Register' : 'ChangePassword'))

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

  const { data } = await user.getCode(fromRegister.username)
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

  const params = Object.assign({}, fromRegister)
  if (props.type === 'register') {
    const { data } = await user.register(params)
    if (data.value?.flag) {
      message.success('注册成功！')
      emit('toggle', 'login')
    }
  } else {
    const { data } = await user.changePassword(params)
    if (data.value?.flag) {
      message.success('修改成功！')
      emit('toggle', 'login')
    }
  }
}
</script>

<template>
  <div class="form h-full w-full text-sm text-white">
    <h3 class="text-center text-3xl">{{ text }}</h3>
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
      <button class="btn-grad" @click="handleRegister">{{ text }}</button>
    </div>
    <div class="pt-9 text-center">
      <span>Existing account! </span>
      <button @click="emit('toggle', 'login')">Login</button>
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
