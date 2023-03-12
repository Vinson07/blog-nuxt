<script setup lang="ts">
import { NMessageProvider, NConfigProvider, darkTheme } from 'naive-ui'
import type { MessageProviderProps } from 'naive-ui'

const userStore = useUserStore()
const darkStore = useDarkStore()
const el = ref(null)
const layout = ref('default')
const placement = ref<MessageProviderProps['placement']>('bottom-left')

// 适配移动端 屏幕宽度小于768显示
useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  // 更换布局
  if (width > 768) {
    layout.value = 'default'
  } else {
    layout.value = 'mobile'
  }
})

// 获取博客基本数据
userStore.blogInfoData()
</script>

<template>
  <n-config-provider
    ref="el"
    class="transition-colors duration-500 dark:bg-[#202124] dark:text-neutral-400"
    inline-theme-disabled
    preflight-style-disabled
    :theme="darkStore.isDark ? darkTheme : null"
  >
    <n-message-provider :placement="placement">
      <NuxtLayout :name="layout">
        <NuxtPage />
      </NuxtLayout>
    </n-message-provider>
  </n-config-provider>
</template>
