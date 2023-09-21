<script setup lang="ts">
import { NPopover } from 'naive-ui'
import type { PlayList } from '@/types/music'

const musicList = ref<PlayList[]>([])
const musicRef = ref<HTMLAudioElement | null>(null)
const status = ref('')
// 播放第几首
const playCount = ref(0)
// 音乐总数
const musicTotal = ref(0)
const lyricText = ref('')
const isShowLyricText = ref(false)
const topText = ref('0')

const blogStore = useBlogStore()
const { lyricMap, format } = useFormatLyric()

const { music } = useApi()
const { data } = await music.getPlayList({
  type: 'playlist',
  id: blogStore.siteConfig?.musicId ?? '8167000129'
})
if (data.value) {
  musicList.value = data.value
  musicTotal.value = data.value.length
}

// 当前播放信息
const playItem = computed(() => {
  const item = musicList.value[playCount.value]
  // 获取歌词
  $fetch(item.lrc).then((res) => {
    format(res as string)
  })
  return item
})

// 播放
const onPlay = () => {
  status.value = 'play'
  topText.value = '-100%'
  isShowLyricText.value = true
}
// 暂停
const onPause = () => {
  status.value = 'pause'
  topText.value = '0'
  isShowLyricText.value = false
}
// 结束
const onEnded = () => {
  status.value = 'ended'
  handleNext()
}
// 播放进度
const onUpdate = useThrottleFn(() => {
  if (musicRef.value) {
    // const duration = musicRef.value.duration // 获取总播放时间
    const currentTime = musicRef.value.currentTime // 获取当前播放时间
    const floorCurrentTime = Math.floor(currentTime)
    if (lyricMap.has(floorCurrentTime)) {
      // console.log(floorCurrentTime, lyricMap.get(floorCurrentTime))
      lyricText.value = lyricMap.get(floorCurrentTime) || ''
    }
  }
}, 500)

// 播放/暂停
const handlePlay = () => {
  if (musicRef.value) {
    if (status.value === 'play') {
      musicRef.value.pause()
    } else {
      musicRef.value.play()
    }
  }
}

// 上一首
const handlePrev = async () => {
  if (playCount.value === 0) {
    playCount.value = musicTotal.value - 1
  } else {
    playCount.value--
  }

  await nextTick()
  // 播放
  musicRef.value && musicRef.value.play()
}

// 下一首
const handleNext = async () => {
  if (playCount.value === musicTotal.value - 1) {
    playCount.value = 0
  } else {
    playCount.value++
  }

  await nextTick()
  // 播放
  musicRef.value && musicRef.value.play()
}
</script>

<template>
  <div class="fixed bottom-5 left-5 z-10 w-24">
    <Transition name="slide">
      <div
        v-if="isShowLyricText"
        class="py-1 text-center text-sm text-orange-500 transition-all duration-500 dark:text-indigo-500"
      >
        <n-popover trigger="hover">
          <template #trigger>
            <p class="select-none truncate">{{ playItem.name }}</p>
          </template>
          <span>{{ playItem.name }}</span>
        </n-popover>
        <p class="truncate text-xs text-zinc-400">{{ playItem.artist }}</p>
      </div>
    </Transition>
    <div
      class="bg-v-background shadow-dark-shadow dark:shadow-dark-shadow-hover dark:bg-v-background-dark flex justify-center rounded-full border-2 border-white text-orange-500 dark:text-indigo-500"
    >
      <div class="relative inline-block py-1 px-2">
        <Icon
          :name="status === 'play' ? 'iconamoon:player-pause-fill' : 'iconamoon:player-play-fill'"
          class="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          @click="handlePlay"
        />
        <Icon name="tabler:player-track-prev-filled" class="cursor-pointer" @click="handlePrev" />
        <img
          class="mx-2 h-7 w-7 select-none rounded-full border-2 border-white"
          :class="{ 'animate-spin-slow': status === 'play' }"
          :src="playItem.pic"
          alt=""
        />
        <Icon name="tabler:player-track-next-filled" class="cursor-pointer" @click="handleNext" />
      </div>
    </div>
    <div
      v-if="isShowLyricText"
      class="fixed left-36 bottom-1 z-10 text-sm text-orange-500 dark:text-indigo-500"
    >
      {{ lyricText }}
    </div>
    <audio
      ref="musicRef"
      :src="playItem.url"
      hidden
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
      @timeupdate="onUpdate"
    ></audio>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 1s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(50%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
