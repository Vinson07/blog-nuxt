<script setup lang="ts">
import { NCard, NInput, NInputGroup, NButton, useMessage } from 'naive-ui'
import vueDanmaku from 'vue3-danmaku'
import type { BarrageList } from '@/types/barrage'

const danmus = ref<BarrageList[]>([])
const msg = useMessage()
const imageStore = useImageStore()
const userStore = useUserStore()
const barrageValue = ref('')
const danmakuRef = ref<any>(null)

const { barrage } = useApi()

const styleBgSrc = computed(() => `url(${imageStore.pageList.message})`)

// 随机颜色
const getRandomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`

definePageMeta({
  layout: 'no-bottom'
})

onMounted(async () => {
  const { data } = await barrage.getBarrage()
  if (data.value?.data) danmus.value = data.value.data
})

async function send() {
  if (barrageValue.value.trim() === '') {
    msg.warning('你还没写呢~')
    return
  }

  const params = {
    avatar: userStore.userInfo?.avatar ?? userStore.websiteConfig?.touristAvatar ?? '',
    messageContent: barrageValue.value,
    nickname: userStore.userInfo?.nickname ?? '游客',
    time: Math.floor(Math.random() * (10 - 7)) + 7
  }
  const { data } = await barrage.addBarrage(params)
  if (data.value?.flag) {
    if (danmakuRef.value) {
      danmakuRef.value.add({
        avatar: userStore.userInfo?.avatar ?? userStore.websiteConfig?.touristAvatar ?? '',
        messageContent: barrageValue.value,
        nickname: userStore.userInfo?.nickname ?? '游客',
        time: Math.floor(Math.random() * (10 - 7)) + 7
      })
    }
  }

  // 清空输入框
  barrageValue.value = ''
}
</script>

<template>
  <client-only>
    <div
      class="barrage-bg relative h-screen w-screen bg-cover bg-center bg-no-repeat pt-14"
      :style="{ backgroundImage: styleBgSrc }"
    >
      <div class="absolute top-1/2 left-1/2 z-10 w-80 -translate-x-1/2 -translate-y-1/2 md:w-96">
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
