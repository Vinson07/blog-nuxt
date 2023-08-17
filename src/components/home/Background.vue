<script setup lang="ts">
interface Props {
  videoSrc?: string
  bgSrc?: string
  title?: string
  subTitle?: string
  bgMask?: string
  gitHub?: string
  gitee?: string
  bilibili?: string
  qq?: string
  music?: string
}

withDefaults(defineProps<Props>(), {
  videoSrc: '',
  bgSrc: '',
  title: 'Vinson Blog',
  subTitle: '',
  bgMask: 'filter-dot', // filter-grid filter-dot filter-dim filter-undertint pattern-center
  gitHub: '',
  gitee: '',
  bilibili: '',
  qq: '',
  music: ''
})

const showVideo = ref(false)
const showPlay = ref(true)
const titleTop = ref('-50%')
const videoRef = ref<HTMLVideoElement | null>(null)
const emit = defineEmits(['onLeft', 'onRight'])

onMounted(async () => {
  await nextTick()
  titleTop.value = '50%'
})

// 触发播放暂停按钮
function handlePlay() {
  if (videoRef.value) {
    videoRef.value.play()
  }
}
function handlePause() {
  if (videoRef.value) {
    videoRef.value.pause()
  }
}
// 视频播放
function onPlay() {
  showVideo.value = true
  showPlay.value = false
  titleTop.value = '-50%'
}
// 视频暂停
function onPause() {
  showPlay.value = true
  titleTop.value = '50%'
}
// 视频播放结束触发事件
function onEnded() {
  showVideo.value = false
  showPlay.value = true
  titleTop.value = '50%'
}

function handleDown(selector: string) {
  const pageId: HTMLDivElement = document.querySelector(selector) as HTMLDivElement
  window.scrollTo({
    top: pageId.offsetTop,
    behavior: 'smooth'
  })
}

// 切换图片
const handleLeft = () => {
  emit('onLeft')
}
const handleRight = () => {
  emit('onRight')
}
</script>

<template>
  <div id="headertop" class="relative h-screen" :class="bgMask">
    <figure
      class="headertop-bg relative h-full w-full bg-sky-400 bg-cover bg-center bg-no-repeat dark:bg-neutral-800 md:bg-fixed"
      :style="{ backgroundImage: bgSrc ? `url(${bgSrc})` : '' }"
    >
      <div
        :style="{ top: titleTop }"
        class="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center transition-[top] duration-700"
      >
        <h1
          class="tik-tok-shake mb-7 animate-[bounce_0.6s_ease_1s] cursor-pointer select-none font-[FrederickaTheGreat] text-7xl font-bold text-slate-50"
        >
          {{ title }}
        </h1>
        <div class="centerbg-info w-[350px] rounded-lg bg-[rgba(0,0,0,.5)] p-3.5 md:w-[500px]">
          <p class="mb-1 text-base font-bold text-gray-300">
            <Icon name="ooui:quotes-ltr" />
            {{ subTitle }}
            <Icon name="ooui:quotes-rtl" />
          </p>
          <div class="text-3xl">
            <Icon
              name="ic:round-keyboard-double-arrow-left"
              class="mr-4 cursor-pointer"
              color="#3b82f6"
              @click="handleLeft"
            />
            <nuxt-link target="_blank" :to="gitHub">
              <Icon name="grommet-icons:github" class="mx-1.5 cursor-pointer" />
            </nuxt-link>
            <nuxt-link target="_blank" :to="gitee">
              <Icon name="simple-icons:gitee" class="mx-1.5 cursor-pointer" color="#be3020" />
            </nuxt-link>
            <nuxt-link target="_blank" :to="bilibili">
              <Icon name="tabler:brand-bilibili" class="mx-1.5 cursor-pointer" color="#fff" />
            </nuxt-link>
            <!-- <nuxt-link target="_blank" :to="qq">
              <Icon name="mdi:qqchat" class="mx-1.5 cursor-pointer" color="#fff" />
            </nuxt-link> -->
            <!-- <nuxt-link target="_blank" :to="music">
              <Icon
                name="tabler:brand-netease-music"
                class="mx-1.5 cursor-pointer"
                color="#e15a3c"
              />
            </nuxt-link> -->
            <Icon
              name="ic:baseline-keyboard-double-arrow-right"
              class="ml-4 cursor-pointer"
              color="#3b82f6"
              @click="handleRight"
            />
          </div>
        </div>
      </div>
    </figure>
    <div class="absolute top-0 left-0 right-0 h-full">
      <video
        v-show="showVideo"
        ref="videoRef"
        preload="metadata"
        class="h-full w-full object-fill"
        @play="onPlay"
        @pause="onPause"
        @ended="onEnded"
      >
        <source :src="videoSrc" type="video/mp4" />
      </video>
      <div
        class="absolute bottom-4 right-6 z-10 animate-bounce cursor-pointer text-3xl text-[#baac9f] max-md:hidden"
      >
        <Icon v-if="showPlay" name="icomoon-free:play2" @click="handlePlay" />
        <Icon v-else name="zondicons:pause-outline" @click="handlePause" />
      </div>
    </div>
    <div class="animate-bounce-slow absolute bottom-5 left-1/2 z-10 cursor-pointer max-md:hidden">
      <Icon
        name="ic:sharp-keyboard-arrow-down"
        size="58"
        color="#fff"
        @click="handleDown('.page-content')"
      />
    </div>
    <BaseWaves />
  </div>
</template>
