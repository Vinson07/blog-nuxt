<script setup lang="ts">
interface Title {
  children: Title[]
  id: string
  isVisible?: boolean
  level: number
  name?: string
  parent: Title | null
  rawName: string
  scrollTop: number
}
interface Props {
  container?: string
}
const props = withDefaults(defineProps<Props>(), {
  container: '.post-main .markdown-body'
})

const titles = ref<Title[]>([])
const currentTitle = ref<Partial<Title>>({})
const progress = ref(0)

// 获取目录的标题
function getTitles(): Title[] {
  const titles: Title[] = []
  const levels = ['h1', 'h2', 'h3']

  const articleElement = document.querySelector(props.container)
  if (!articleElement) {
    return titles
  }

  const elements: HTMLElement[] = Array.from(articleElement.querySelectorAll('*'))

  // 调整标签等级
  const tagNames = new Set(elements.map((el) => el.tagName.toLowerCase()))
  for (let i = levels.length - 1; i >= 0; i--) {
    if (!tagNames.has(levels[i])) {
      levels.splice(i, 1)
    }
  }

  const serialNumbers = levels.map(() => 0)
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    const tagName = element.tagName.toLowerCase()
    const level = levels.indexOf(tagName)
    if (level === -1) continue

    const id = tagName + '-' + element.innerText + '-' + i
    const node: Title = {
      id,
      level,
      parent: null,
      children: [],
      rawName: element.innerText,
      scrollTop: element.offsetTop
    }

    if (titles.length > 0) {
      const lastNode = titles.at(-1)

      if (lastNode) {
        // 遇到子标题
        if (lastNode.level < node.level) {
          node.parent = lastNode
          lastNode.children.push(node)
        }
        // 遇到上一级标题
        else if (lastNode.level > node.level) {
          serialNumbers.fill(0, level + 1)
          let parent = lastNode.parent
          while (parent) {
            if (parent.level < node.level) {
              parent.children.push(node)
              node.parent = parent
              break
            }
            parent = parent.parent
          }
        }
        // 遇到平级
        else if (lastNode.parent) {
          node.parent = lastNode.parent
          lastNode.parent.children.push(node)
        }
      }
    }

    serialNumbers[level] += 1
    const serialNumber = serialNumbers.slice(0, level + 1).join('.')

    node.isVisible = node.parent == null
    node.name = serialNumber + '. ' + element.innerText
    titles.push(node)
  }

  return titles
}

// 监听滚动事件并更新样式
function onScroll() {
  const _progress = (window.scrollY / document.documentElement.scrollHeight) * 100
  progress.value = parseInt(_progress.toString())

  const visibleTitles = []

  for (let i = titles.value.length - 1; i >= 0; i--) {
    const title = titles.value[i]
    if (title.scrollTop <= window.scrollY) {
      if (currentTitle.value.id === title.id) return

      Object.assign(currentTitle.value, title)

      // 目录高亮item滚动同步
      const currentElement = document.getElementById(title.id)
      if (currentElement) {
        currentElement.scrollIntoView({
          block: 'nearest'
        })
      }

      // 展开节点
      setChildrenVisible(title, true)
      visibleTitles.push(title)

      // 展开父节点
      let parent = title.parent
      while (parent) {
        setChildrenVisible(parent, true)
        visibleTitles.push(parent)
        parent = parent.parent
      }

      // 折叠其余节点
      for (const t of titles.value) {
        if (!visibleTitles.includes(t)) {
          setChildrenVisible(t, false)
        }
      }

      return
    }
  }
}

// 设置子节点的可见性
function setChildrenVisible(title: Title, isVisible: boolean) {
  for (const child of title.children) {
    child.isVisible = isVisible
  }
}

// 滚动到指定的位置
function scrollToView(scrollTop: number) {
  window.scrollTo({ top: scrollTop, behavior: 'smooth' })
}

// onMounted中才能拿到dom
onMounted(async () => {
  await nextTick()
  // 获取标题目录
  titles.value = getTitles()
  // 注册滚动事件
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <nav v-if="Object.keys(titles).length > 0" class="catalog-card">
    <BaseBox>
      <div class="catalog-card-header">
        <div>
          <span>
            <Icon class="catalog-icon" name="fa6-solid:bars-staggered" />
          </span>
          <span>目录</span>
        </div>
        <span v-show="progress > 0" class="progress">{{ progress + '%' }}</span>
      </div>
      <div class="catalog-content">
        <div
          v-for="title in titles"
          v-show="title.isVisible"
          :id="title.id"
          :key="title.id"
          :class="['catalog-item', currentTitle.id == title.id ? 'active' : 'not-active']"
          :style="{ marginLeft: title.level * 20 + 'px' }"
          :title="title.rawName"
          @click="scrollToView(title.scrollTop)"
        >
          {{ title.name }}
        </div>
      </div>
    </BaseBox>
  </nav>
</template>

<style scoped>
.catalog-card {
  position: -webkit-sticky;
  position: sticky;
  top: 76px;
  width: inherit;
}

.catalog-card-header {
  text-align: left !important;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.catalog-icon {
  font-size: 18px;
  margin-right: 10px;
  margin-bottom: 5px;
  @apply text-orange-500 dark:text-[#007fff];
}

.catalog-card-header div > span {
  font-size: 17px;
}

.progress {
  color: #a9a9a9;
  font-style: italic;
  font-size: 140%;
}

.catalog-content {
  max-height: calc(100vh - 200px);
  overflow: auto;
  margin-right: -24px;
  padding-right: 20px;
}

.catalog-item {
  margin: 5px 0;
  line-height: 28px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
  padding: 2px 6px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.catalog-item:hover {
  @apply text-orange-500 dark:text-[#007fff];
}

.active {
  @apply rounded-sm bg-orange-500 text-white dark:bg-indigo-500;
}
.active:hover {
  @apply bg-orange-600 text-white dark:bg-indigo-600 dark:text-white;
}
</style>
