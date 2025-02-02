<script setup lang="ts">
import { NCarousel, NEmpty } from 'naive-ui'
import type { Article } from '@/types/article'

// useHead({
//   title: 'Vinson'
// })

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
        <!-- 移动端轮播图 -->
        <n-carousel draggable autoplay class="h-40 rounded-md md:hidden">
          <HomeBanner
            v-for="(item, index) in blogStore.bannerList"
            :key="index"
            :title="item.title"
            :describe="item.describe"
            :link="item.link"
            :bg-src="item.bgSrc"
            active
          />
        </n-carousel>
        <div class="flex h-40 justify-between max-md:hidden">
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
              class="hover:border-v-hc hover:text-v-hc hover:shadow-v-hc dark:hover:border-v-hc-dark dark:hover:text-v-hc-dark dark:hover:shadow-v-hc-dark rounded-full border px-9 py-3 text-gray-400 hover:shadow-[0_0_4px_rgba(0,0,0,0.3)]"
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
