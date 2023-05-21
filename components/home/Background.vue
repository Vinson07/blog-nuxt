<script setup lang="ts">
interface Props {
  videoSrc?: string
  bgSrc?: string
  title?: string
  subTitle?: string
  bgMask?: string
  gitHub?: string
  zhiHu?: string
  music?: string
}

const props = withDefaults(defineProps<Props>(), {
  videoSrc: '',
  bgSrc: '',
  title: '',
  subTitle: '',
  bgMask: 'filter-grid', // filter-grid filter-dot filter-dim filter-undertint pattern-center
  gitHub: '',
  zhiHu: '',
  music: ''
})

const showVideo = ref(false)
const showPlay = ref(true)
const titleTop = ref('-50%')
const videoRef = ref<HTMLVideoElement | null>(null)
const emit = defineEmits(['onLeft', 'onRight'])

const styleBgSrc = computed(() => `url(${props.bgSrc})`)

onMounted(() => {
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
    <figure id="centerbg">
      <div
        :style="{ top: titleTop }"
        class="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center transition-[top] duration-700"
      >
        <h1
          class="tik-tok-shake mb-7 cursor-pointer select-none text-7xl font-bold uppercase text-slate-50"
        >
          {{ title }}
        </h1>
        <div class="centerbg-info max-w-xl rounded-lg bg-[rgba(0,0,0,.5)] p-3.5">
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
            <nuxt-link target="_blank" :to="zhiHu">
              <Icon name="ri:zhihu-line" class="mx-1.5 cursor-pointer" color="#fff" />
            </nuxt-link>
            <nuxt-link target="_blank" :to="music">
              <Icon
                name="tabler:brand-netease-music"
                class="mx-1.5 cursor-pointer"
                color="#e15a3c"
              />
            </nuxt-link>
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
    <Waves />
  </div>
</template>

<style lang="less">
#headertop {
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-attachment: fixed;
    z-index: 9;
  }
  &.pattern-center {
    animation: header 1s;
  }
  &.filter-undertint {
    &:before {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
  &.filter-dim {
    &:before {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  &.filter-grid {
    &:before {
      background-image: url(~/assets/img/grid.webp);
    }
  }
  &.filter-dot {
    &:before {
      background-image: url(~/assets/img/dot.webp);
    }
  }
  .centerbg-info {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -30px;
      left: 20%;
      margin-left: -15px;
      border-width: 15px;
      border-style: solid;
      border-color: transparent transparent rgba(0, 0, 0, 0.5) transparent;
    }
  }
}
</style>

<style>
#centerbg {
  @apply relative h-full w-full bg-sky-400 bg-cover bg-center bg-no-repeat md:bg-fixed;
  background-image: v-bind(styleBgSrc);
}
</style>
