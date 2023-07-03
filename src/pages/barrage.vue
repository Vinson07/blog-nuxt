<script setup lang="ts">
import { NCard, NInput, NInputGroup, NButton, useMessage } from 'naive-ui'
import vueDanmaku from 'vue3-danmaku'
import { getBarrage, addBarrage } from '@/apis/barrage'
import type { BarrageList } from '@/types/barrage'

const danmus = ref<BarrageList[]>([])
const msg = useMessage()
const imageStore = useImageStore()
const userStore = useUserStore()
const barrageValue = ref('')
const danmakuRef = ref<any>(null)

const styleBgSrc = computed(() => `url(${imageStore.pageList.message})`)

// 随机颜色
const getRandomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`

definePageMeta({
  layout: 'no-bottom'
})

onMounted(async () => {
  try {
    const { data } = await getBarrage()
    if (data) danmus.value = data
  } catch (error) {
    console.error(error)
  }
})

async function send() {
  if (barrageValue.value.trim() === '') {
    msg.warning('你还没写呢~')
    return
  }

  try {
    const params = {
      avatar: userStore.userInfo?.avatar ?? userStore.websiteConfig.touristAvatar,
      messageContent: barrageValue.value,
      nickname: userStore.userInfo?.nickname ?? '游客',
      time: Math.floor(Math.random() * (10 - 7)) + 7
    }
    const { flag } = await addBarrage(params)
    if (flag) {
      if (danmakuRef.value) {
        danmakuRef.value.add({
          avatar: userStore.userInfo?.avatar ?? userStore.websiteConfig.touristAvatar,
          messageContent: barrageValue.value,
          nickname: userStore.userInfo?.nickname ?? '游客',
          time: Math.floor(Math.random() * (10 - 7)) + 7
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
  // 清空输入框
  barrageValue.value = ''
}
</script>

<template>
  <client-only>
    <div class="barrage-bg relative h-screen w-screen pt-14">
      <div class="absolute top-1/2 left-1/2 z-10 w-80 -translate-x-1/2 -translate-y-1/2">
        <n-card title="弹幕" hoverable class="bg-transparent">
          <n-input-group>
            <n-input
              v-model:value="barrageValue"
              placeholder="留下点什么啦~"
              show-count
              :maxlength="30"
              clearable
              @keyup.enter="send"
            />
            <n-button type="primary" ghost @click="send"> 发射 </n-button>
          </n-input-group>
        </n-card>
      </div>
      <vue-danmaku
        ref="danmakuRef"
        v-model:danmus="danmus"
        class="h-full"
        :speeds="100"
        :debounce="500"
        use-slot
        random-channel
        is-suspend
        loop
      >
        <template #dm="{ danmu }">
          <div
            class="flex items-center rounded-full px-2 py-1"
            :style="{ backgroundColor: getRandomColor() }"
          >
            <img
              class="mr-2 h-7 w-7 cursor-pointer select-none rounded-full object-cover"
              :src="danmu.avatar"
              alt=""
            />
            <span class="text-base text-white">
              {{ danmu.nickname }}：{{ danmu.messageContent }}
            </span>
          </div>
        </template>
      </vue-danmaku>
    </div>
  </client-only>
</template>

<style>
.barrage-bg {
  background: v-bind(styleBgSrc) no-repeat center;
  background-size: cover;
}
</style>
