<template>
  <nav
    ref="tocRef"
    class="max-h-[500px] w-[inherit] overflow-y-auto rounded py-2 shadow-md dark:bg-neutral-800"
  >
    <!-- <div class="catalog-header">
      <svg-icon icon-class="category"></svg-icon>
      目录
    </div> -->
    <ul class="catalog-content">
      <li
        v-for="(anchor, index) of titleList"
        :key="anchor.title"
        class="catalog-item"
        :class="currentIndex === index ? 'active' : ''"
        :style="{ paddingLeft: `${5 + anchor.indent * 15}px` }"
        @click="handleAnchorClick(anchor, index)"
      >
        <a> {{ anchor.title }} </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useScroll, watchThrottled } from '@vueuse/core'

const titleList = ref<any>([])
const tocRef = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const props = defineProps({
  domRef: {
    type: Object,
    default: null
  }
})

const getTitles = () => {
  const anchors = props.domRef.querySelectorAll('h1,h2,h3')
  const titles = Array.from(anchors).filter((t: any) => !!t.innerText.trim())
  console.log(titles, '#')
  if (!titles.length) titleList.value = []
  const hTags = Array.from(new Set(titles.map((t: any) => t.tagName))).sort()
  titleList.value = titles.map((el: any, index) => {
    el.setAttribute('data-v-md-line', index)
    // console.log(hTags, el.tagName, '##')
    return {
      title: el.innerText,
      lineIndex: el.getAttribute('data-v-md-line'),
      indent: hTags.indexOf(el.tagName)
    }
  })
}

// 点击锚点目录
function handleAnchorClick(anchor: any, idx: number) {
  const heading = props.domRef.querySelector(`[data-v-md-line="${anchor.lineIndex}"]`)
  // const heading = preview.querySelector(`#${anchor.title}`)
  console.log(heading.offsetTop, '#')
  if (heading) {
    window.scrollTo({
      behavior: 'smooth',
      top: heading.offsetTop + 730
    })
    setTimeout(() => (currentIndex.value = idx), 600)
  }
}

// * 实现目录高亮当前位置的标题
// 思路: 循环的方式将标题距离顶部距离与滚动条当前位置对比, 来确定高亮的标题
const { y } = useScroll(window)
watchThrottled(
  y,
  () => {
    titleList.value.forEach((e: any, idx: number) => {
      const heading = props.domRef.querySelector(`[data-v-md-line="${e.lineIndex}"]`)
      if (y.value >= heading.offsetTop + 730)
        // 比 40 稍微多一点
        currentIndex.value = idx
    })
  },
  { throttle: 200 }
)

// 滚动事件
const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (tocRef.value) {
    const height = 400 + 265
    // if (recommendRef.value) {
    //   height += recommendRef.value.offsetHeight
    // }
    if (scrollTop > height) {
      tocRef.value.style.position = 'fixed'
      tocRef.value.style.top = '80px'
    } else {
      tocRef.value.style.position = ''
      tocRef.value.style.top = ''
    }
  }
}
onMounted(() => {
  nextTick(() => {
    getTitles()
    addEventListener('scroll', handleScroll, false)
  })
})

onUnmounted(() => {
  removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.catalog-content {
  /* max-height: calc(100vh - 100px); */
  overflow: auto;
  /* margin-right: -16px;
  padding-right: 16px; */
}

.catalog-item {
  margin: 5px 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
  padding: 2px 6px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.catalog-item:hover {
  color: #e9546b;
}

.active {
  background-color: #e9546b;
  color: #fff;
}
.active:hover {
  background-color: #e9546b;
  color: #fff;
}
</style>
