<script setup lang="ts">
import { NCard, NInput, NInputGroup, NButton, useMessage } from 'naive-ui'
import vueDanmaku from 'vue3-danmaku'
import type { Message } from '@/types/message'

definePageMeta({
  layout: 'no-bottom'
})
useHead({
  title: '留言'
})

const danmus = ref<Message[]>([])
const msg = useMessage()
const imageStore = useImageStore()
const userStore = useUserStore()
const blogStore = useBlogStore()
const barrageValue = ref('')
const danmakuRef = ref<any>(null)

const { message } = useApi()

// const styleBgSrc = computed(() => `url(${imageStore.pageList.message})`)

// 随机颜色
// const getRandomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
const getRandomColor = () => imageStore.colors[Math.floor(Math.random() * imageStore.colors.length)]

const { data } = await message.getMessageList()
if (data.value?.flag) {
  danmus.value = data.value.data
}

async function send() {
  if (barrageValue.value.trim() === '') {
    msg.warning('你还没写呢~')
    return
  }

  const params = {
    avatar: userStore.userInfo?.avatar ?? blogStore.siteConfig?.touristAvatar ?? '',
    messageContent: barrageValue.value,
    nickname: userStore.userInfo?.nickname ?? '游客'
  }
  const { data } = await message.addMessage(params)
  if (data.value?.flag) {
    if (danmakuRef.value) {
      danmakuRef.value.add({
        avatar: userStore.userInfo?.avatar ?? blogStore.siteConfig?.touristAvatar ?? '',
        messageContent: barrageValue.value,
        nickname: userStore.userInfo?.nickname ?? '游客'
      })
    }
  }

  // 清空输入框
  barrageValue.value = ''
}
</script>

<template>
  <div class="barrage-bg relative h-screen w-screen bg-cover bg-center bg-no-repeat pt-14">
    <div class="absolute top-0 left-0 -z-20 h-full w-full">
      <img class="h-full w-full object-cover" :src="imageStore.pageList.message" alt="" />
    </div>
    <div class="absolute top-1/2 left-1/2 z-10 w-80 -translate-x-1/2 -translate-y-1/2 md:w-96">
      <n-card title="弹幕" hoverable :bordered="false" class="bg-[rgba(0,0,0,0.3)]">
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
    <client-only>
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
    </client-only>
  </div>
</template>
