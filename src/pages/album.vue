<script setup lang="ts">
import { Waterfall } from 'vue-waterfall-plugin-next'
import { NImage } from 'naive-ui'
import 'vue-waterfall-plugin-next/dist/style.css'
import errorImg from '@/assets/img/404.gif'

interface List {
  src: string
}

definePageMeta({
  layout: 'no-bottom'
})

const imageStore = useImageStore()
const imgList = ref<List[]>([])
const baseImgUrl = 'https://cdn.sakura520.co/'
const marker = ref('')
const imageParams = reactive({
  marker: '',
  prefix: 'static/images/'
})

const { qiniu, poetry } = useApi()

const { data, pending, refresh } = await qiniu.getQiniuImg(imageParams)

watchEffect(() => {
  if (data.value?.code === 200) {
    data.value.data.list.forEach((item) => {
      imgList.value.push({
        src: `${baseImgUrl}${item.key}`
      })
    })
    marker.value = data.value.data?.marker ?? ''
  }
})

function onInfinite() {
  if (marker.value && !pending.value) {
    imageParams.marker = marker.value
    refresh({ dedupe: true })
  }
}

// 古诗
const { data: gushi } = poetry.getPoetry()
const poetryText = computed(() => {
  if (gushi.value) {
    return `${gushi.value.content} —— ${gushi.value.author}`
  } else {
    return ''
  }
})
</script>

<template>
  <ClientOnly>
    <TheTopBgImg :bg-cover="imageStore.pageList.album" title="图库" :poetry-text="poetryText" />
    <Waterfall :list="imgList" class="mt-3 md:mt-10" background-color="transparent" :width="350">
      <template #item="{ url }">
        <!-- <LazyImg :url="url" class="rounded" /> -->
        <n-image :src="url" :fallback-src="errorImg" class="rounded" />
      </template>
    </Waterfall>
    <BaseInfiniteScroll :distance="100" class="h-10 text-center" @infinite="onInfinite">
      <Icon v-show="pending" name="eos-icons:bubble-loading" class="text-3xl" />
    </BaseInfiniteScroll>
  </ClientOnly>
</template>
