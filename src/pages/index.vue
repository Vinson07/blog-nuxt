<script setup lang="ts">
import { NCarousel, NEmpty } from 'naive-ui'
import type { Article } from '@/types/article'

useHead({
  title: 'Vinson',
  meta: [
    {
      name: 'description',
      content: `vinson，Vinson个人博客，知识库`
    },
    { name: 'keywords', content: `博客，前端` }
  ]
})

const blogStore = useBlogStore()
const imageStore = useImageStore()

const articleList = ref<Article[]>([])
const articleCount = ref(0)
const parmas = reactive({
  current: 1,
  size: 5
})

const { article } = useApi()

// 获取文章列表
const { data, pending } = await article.getArticleList(parmas)
watch(
  data,
  (value) => {
    if (value && value.data) {
      articleCount.value = value.data.count
      if (value.data.recordList.length > 0) {
        articleList.value = [...articleList.value, ...value.data.recordList]
      }
    }
  },
  { immediate: true }
)

/**
 * 是否还要加载
 * 文章数和列表数不相同 加载 反之则不加载
 * */
const isLoad = computed(() => articleList.value.length !== articleCount.value)

// 下一页
function handleNextPage() {
  if (isLoad.value && !pending.value) {
    parmas.current++
  }
}

// 切换背景图片
const onLeft = () => {
  imageStore.togglePage('home', imageStore.randomImage[0] + `?t=${Date.now()}`)
}
const onRight = () => {
  imageStore.togglePage('home', imageStore.randomImage[1] + `?t=${Date.now()}`)
}
</script>

<template>
  <div>
    <HomeBackground
      :bg-src="imageStore.pageList.home"
      :title="blogStore.siteConfig?.siteName"
      :sub-title="blogStore.yiYan"
      :git-hub="blogStore.siteConfig?.github"
      :gitee="blogStore.siteConfig?.gitee"
      :bilibili="blogStore.siteConfig?.bilibili"
      :qq="blogStore.siteConfig?.qq"
      :video-src="blogStore.siteConfig?.websocketUrl"
      @on-left="onLeft"
      @on-right="onRight"
    />
    <div class="page-content mx-auto max-w-[780px] pt-14 max-md:px-4">
      <HomeTip :tip="blogStore.siteConfig?.siteNotice ?? ''" />
      <div class="pt-10">
        <HomeTitle title="メイン" icon-name="ic:baseline-computer" wavy-color="#a0daa9" />
        <n-carousel draggable autoplay class="relative h-40 rounded-md md:hidden">
          <NuxtLink
            v-for="(item, index) in blogStore.bannerList"
            :key="index"
            target="_blank"
            :to="item.link"
          >
            <TheImage :src="item.bgSrc" />
            <div
              class="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(255,255,255,0.4)] text-center dark:bg-[rgba(51,51,51,0.7)]"
            >
              <h4
                class="mt-7 mb-5 bg-[rgba(255,255,255,0.4)] py-3 text-lg uppercase text-[#505050] dark:bg-[rgb(0,0,0,0.2)] dark:text-[#CCCCCC]"
              >
                {{ item.title }}
              </h4>
              <p class="text-xs italic text-[#505050] dark:text-[#CCCCCC]">{{ item.describe }}</p>
            </div>
          </NuxtLink>
        </n-carousel>
        <div class="flex justify-between max-md:hidden">
          <HomeBanner
            v-for="(item, index) in blogStore.bannerList"
            :key="index"
            :title="item.title"
            :describe="item.describe"
            :link="item.link"
            :bg-src="item.bgSrc"
          />
        </div>
      </div>
      <div class="pt-10">
        <HomeTitle title="記事一覧" icon-name="ep:collection-tag" wavy-color="#fccd00" />
        <ul v-if="articleList.length > 0" class="max-md:px-1">
          <HomePostItem
            v-for="(item, index) in articleList"
            :key="item.id"
            :item="item"
            :active="(index + 1) % 2 === 0"
          />
        </ul>
        <n-empty v-else description="暂无数据~" size="huge"> </n-empty>
        <div class="h-[50px] text-center">
          <img
            v-if="pending"
            src="~/assets/img/svg/wordpress-rotating-ball-o.svg"
            class="mx-auto w-11 py-3"
            alt=""
          />
          <button
            v-else-if="isLoad"
            class="rounded-full border px-9 py-3 text-gray-400 hover:border-amber-500 hover:text-amber-500 hover:shadow-[0_0_4px_rgba(0,0,0,0.3)] hover:shadow-orange-400 dark:hover:border-indigo-500 dark:hover:text-indigo-500 dark:hover:shadow-indigo-500"
            @click="handleNextPage"
          >
            Previous
          </button>
          <p v-else class="text-sm text-gray-400">我也是有底线的～</p>
        </div>
      </div>
    </div>
  </div>
</template>
