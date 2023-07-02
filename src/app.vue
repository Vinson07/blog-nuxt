<script setup lang="ts">
import { NMessageProvider, NConfigProvider, darkTheme } from 'naive-ui'
import type { MessageProviderProps } from 'naive-ui'

import type { IUserInfo } from '@/types/user'
const userStore = useUserStore()

const color = useColorMode()

const placement = ref<MessageProviderProps['placement']>('top')

// 获取博客基本数据
userStore.blogInfoData()
// 一言
userStore.setYiYan()
onMounted(() => {
  // 用户信息
  const info = useSessionStorage('user-info', {} as IUserInfo)
  userStore.setUserInfo(info.value)
})
</script>

<template>
  <n-config-provider
    inline-theme-disabled
    preflight-style-disabled
    :theme="color.value === 'dark' ? darkTheme : null"
  >
    <!-- 消息提示 -->
    <n-message-provider :placement="placement">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </n-message-provider>
    <!-- 搜索 -->
    <TheSearch />
    <!-- 背景 -->
    <canvas
      id="my-canvas"
      class="pointer-events-none fixed top-0 left-0 -z-50 hidden h-full w-full dark:block"
    ></canvas>
  </n-config-provider>
</template>
