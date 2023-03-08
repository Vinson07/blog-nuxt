<script setup lang="ts">
const userStore = useUserStore()
const el = ref(null)
const layout = ref('default')

// 获取博客基本数据
userStore.blogInfoData()

// 适配移动端 屏幕宽度小于768显示
useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  // 更换布局
  if (width > 768) {
    layout.value = 'default'
  } else {
    layout.value = 'mobile'
  }
})
</script>

<template>
  <div ref="el" class="transition-colors duration-500 dark:bg-[#202124] dark:text-neutral-400">
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
