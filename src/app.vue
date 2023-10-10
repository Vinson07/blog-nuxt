<script setup lang="ts">
import {
  NMessageProvider,
  NBackTop,
  NConfigProvider,
  darkTheme,
  GlobalThemeOverrides
} from 'naive-ui'
import type { MessageProviderProps } from 'naive-ui'

const blogStore = useBlogStore()
const { home } = useApi()
const { isDesktop } = useDevice()

const color = useColorMode()
const el = ref<HTMLDivElement | null>(null)

const placement = ref<MessageProviderProps['placement']>('top')
const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    // primaryColor: '#409eff',
    // primaryColorHover: '#79bbff'
    primaryColor: '#6366f1',
    primaryColorHover: '#818cf8'
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

// if (isDesktop) {
//   useHead({
//     script: [
//       {
//         src: 'https://cdn.staticfile.org/sakana-widget/2.6.1/sakana.min.js',
//         defer: true,
//         onload: () => {
//           // @ts-ignore
//           new SakanaWidget().mount('#sakana-widget')
//         }
//       }
//     ]
//   })
// }
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
    <!-- 回到顶部 -->
    <TheBackTop />
    <n-back-top :right="20" class="z-40 md:hidden">
      <Icon name="material-symbols:rocket" class="text-2xl text-orange-500 dark:text-indigo-500" />
    </n-back-top>
    <!-- 搜索 -->
    <TheSearch />
    <!-- 石蒜模拟器网页小组件 -->
    <!-- <div id="sakana-widget" class="fixed bottom-0 right-0 z-[9]"></div> -->
    <!-- 音乐 -->
    <Music v-if="blogStore.siteConfig?.isMusic && isDesktop" />
    <!-- 背景 -->
    <canvas
      id="my-canvas"
      class="pointer-events-none fixed top-0 left-0 -z-50 hidden h-full w-full dark:block"
    ></canvas>
  </n-config-provider>
</template>
