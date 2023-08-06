<script setup lang="ts">
import { NMessageProvider, NConfigProvider, darkTheme, GlobalThemeOverrides } from 'naive-ui'
import type { MessageProviderProps } from 'naive-ui'

const blogStore = useBlogStore()
const layoutStore = useLayoutStore()
const { home } = useApi()

const color = useColorMode()
const el = ref<HTMLDivElement | null>(null)

const placement = ref<MessageProviderProps['placement']>('bottom-left')
const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#409eff',
    primaryColorHover: '#79bbff'
  }
}
const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#f97316',
    primaryColorHover: '#fdba74'
  }
}

// 获取博客基本数据
blogStore.blogInfoData()
// 上传访客信息
await home.report({ lazy: true })
// 一言
blogStore.setYiYan()

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
    :theme-overrides="color.value === 'dark' ? darkThemeOverrides : lightThemeOverrides"
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
