<script setup lang="ts">
import type { Archives } from '@/types/article'

useHead({
  title: '文章归档'
})

const imageStore = useImageStore()
const archiveList = ref<{ [key: string]: Archives[] }>({})

const { article } = useApi()

// 获取全部文章归档
const { data, pending } = await article.getArchivesList({ current: 1, size: 500 })
if (data.value?.flag) {
  const { recordList } = data.value.data
  if (recordList.length > 0) {
    // 过滤 按年份分数组
    archiveList.value = recordList.reduce((acc: { [key: string]: Archives[] }, obj: Archives) => {
      const key = useDateFormat(obj.createTime, 'YYYY-MM')
      if (!acc[key.value]) {
        acc[key.value] = []
      }
      acc[key.value].push(obj)
      return acc
    }, {})
  }
}
</script>

<template>
  <div id="archives">
    <ThePageBanner :bg-cover="imageStore.pageList.archive" title="文章归档" />
    <div class="m-auto mt-10 max-w-[844px] animate-[slideUpIn_1s] pl-7 pr-4">
      <ul class="border-l border-dashed pb-1">
        <ArchivesList
          v-for="(item, key, index) in archiveList"
          :key="index"
          :time="key"
          :list="item"
        />
      </ul>
      <div class="text-center">
        <img
          v-show="pending"
          src="~/assets/img/svg/wordpress-rotating-ball-o.svg"
          class="h-11 w-11"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
