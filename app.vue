<script setup lang="ts">
import { NMessageProvider, NConfigProvider, darkTheme, NModal, NCard, useMessage } from 'naive-ui'
import type { MessageProviderProps } from 'naive-ui'
import { searchArticle } from '@/apis/article'
import type { SearchArticle } from '@/types/article'

const userStore = useUserStore()
const darkStore = useDarkStore()
const searchStore = useSearchStore()
const router = useRouter()
const { $markdownItSearch } = useNuxtApp()

const placement = ref<MessageProviderProps['placement']>('top-right')
const articleList = ref<SearchArticle[]>([])
const keyword = ref('')

onMounted(() => {
  // 获取博客基本数据
  userStore.blogInfoData()
})

watch(keyword, async (value) => {
  try {
    const { code, data, message: msg } = await searchArticle({ current: 1, keywords: value.trim() })
    if (code === 20000) {
      articleList.value = data
    } else {
      useMessage().warning(msg)
    }
  } catch (error) {
    console.error(error)
  }
})

const gotoArticle = (id: number) => {
  keyword.value = ''
  searchStore.setModal(false)
  router.push(`/post/${id}`)
}
</script>

<template>
  <n-config-provider
    class="font-mono transition-colors duration-500 dark:bg-[#202124] dark:text-neutral-400"
    inline-theme-disabled
    preflight-style-disabled
    :theme="darkStore.isDark ? darkTheme : null"
  >
    <n-message-provider :placement="placement">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <n-modal
        v-model:show="searchStore.showModal"
        transform-origin="center"
        display-directive="show"
      >
        <n-card
          class="w-[600px] max-md:mx-5"
          :content-style="{
            padding: '0'
          }"
        >
          <div class="flex items-center px-4">
            <Icon name="ri:search-2-line" size="20" />
            <input
              v-model="keyword"
              style="background-color: var(--n-color-modal)"
              class="ml-3 mr-6 h-14 w-full flex-1 border-none text-base outline-none"
              type="text"
              placeholder="搜索文章"
            />
            <button class="text-xs" @click="searchStore.setModal(false)">ESC</button>
          </div>
          <ul
            class="search-article divide-y divide-blue-200 overflow-y-auto overflow-x-hidden transition-all duration-500 dark:divide-gray-500"
            :class="articleList.length === 0 ? 'max-h-0' : 'max-h-[500px]'"
          >
            <li v-for="item in articleList" :key="item.id" class="p-4">
              <!-- eslint-disable -->
              <h2
                class="mb-2 inline-block cursor-pointer text-base font-semibold underline"
                v-html="item.articleTitle"
                @click="gotoArticle(item.id)"
              ></h2>
              <p
                class="multiline-ellipsis h-[70px]"
                v-html="$markdownItSearch(item.articleContent)"
              ></p>
              <!-- eslint-enable -->
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
    </n-message-provider>
  </n-config-provider>
</template>
