<script setup lang="ts">
const showVideo = ref(false)
const showPlay = ref(true)
const titleTop = ref('50%')
const videoRef = ref<HTMLVideoElement>()
const props = defineProps({
  videoSrc: {
    type: String,
    default: 'https://cdn.sakura520.co/static/video/007.mp4'
  },
  bgSrc: {
    type: String,
    default: 'https://static.sakura520.co/config/8400a6590acfc36ee9c75592566407cf.jpg'
  }
})

const styleBgSrc = computed(() => `url(${props.bgSrc})`)

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
</script>

<template>
  <div id="headertop" class="filter-dot relative h-screen">
    <figure id="centerbg">
      <div
        :style="{ top: titleTop }"
        class="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center transition-[top] duration-700"
      >
        <h1
          class="tik-tok-shake mb-7 cursor-pointer select-none text-7xl font-bold uppercase text-slate-50"
        >
          Hi, Mashiro!
        </h1>
        <div class="rounded-lg bg-[rgba(0,0,0,.5)] p-3.5">
          <p class="mb-1 text-base font-bold text-gray-300">
            <Icon name="ooui:quotes-ltr" />
            You got to put the past behind you before you can move on.
            <Icon name="ooui:quotes-rtl" />
          </p>
          <div class="text-3xl">
            <Icon
              name="ic:round-keyboard-double-arrow-left"
              class="mr-4 cursor-pointer"
              color="#3b82f6"
            />
            <Icon name="grommet-icons:github" class="mx-1.5 cursor-pointer" />
            <Icon name="ri:zhihu-line" class="mx-1.5 cursor-pointer" color="#fff" />
            <Icon name="tabler:brand-netease-music" class="mx-1.5 cursor-pointer" color="#e15a3c" />
            <Icon
              name="ic:baseline-keyboard-double-arrow-right"
              class="ml-4 cursor-pointer"
              color="#3b82f6"
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
        <source :src="props.videoSrc" type="video/mp4" />
      </video>
      <div
        class="absolute bottom-4 right-6 z-10 animate-bounce cursor-pointer text-3xl text-[#baac9f]"
      >
        <Icon v-if="showPlay" name="icomoon-free:play2" @click="handlePlay" />
        <Icon v-else name="zondicons:pause-outline" @click="handlePause" />
      </div>
    </div>
    <div class="animate-bounce-slow absolute bottom-5 left-2/4 z-10 cursor-pointer">
      <Icon
        name="ic:sharp-keyboard-arrow-down"
        size="58"
        color="#fff"
        @click="handleDown('.page-content')"
      />
    </div>
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
}
</style>

<style>
#centerbg {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: v-bind(styleBgSrc);
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
}
</style>
