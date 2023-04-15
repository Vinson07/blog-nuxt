<script setup lang="ts">
import { useMessage, NCarousel } from 'naive-ui'
import type { PostList } from '@/types/article'
import { getPostList } from '@/apis/article'

const userStore = useUserStore()
const imageStore = useImageStore()
const postList = ref<PostList[]>([])
const current = ref<number>(1)
const nextPage = ref(true)
const loading = ref(false)
const msg = useMessage()
const homeRef = ref(null)
const isMobile = ref(false)

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

// 适配移动端 屏幕宽度小于768显示
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
</script>

<template>
  <div ref="homeRef">
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
      <n-carousel v-if="isMobile" draggable autoplay class="rounded-md">
        <nuxt-link target="_blank" to="https://music.sakura520.co">
          <img
            class="carousel-img"
            src="https://cdn.sakura520.co/images/20180325154208_GYwna.jpeg"
          />
        </nuxt-link>
        <nuxt-link target="_blank" to="https://chatmindai.com">
          <img
            class="carousel-img"
            src="https://cdn.sakura520.co/images/20170416215602_iNAM4.jpeg"
          />
        </nuxt-link>
        <nuxt-link target="_blank" to="">
          <img
            class="carousel-img"
            src="https://cdn.sakura520.co/images/38bf42ad37a6eba0b927e10e8d544ac498e9c4c0.jpeg"
          />
        </nuxt-link>
      </n-carousel>
      <HomeContentBanner v-else />
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

.carousel-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
