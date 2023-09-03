<script setup lang="ts">
import { Waterfall } from 'vue-waterfall-plugin-next'
import { NImage } from 'naive-ui'
import 'vue-waterfall-plugin-next/dist/style.css'
import errorImg from '@/assets/img/404/404.gif'

interface List {
  src: string
}

definePageMeta({
  layout: 'no-bottom'
})
useHead({
  title: '图库'
})

const imageStore = useImageStore()
const imgList = ref<List[]>([])
const baseImgUrl = 'https://cdn.sakura520.co/'
const loading = ref(false)
const imageParams = {
  marker: '',
  prefix: 'static/images/'
}

const { qiniu } = useApi()

async function getImageList() {
  loading.value = true
  const { code, data } = await qiniu.getQiniuImg(imageParams)
  loading.value = false
  if (code === 200) {
    imageParams.marker = data.marker
    data.list.forEach((item) => {
      imgList.value.push({
        src: baseImgUrl + item.key
      })
    })
  }
}

onMounted(() => {
  getImageList()
})

function onInfinite() {
  if (imageParams.marker && !loading.value) {
    getImageList()
  }
}
</script>

<template>
  <div>
    <ThePageBanner :bg-cover="imageStore.pageList.album" title="图库" />
    <ClientOnly>
      <Waterfall :list="imgList" class="mt-3 md:mt-10" background-color="transparent" :width="350">
        <template #item="{ url }">
          <!-- <LazyImg :url="url" class="rounded" /> -->
          <n-image :src="url" :fallback-src="errorImg" class="rounded" />
        </template>
      </Waterfall>
    </ClientOnly>
    <BaseInfiniteScroll :distance="100" class="h-10 text-center" @infinite="onInfinite">
      <Icon v-show="loading" name="eos-icons:bubble-loading" class="text-3xl" />
    </BaseInfiniteScroll>
  </div>
</template>
