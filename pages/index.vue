<script setup lang="ts">
import { useMessage } from 'naive-ui'
import type { PostList } from '@/types/article'
import { getPostList } from '@/apis/article'

const userStore = useUserStore()
const imageStore = useImageStore()
const postList = ref<PostList[]>([])
const current = ref<number>(1)
const nextPage = ref(true)
const loading = ref(false)
const msg = useMessage()

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

onMounted(() => {
  // 首次获取post列表
  addPostList(current.value)
})

// 获取post列表
async function addPostList(current: number) {
  try {
    const { code, data, message } = await getPostList(current)
    if (code === 20000) {
      if (data && data.length > 0) {
        postList.value = postList.value.concat(data)
        nextPage.value = true
        loading.value = false
      } else {
        nextPage.value = false
        loading.value = false
      }
    } else {
      msg.warning(message)
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <HomeBackground
      :bg-src="imageStore.pageList.home"
      :title="userStore.websiteConfig.websiteName"
      :sub-title="userStore.websiteConfig.websiteIntro"
      :git-hub="userStore.link.gitHub"
      :zhi-hu="userStore.link.zhiHu"
      :music="userStore.link.music"
      :video-src="imageStore.videoUrl[0]"
      @on-left="onLeft"
      @on-right="onRight"
    />
    <div class="page-content mx-auto max-w-[768px] pt-14 max-md:px-4">
      <HomeContentBanner />
      <main>
        <h3 class="h-title">
          <Icon name="entypo:leaf" />
          <span class="ml-2">Discovery</span>
        </h3>
        <ul class="max-md:px-1">
          <HomeContentItem
            v-for="(item, index) in postList"
            :key="item.id"
            :item="item"
            :active="(index + 1) % 2 === 0"
          />
        </ul>
        <div class="text-center">
          <button v-show="nextPage" class="next-page" @click="handleNextPage">Previous</button>
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

<style lang="less">
.h-title {
  @apply mb-8 flex items-center border-b border-dashed border-gray-300 py-2 text-base font-normal;
}

.next-page {
  @apply rounded-full border px-9 py-3 text-gray-400 hover:border-amber-500 hover:text-amber-500 hover:shadow-[0_0_4px_rgba(0,0,0,0.3)] hover:shadow-orange-400 dark:hover:border-indigo-500 dark:hover:text-indigo-500 dark:hover:shadow-indigo-500;
}
</style>
