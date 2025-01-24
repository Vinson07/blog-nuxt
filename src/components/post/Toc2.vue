<script setup lang="ts">
import { WatchStopHandle } from 'nuxt/dist/app/compat/capi'

interface MarkMenu {
  level: number
  text: string
  id: string
}

interface Props {
  headerClass?: string
  articleContentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  headerClass: '.header-nav',
  articleContentClass: '.post-main .markdown-body'
})

// 目录数据
const docMenu = ref<MarkMenu[]>([])
const active = ref(0)
const liRef = ref<HTMLLIElement[] | null>(null)

// 初始化目录数据
function initArt(): MarkMenu[] {
  const markMenu: MarkMenu[] = []
  const levels = ['h1', 'h2', 'h3']
  const articleEl = document.querySelector(props.articleContentClass)
  if (!articleEl) return markMenu

  for (const el of articleEl.children) {
    const tagName = el.tagName.toLowerCase()
    const i = levels.indexOf(tagName)
    if (i > -1 && el.textContent) {
      el.setAttribute('id', 'heading-' + markMenu.length)
      markMenu.push({
        level: i,
        text: el.textContent,
        id: 'heading-' + markMenu.length
      })
    }
  }

  return markMenu
}

// 点击跳转目录
function handleScroll(id: string) {
  // 由于存在头部的关系,会挡住标题,所以还需计算滚动头部的高度
  const element = document.querySelector(props.headerClass) as HTMLElement
  const targetDom = document.getElementById(`${id}`) as HTMLElement
  targetDom.scrollIntoView({
    // 滚动到指定节点
    block: 'start',
    behavior: 'auto'
  })
  setTimeout(() => {
    window.scrollBy(0, -element.offsetHeight)
  })
}

// 当前高亮的目录保持在可视范围
watch(active, (index) => {
  if (liRef.value) {
    const list = Array.from(liRef.value)
    list[index].scrollIntoView({
      block: 'nearest'
    })
  }
})

onMounted(() => {
  // 获取目录数据
  docMenu.value = initArt()
})

let stop: WatchStopHandle
onMounted(() => {
  // 监听滚动
  const { y } = useScroll(window)
  const element = document.querySelector(props.headerClass) as HTMLElement
  // 节流
  stop = watchThrottled(
    y,
    () => {
      // 获取所有锚点元素
      const titleNavNodeList = document.querySelectorAll(
        `${props.articleContentClass} h1,${props.articleContentClass} h2,${props.articleContentClass} h3`
      )
      const titleNavList = Array.from(titleNavNodeList) as HTMLElement[]
      // 计算所有锚点元素的 offsetTop + 头部的高度
      const offsetTopList: number[] = []
      titleNavList.forEach((el) => {
        offsetTopList.push(el.offsetTop - element.offsetHeight)
      })

      // 定义当前所在的目录下标
      let navIndex = 0
      // 比较当前文章滚动的距离scrollTop与各锚点标题的offsetTop ,当scrollTop超过当前元素的scrollTop,则定位到当前标题
      for (let n = 0; n < offsetTopList.length; n++) {
        if (y.value >= offsetTopList[n]) {
          navIndex = n
        }
      }

      // 当前高亮的目录索引,默认为0
      active.value = navIndex
    },
    { throttle: 500 }
  )
})

onUnmounted(() => {
  // 停止监听
  stop()
})
</script>

<template>
  <nav v-if="docMenu.length > 0" class="toc-nav sticky top-[76px] w-[inherit]">
    <BaseBox>
      <div class="border-b pb-4 text-base font-medium dark:border-amber-300">目录</div>
      <ul class="catalog-content -mr-5 overflow-y-auto pr-3 pt-4">
        <li
          v-for="(menu, index) in docMenu"
          ref="liRef"
          :key="menu.id"
          :class="[`level_${menu.level}`, { active: active === index }]"
          class="single-line-ellipsis dark:hover:bg-v-hc-dark cursor-pointer rounded py-2 px-2 text-sm hover:bg-gray-200"
          @click="handleScroll(menu.id)"
        >
          {{ menu.text }}
        </li>
      </ul>
    </BaseBox>
  </nav>
</template>

<style scoped>
.toc-nav .catalog-content {
  max-height: calc(100vh - 200px);
}
.toc-nav .catalog-content::-webkit-scrollbar {
  width: 4px;
  height: 80px;
}
.toc-nav .catalog-content::-webkit-scrollbar-track {
  @apply bg-v-box-bg dark:bg-v-box-bg-dark;
}
.toc-nav .catalog-content .level_1 {
  padding-left: 20px;
}
.toc-nav .catalog-content .level_2 {
  padding-left: 30px;
}
.toc-nav .catalog-content .level_3 {
  padding-left: 40px;
}
.toc-nav .catalog-content > li.active {
  @apply text-v-hc dark:text-v-hc-dark;
}
</style>
