<script setup lang="ts">
import { NCarousel } from 'naive-ui'
import type { PostList } from '@/types/article'
import { getPostList } from '@/apis/article'

const userStore = useUserStore()
const imageStore = useImageStore()
const postList = ref<PostList[]>([])
const current = ref<number>(1)
const nextPage = ref(true)
const loading = ref(false)
const homeRef = ref<HTMLDivElement | null>(null)
const isMobile = ref(false)
const postLoading = ref(true)

// 切换背景图片
const onLeft = () => {
  imageStore.togglePage('home', imageStore.randomImage[0] + `?t=${Date.now()}`)
}
const onRight = () => {
  imageStore.togglePage('home', imageStore.randomImage[1] + `?t=${Date.now()}`)
}

// 下一页
function handleNextPage() {
  nextPage.value = false
  loading.value = true
  current.value++
  addPostList(current.value)
}

// 首次获取post列表
addPostList(current.value)

// 获取post列表
async function addPostList(current: number) {
  try {
    const { data } = await getPostList(current)
    if (data && data.length > 0) {
      postList.value = postList.value.concat(data)
      nextPage.value = true
      loading.value = false
    } else {
      nextPage.value = false
      loading.value = false
    }
  } catch (error) {
    console.error(error)
  } finally {
    postLoading.value = false
  }
}

// 适配移动端 屏幕宽度小于768显示
onMounted(() => {
  useResizeObserver(homeRef, (entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    // 更换布局
    if (width > 768) {
      isMobile.value = false
    } else {
      isMobile.value = true
    }
  })
})
</script>

<template>
  <div ref="homeRef">
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
    <div class="page-content mx-auto max-w-[820px] pt-14 max-md:px-4">
      <div>
        <HomeContentTitle />
        <n-carousel v-if="isMobile" draggable autoplay class="relative h-40 rounded-md">
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
        <div v-else class="flex">
          <home-content-banner
            v-for="(item, index) in userStore.bannerList"
            :key="index"
            :title="item.title"
            :describe="item.describe"
            :link="item.link"
            :bg-src="item.bgSrc"
          />
        </div>
      </div>
      <main class="pt-10">
        <HomeContentTitle title="記事一覧" icon-name="ep:collection-tag" wavy-color="#fccd00" />
        <ul class="max-md:px-1">
          <template v-if="postLoading">
            <HomeContentLoading v-for="num in 10" :key="num" :active="num % 2 === 0" />
          </template>
          <template v-else>
            <HomeContentItem
              v-for="(item, index) in postList"
              :key="item.id"
              :item="item"
              :active="(index + 1) % 2 === 0"
            />
          </template>
        </ul>
        <div class="text-center">
          <button
            v-show="nextPage"
            class="rounded-full border px-9 py-3 text-gray-400 hover:border-amber-500 hover:text-amber-500 hover:shadow-[0_0_4px_rgba(0,0,0,0.3)] hover:shadow-orange-400 dark:hover:border-indigo-500 dark:hover:text-indigo-500 dark:hover:shadow-indigo-500"
            @click="handleNextPage"
          >
            Previous
          </button>
          <img
            v-show="loading"
            src="~/assets/img/svg/wordpress-rotating-ball-o.svg"
            class="mx-auto w-11 py-3"
            alt=""
          />
          <p v-show="!nextPage && !loading">我也是有底线的～</p>
        </div>
      </main>
    </div>
  </div>
</template>
