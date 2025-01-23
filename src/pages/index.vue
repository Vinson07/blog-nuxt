<script setup lang="ts">
import { NCarousel, NEmpty } from 'naive-ui'
import type { Article } from '@/types/article'

useHead({
  title: 'Vinson'
})

const blogStore = useBlogStore()
const imageStore = useImageStore()

const articleList = ref<Article[]>([])

const params = {
  current: 1,
  size: 10
}
const { article } = useApi()

// 获取文章列表
const { data, pending, execute } = await article.getArticleList(params)

if (data.value?.flag) {
  articleList.value = data.value.data.recordList
}

/**
 * 是否还要加载
 * 文章列表数和文章总数不相同 加载 反之则不加载
 * */
const isLoad = computed(() => articleList.value.length !== data.value?.data.count)

// 下一页
async function handleNextPage() {
  if (isLoad.value && !pending.value) {
    params.current++
    // 手动触发请求
    await execute()
    if (data.value?.flag) {
      articleList.value = [...articleList.value, ...data.value.data.recordList]
    }
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
        <template v-if="articleList.length > 0">
          <ul class="max-md:px-1">
            <HomePostItem v-for="item in articleList" :key="item.id" :item="item" />
          </ul>
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
              下一页
            </button>
            <p v-else class="text-gray-400">我也是有底线的～</p>
          </div>
        </template>
        <n-empty v-else description="暂无数据~" size="huge"> </n-empty>
      </div>
    </div>
  </div>
</template>
