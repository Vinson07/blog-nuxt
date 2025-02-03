<script setup lang="ts">
interface Props {
  total?: number
  page?: number
  pagesize?: number
}

const props = withDefaults(defineProps<Props>(), {
  total: 80,
  page: 1,
  pagesize: 10
})

const emit = defineEmits<{
  (e: 'changePage', currentPage: number): void
}>()

// 动态计算中期的页码信息
// 每页的条数
// const pagesize = 8
// 总页数
const pages = computed(() => Math.ceil(props.total / props.pagesize))
// 当前页码
const currentPage = ref(props.page || 1)
// 动态计算页码列表
const list = computed(() => {
  // 当父组件传递total的值发生变化时，计算属性会重新计算
  // pages = Math.ceil(props.total / props.pagesize)
  const result = []
  // 总页码小于等于5；大于5
  if (pages.value <= 5) {
    // 总页码小于等于5的情况
    for (let i = 1; i <= pages.value; i++) {
      result.push(i)
    }
    return result
  }

  // 总页码大于5
  if (currentPage.value <= 2) {
    // 左侧临界值
    for (let i = 1; i <= 5; i++) {
      result.push(i)
    }
  } else if (currentPage.value >= pages.value - 1) {
    // 右侧临界值
    for (let i = pages.value - 4; i <= pages.value; i++) {
      result.push(i)
    }
  } else {
    // 中间的状态
    for (let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
      result.push(i)
    }
  }
  return result
})
// 控制上一页和下一页变化
const changePage = (type: boolean | number) => {
  if (type === false) {
    // 上一页
    // 页面是第一页时，禁止点击操作
    if (currentPage.value === 1) return
    if (currentPage.value > 1) {
      currentPage.value -= 1
    }
  } else if (type === true) {
    // 下一页
    // 页面是最后页时，禁止点击操作
    if (currentPage.value === pages.value) return
    if (currentPage.value < pages.value) {
      currentPage.value += 1
    }
  } else {
    // 点击页码
    currentPage.value = type
  }
  emit('changePage', currentPage.value)
}
</script>

<template>
  <div class="paging select-none text-xs">
    <span>共{{ pages }}页</span>
    <span
      v-show="currentPage !== 1"
      class="mx-1 cursor-pointer hover:text-orange-500"
      @click="changePage(false)"
    >
      上一页
    </span>
    <span v-if="currentPage > 3" class="mx-1">...</span>
    <span
      v-for="item in list"
      :key="item"
      class="mx-1 cursor-pointer hover:text-orange-500"
      :class="{ active: currentPage === item }"
      @click="changePage(item)"
    >
      {{ item }}
    </span>
    <span v-if="currentPage < pages - 2" class="mx-1"> ... </span>
    <span
      v-show="currentPage !== pages"
      class="mx-1 cursor-pointer hover:text-orange-500"
      @click="changePage(true)"
    >
      下一页
    </span>
  </div>
</template>

<style>
.paging .active {
  @apply text-orange-500;
}
</style>
