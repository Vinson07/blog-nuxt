<script setup lang="ts">
import { NMessageProvider, NConfigProvider, darkTheme, NModal, NCard } from 'naive-ui'
import type { MessageProviderProps } from 'naive-ui'

const userStore = useUserStore()
const darkStore = useDarkStore()
const searchStore = useSearchStore()

const placement = ref<MessageProviderProps['placement']>('bottom-left')

onMounted(() => {
  // 获取博客基本数据
  userStore.blogInfoData()
})
</script>

<template>
  <n-config-provider
    class="font-serif subpixel-antialiased transition-colors duration-500 dark:bg-[#202124] dark:text-neutral-400 md:font-mono"
    inline-theme-disabled
    preflight-style-disabled
    :theme="darkStore.isDark ? darkTheme : null"
  >
    <n-message-provider :placement="placement">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </n-message-provider>
    <n-modal v-model:show="searchStore.showModal" :block-scroll="false" transform-origin="center">
      <n-card
        class="w-[600px]"
        :content-style="{
          padding: '0'
        }"
      >
        <ul class="search-article divide-y divide-blue-200 dark:divide-gray-500">
          <li class="flex items-center px-4">
            <Icon name="ri:search-2-line" size="20" />
            <input
              style="background-color: var(--n-color-modal)"
              class="ml-3 mr-6 h-14 w-full flex-1 border-none text-base outline-none"
              type="text"
              placeholder="搜索文章"
            />
            <button class="text-xs">ESC</button>
          </li>
          <li class="p-4">
            <p>
              如果你年轻的时候不 996，你什么时候可以 996？你一辈子没有
              996，你觉得你就很骄傲了？这个世界上，我们每一个人都希望成功，都希望美好生活，都希望被尊重，我请问大家，你不付出超越别人的努力和时间，你怎么能够实现你想要的成功？
            </p>
          </li>
          <li class="p-4">
            <p>
              如果你年轻的时候不 996，你什么时候可以 996？你一辈子没有
              996，你觉得你就很骄傲了？这个世界上，我们每一个人都希望成功，都希望美好生活，都希望被尊重，我请问大家，你不付出超越别人的努力和时间，你怎么能够实现你想要的成功？
            </p>
          </li>
          <li class="p-4">
            <p>
              如果你年轻的时候不 996，你什么时候可以 996？你一辈子没有
              996，你觉得你就很骄傲了？这个世界上，我们每一个人都希望成功，都希望美好生活，都希望被尊重，我请问大家，你不付出超越别人的努力和时间，你怎么能够实现你想要的成功？
            </p>
          </li>
        </ul>
        <template #action>
          <div class="flex items-center justify-end">
            <span class="mr-4">Search by</span>
            <Icon name="material-symbols:location-searching" size="24" />
            <span class="ml-1 text-lg">Vinson</span>
          </div>
        </template>
      </n-card>
    </n-modal>
  </n-config-provider>
</template>
