<script setup lang="ts">
import { NMessageProvider, NConfigProvider, darkTheme } from 'naive-ui'
import type { MessageProviderProps } from 'naive-ui'
import type { IUserInfo } from '@/types/user'

const userStore = useUserStore()
const layoutStore = useLayoutStore()
// const { home } = useApi()

const color = useColorMode()
const el = ref<HTMLDivElement | null>(null)

const placement = ref<MessageProviderProps['placement']>('bottom-left')

// 获取博客基本数据
userStore.blogInfoData()
// const { data } = await home.getBlogInfo({ lazy: true })
// watch(
//   data,
//   (value) => {
//     console.log(value, '#')
//   },
//   { immediate: true }
// )

// 一言
userStore.setYiYan()
onMounted(() => {
  // 用户信息
  const info = useSessionStorage('user-info', {} as IUserInfo)
  userStore.setUserInfo(info.value)
})

// 适配移动端 屏幕宽度小于768显示
onMounted(() => {
  useResizeObserver(el, (entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    // 更换布局
    if (width < 768) {
      layoutStore.setMobile(true)
    } else {
      layoutStore.setMobile(false)
    }
  })
})
</script>

<template>
  <n-config-provider
    ref="el"
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
