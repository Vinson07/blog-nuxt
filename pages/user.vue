<script setup lang="ts">
import type { FormRules, FormInst } from 'naive-ui'
import { NAvatar, NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'

definePageMeta({
  layout: 'no-bottom',
  middleware: ['auth']
})

const message = useMessage()
const userStore = useUserStore()
const formRef = ref<FormInst | null>(null)
// const model = reactive({ nickname: '', email: '', website: '', introduction: '' })
const rules = reactive<FormRules>({
  nickname: [
    {
      required: true,
      validator(_, value: string) {
        if (!value) {
          return new Error('请输入昵称')
        } else if (value.length > 15) {
          return new Error('昵称不能超过15个字符！')
        }
        return true
      },
      trigger: ['blur', 'input']
    }
  ],
  email: [
    {
      required: true,
      validator(_, value: string) {
        const reg =
          /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
        if (!value) {
          return new Error('请输入邮箱')
        } else if (!reg.test(value)) {
          return new Error('邮箱不正确！')
        }
        return true
      },
      trigger: ['blur', 'input']
    }
  ]
})

const onSubmit = (e: Event) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('验证成功')
    } else {
      console.log(errors)
      message.error('验证失败')
    }
  })
}
</script>

<template>
  <client-only>
    <div class="user">
      <div class="box bg-[hsla(0,0%,10%,0.1)]">
        <div class="mb-5 text-center">
          <n-avatar round :size="60" :src="userStore.userInfo?.avatar" />
        </div>
        <n-form ref="formRef" :model="userStore.userInfo" :rules="rules">
          <n-form-item label="昵称" path="nickname">
            <n-input v-model:value="userStore.userInfo.nickname" placeholder="昵称" />
          </n-form-item>
          <n-form-item label="邮箱" path="email">
            <n-input v-model:value="userStore.userInfo.email" placeholder="邮箱" />
          </n-form-item>
          <n-form-item label="个人网站" path="website">
            <n-input v-model:value="userStore.userInfo.webSite" placeholder="个人网站" />
          </n-form-item>
          <n-form-item label="简介" path="introduction">
            <n-input
              v-model:value="userStore.userInfo.intro"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 5
              }"
              placeholder="简介"
            />
          </n-form-item>
          <div class="text-center">
            <n-button @click="onSubmit"> 提交 </n-button>
          </div>
        </n-form>
      </div>
    </div>
  </client-only>
</template>

<style lang="less">
.user {
  @apply flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat;
  background-image: url(https://cdn.sakura520.co/images/2b27097722fce411b7ae68d6c68b23dec94f8ede27a471-p1kDmK.png);
  .box {
    @apply w-96 rounded-3xl border-2 border-solid border-white py-10  px-6 text-sm text-white backdrop-blur max-md:w-80;
  }
}
</style>
