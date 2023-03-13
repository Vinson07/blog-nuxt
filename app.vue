<script setup lang="ts">
import { NMessageProvider, NConfigProvider, darkTheme } from 'naive-ui'
import type { MessageProviderProps } from 'naive-ui'

const userStore = useUserStore()
const darkStore = useDarkStore()
const placement = ref<MessageProviderProps['placement']>('bottom-left')

// 获取博客基本数据
userStore.blogInfoData()
</script>

<template>
  <n-config-provider
    class="transition-colors duration-500 dark:bg-[#202124] dark:text-neutral-400"
    inline-theme-disabled
    preflight-style-disabled
    :theme="darkStore.isDark ? darkTheme : null"
  >
    <n-message-provider :placement="placement">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </n-message-provider>
  </n-config-provider>
</template>
