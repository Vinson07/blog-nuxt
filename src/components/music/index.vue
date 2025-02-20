<script setup lang="ts">
import { NPopover } from 'naive-ui'
import type { PlayList } from '@/types/music'

const musicStore = useMusicStore()

const musicList = ref<PlayList[]>([])
const musicRef = ref<HTMLAudioElement | null>(null)
const status = ref('')
const musicTotal = ref(0) // 音乐总数
const lyricText = ref('')
const isShowLyricText = ref(false)
const topText = ref(false)

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

  // 如果播放首大于或等于音乐总数 改回第一首
  if (musicStore.playCount >= musicTotal.value) {
    musicStore.setPlayCount(0)
  }
}

// 当前播放信息
const playItem = computed(() => {
  const item = musicList.value[musicStore.playCount]
  // 获取歌词
  $fetch(item.lrc).then((res) => {
    format(res as string)
  })
  return item
})

// 播放
const onPlay = () => {
  status.value = 'play'
  topText.value = true
}
// 暂停
const onPause = () => {
  status.value = 'pause'
  topText.value = false
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
      isShowLyricText.value = false
    } else {
      musicRef.value.play()
      isShowLyricText.value = true
    }
  }
}

// 上一首
const handlePrev = useThrottleFn(async () => {
  if (musicStore.playCount === 0) {
    musicStore.setPlayCount(musicTotal.value - 1)
  } else {
    musicStore.setPlayCount(musicStore.playCount - 1)
  }

  await nextTick()
  // 播放
  musicRef.value && musicRef.value.play()
}, 500)

// 下一首
const handleNext = useThrottleFn(async () => {
  if (musicStore.playCount === musicTotal.value - 1) {
    musicStore.setPlayCount(0)
  } else {
    musicStore.setPlayCount(musicStore.playCount + 1)
  }

  await nextTick()
  // 播放
  musicRef.value && musicRef.value.play()
}, 500)
</script>

<template>
  <div class="fixed bottom-5 left-5 z-50 w-20">
    <Transition name="slide">
      <div
        v-if="topText"
        class="text-v-hc dark:text-v-hc-dark py-1 text-center text-sm transition-all duration-500"
      >
        <n-popover trigger="hover">
          <template #trigger>
            <p
              class="cursor-pointer select-none truncate"
              @click="isShowLyricText = !isShowLyricText"
            >
              {{ playItem.name }}
            </p>
          </template>
          <span>{{ playItem.name }}</span>
        </n-popover>
        <p class="truncate text-xs text-zinc-400">{{ playItem.artist }}</p>
      </div>
    </Transition>
    <div
      class="bg-v-bg shadow-v-box-sh dark:shadow-v-box-sh-dark dark:bg-v-bg-dark text-v-hc dark:text-v-hc-dark relative flex justify-center rounded-full border-2 border-white"
    >
      <img
        class="my-[2px] h-7 w-7 select-none rounded-full border-2 border-white"
        :class="{ 'animate-spin-slow': status === 'play' }"
        :src="playItem.pic"
        alt=""
      />
      <div class="absolute top-0 left-0 flex h-full w-full items-center justify-center">
        <Icon name="tabler:player-track-prev-filled" class="cursor-pointer" @click="handlePrev" />
        <Icon
          :name="status === 'play' ? 'iconamoon:player-pause-fill' : 'iconamoon:player-play-fill'"
          class="mx-2 cursor-pointer text-lg"
          @click="handlePlay"
        />
        <Icon name="tabler:player-track-next-filled" class="cursor-pointer" @click="handleNext" />
      </div>
    </div>
    <div
      v-if="isShowLyricText"
      class="text-v-hc dark:text-v-hc-dark fixed left-1/2 bottom-1 z-10 -translate-x-1/2 text-sm"
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
