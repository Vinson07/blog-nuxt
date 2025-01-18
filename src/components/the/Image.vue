<script setup lang="ts">
import loadingLightImg from '@/assets/img/loading/loading.gif'
import loadingDarkImg from '@/assets/img/loading/loading-dark.gif'
import errorImgUrl from '@/assets/img/404/404.gif'

interface Props {
  src: string
}
const props = defineProps<Props>()
const color = useColorMode() // 主题模式

// const imageStore = useImageStore()
const imgRef = ref<HTMLElement | null>(null)
// 默认空图片
const imgSrc = ref('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')

// 根据主题切换loading图
const themeChange = () => {
  if (color.value === 'dark') {
    imgSrc.value = loadingDarkImg
  } else {
    imgSrc.value = loadingLightImg
  }
}

// 加载图片
const loadingImage = () => {
  const img = new Image()
  img.src = props.src
  img.onload = () => {
    imgSrc.value = props.src
  }
  img.onerror = () => {
    imgSrc.value = errorImgUrl
  }
}

onMounted(() => {
  // 图片懒加载
  const observer = new IntersectionObserver((arr) => {
    // 进入可视区
    if (arr[0].isIntersecting) {
      themeChange()
      loadingImage()
      imgRef.value && observer.unobserve(imgRef.value)
    }
  })

  imgRef.value && observer.observe(imgRef.value)
})
</script>

<template>
  <div ref="imgRef" class="group/img h-full w-full">
    <!-- group-hover/img:rotate-6 -->
    <img
      class="h-full w-full rounded-[inherit] object-cover transition-transform duration-500 group-hover/img:scale-110"
      :src="imgSrc"
      alt=""
    />
  </div>
</template>
