<script setup lang="ts">
import { NCard, NInput, NInputGroup, NButton, useMessage } from 'naive-ui'
import vueDanmaku from 'vue3-danmaku'
import { getBarrage, addBarrage } from '@/apis/barrage'
import type { BarrageList } from '@/types/barrage'

const bgImg = ref(
  'https://cdn.sakura520.co/images/0c03b2b018f649be81c665d46528d185e6609d7a2bbb7a-AIRyCY.jpg'
)
const danmus = ref<BarrageList[]>([])
const msg = useMessage()
const imageStore = useImageStore()
const userStore = useUserStore()
const barrageValue = ref('')
const danmakuRef = ref<any>(null)

// const styleBgSrc = computed(() => `url(${imageStore.randomImage[1]})`)
const styleBgSrc = computed(() => `url(${bgImg.value})`)
const styleColor = computed(
  () => () => imageStore.colors[Math.floor(Math.random() * imageStore.colors.length)]
)

definePageMeta({
  layout: 'no-bottom'
})

onMounted(async () => {
  try {
    const { code, data, message } = await getBarrage()
    if (code === 20000) {
      danmus.value = data
    } else {
      msg.warning(message)
    }
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
      avatar: userStore.websiteConfig.touristAvatar,
      messageContent: barrageValue.value,
      nickname: '游客',
      time: Math.floor(Math.random() * (10 - 7)) + 7
    }
    const { code, message } = await addBarrage(params)
    if (code === 20000) {
      if (danmakuRef.value) {
        danmakuRef.value.add({
          avatar: userStore.websiteConfig.touristAvatar,
          messageContent: barrageValue.value,
          nickname: '游客',
          time: Math.floor(Math.random() * (10 - 7)) + 7
        })
      }
    } else {
      msg.warning(message)
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
        use-slot
        random-channel
        is-suspend
        loop
      >
        <template #dm="{ danmu }">
          <div
            class="flex items-center rounded-full px-2 py-1"
            :style="{ backgroundColor: styleColor() }"
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

<style lang="less">
.barrage-bg {
  background: v-bind(styleBgSrc) no-repeat center;
  background-size: cover;
}
</style>
