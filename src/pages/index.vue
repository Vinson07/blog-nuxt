<script setup lang="ts">
import { NCarousel, NEmpty } from 'naive-ui'
import type { PostList } from '@/types/article'

const userStore = useUserStore()
const imageStore = useImageStore()
const layoutStore = useLayoutStore()

const postList = ref<PostList[]>([])
const loadMore = ref(true)
const parmas = reactive({
  current: 1
})

const { article } = useApi()

// 获取post列表
const { data, pending, refresh } = await article.getPostList(parmas)

watchEffect(() => {
  if (data.value && data.value.data.length > 0) {
    postList.value = postList.value.concat(data.value.data)
  } else {
    loadMore.value = false
  }
})

// 下一页
function handleNextPage() {
  if (loadMore.value && !pending.value) {
    parmas.current++
    refresh()
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
      :title="userStore.websiteConfig.websiteName"
      :sub-title="userStore.yiYan"
      :git-hub="userStore.link.gitHub"
      :zhi-hu="userStore.link.zhiHu"
      :music="userStore.link.music"
      :video-src="imageStore.videoUrl[0]"
      @on-left="onLeft"
      @on-right="onRight"
    />
    <div class="page-content mx-auto max-w-[780px] pt-14 max-md:px-4">
      <div>
        <HomeTitle title="メイン" icon-name="ic:baseline-computer" wavy-color="#a0daa9" />
        <n-carousel v-if="layoutStore.isMobile" draggable autoplay class="relative h-40 rounded-md">
          <NuxtLink
            v-for="(item, index) in userStore.bannerList"
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
        <div v-else class="flex justify-between">
          <HomeBanner
            v-for="(item, index) in userStore.bannerList"
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
        <ul v-if="postList.length > 0" class="max-md:px-1">
          <HomePostItem
            v-for="(item, index) in postList"
            :key="item.id"
            :item="item"
            :active="(index + 1) % 2 === 0"
          />
        </ul>
        <n-empty v-else description="暂无数据~" size="huge"> </n-empty>
        <!-- <InfiniteScroll :distance="100" class="text-center" @infinite="onInfinite">
          <HomeLoading v-if="pending" :active="parmas.current % 2 === 0" />
          <p v-else-if="!loadMore" class="text-sm text-gray-400">我也是有底线的～</p>
        </InfiniteScroll> -->
        <div class="h-[50px] text-center">
          <img
            v-if="pending"
            src="~/assets/img/svg/wordpress-rotating-ball-o.svg"
            class="mx-auto w-11 py-3"
            alt=""
          />
          <p v-else-if="!loadMore" class="text-sm text-gray-400">我也是有底线的～</p>
          <button
            v-else
            class="rounded-full border px-9 py-3 text-gray-400 hover:border-amber-500 hover:text-amber-500 hover:shadow-[0_0_4px_rgba(0,0,0,0.3)] hover:shadow-orange-400 dark:hover:border-indigo-500 dark:hover:text-indigo-500 dark:hover:shadow-indigo-500"
            @click="handleNextPage"
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
