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
  title: '图库-Vinson'
})

const imageStore = useImageStore()
const imgList = ref<List[]>([
  {
    src: 'http://view.lixingyong.com/images/2023/05/28/7ed0fb5865b7a71c2c8f8de78055be3504ff7e6e8032e86b.png'
  },
  {
    src: 'http://view.lixingyong.com/images/2023/05/28/1588433642207d4bea005c5c97e0c.webp'
  },
  {
    src: 'http://view.lixingyong.com/images/2023/05/28/id-91881094_iren7d8d297289c6e346.jpeg'
  },
  {
    src: 'http://view.lixingyong.com/images/2023/05/28/id-91882132_Rella86037fa1c53d93d1.jpeg'
  },
  {
    src: 'http://view.lixingyong.com/images/2023/05/28/15709553229786521d54bfc7dfd97.jpeg'
  },
  {
    src: 'http://view.lixingyong.com/images/2023/05/28/0780c7aa5b8ce5ffd1fcd967436b8276fd49eb18717804a4.png'
  },
  {
    src: 'http://view.lixingyong.com/images/2023/05/28/14bfe66dc9b7a833c012bd2e6bae59c4fef7b93840aac0da.jpeg'
  },
  {
    src: 'http://view.lixingyong.com/images/2020/07/20/f24e30fb0b1c77abf0f789de9374314a.png'
  }
])
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
  <ClientOnly>
    <ThePageBanner :bg-cover="imageStore.pageList.album" title="图库" />
    <Waterfall :list="imgList" class="mt-3 md:mt-10" background-color="transparent" :width="350">
      <template #item="{ url }">
        <!-- <LazyImg :url="url" class="rounded" /> -->
        <n-image :src="url" :fallback-src="errorImg" class="rounded" />
      </template>
    </Waterfall>
    <BaseInfiniteScroll :distance="100" class="h-10 text-center" @infinite="onInfinite">
      <Icon v-show="loading" name="eos-icons:bubble-loading" class="text-3xl" />
    </BaseInfiniteScroll>
  </ClientOnly>
</template>
