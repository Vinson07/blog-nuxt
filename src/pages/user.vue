<script setup lang="ts">
import type { FormRules, FormInst, UploadFileInfo, UploadCustomRequestOptions } from 'naive-ui'
import { NAvatar, NForm, NFormItem, NInput, NButton, NUpload, useMessage } from 'naive-ui'

definePageMeta({
  layout: 'no-bottom',
  middleware: ['auth']
})

const message = useMessage()
const userStore = useUserStore()
const imageStore = useImageStore()
const formRef = ref<FormInst | null>(null)
const model = reactive({ nickname: '', intro: '', webSite: '', email: '' })

const { user } = useApi()

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

onMounted(() => {
  if (userStore.userInfo) {
    const { nickname, intro, webSite, email } = userStore.userInfo
    model.nickname = nickname
    model.intro = intro
    model.webSite = webSite
    model.email = email
  }
})

const beforeUpload = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  const fileSize = data.file.file?.size ?? 0
  if (fileSize > 1024 * 1024) {
    message.error('图片不能超过1M，请重新上传')
    return false
  }
  return true
}

const customUpload = async ({ file, onFinish, onError }: UploadCustomRequestOptions) => {
  const formData = new FormData()
  formData.append('file', file.file as File)
  const { data } = await user.updateAvatar(formData)
  if (data.value?.flag) {
    if (userStore.userInfo) {
      userStore.setUserInfo({ ...userStore.userInfo, avatar: data.value.data })
    }
    message.success('更新头像成功')
    onFinish()
  } else {
    onError()
  }
}

const onSubmit = (e: Event) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const { data } = await user.updateUserInfo(model)
      if (data.value?.flag) {
        message.success('更新成功！')
        if (userStore.userInfo) {
          userStore.setUserInfo({ ...userStore.userInfo, ...model })
        }
      }
    } else {
      console.log(errors)
      message.error('验证失败')
    }
  })
}
</script>

<template>
  <client-only>
    <div
      class="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${imageStore.pageList.user})` }"
    >
      <div
        class="w-96 rounded-3xl border-2 border-solid border-white bg-[hsla(0,0%,10%,0.1)] py-10 px-6 text-sm text-white backdrop-blur max-md:w-80"
      >
        <div class="mb-5 text-center">
          <n-upload
            accept="image/*"
            :show-file-list="false"
            :custom-request="customUpload"
            @before-upload="beforeUpload"
          >
            <div class="group relative cursor-pointer">
              <n-avatar round :size="64" :src="userStore.userInfo?.avatar" />
              <div
                class="absolute top-0 left-0 hidden h-16 w-16 items-center justify-center rounded-full bg-[rgba(0,0,0,0.3)] text-xs group-hover:flex"
              >
                上传头像
              </div>
            </div>
          </n-upload>
        </div>
        <n-form ref="formRef" :model="model" :rules="rules">
          <n-form-item label="昵称" path="nickname">
            <n-input v-model:value="model.nickname" placeholder="昵称" />
          </n-form-item>
          <n-form-item label="邮箱" path="email">
            <n-input v-model:value="model.email" disabled placeholder="邮箱" />
          </n-form-item>
          <n-form-item label="个人网站" path="website">
            <n-input v-model:value="model.webSite" placeholder="个人网站" />
          </n-form-item>
          <n-form-item label="简介" path="introduction">
            <n-input
              v-model:value="model.intro"
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
