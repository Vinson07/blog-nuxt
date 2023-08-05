<script setup lang="ts">
import type { RecordList } from '@/types/article'

const imageStore = useImageStore()
const archiveList = ref<{ [key: string]: RecordList[] }>({})

const { article, poetry } = useApi()

// 获取全部文章归档
const { data, pending } = await article.getArchivesList()
if (data.value?.flag) {
  const { recordList } = data.value.data
  if (recordList.length > 0) {
    // 过滤 按年份分数组
    archiveList.value = recordList.reduce(
      (acc: { [key: string]: RecordList[] }, obj: RecordList) => {
        const key = useDateFormat(obj.createTime, 'YYYY-MM')
        if (!acc[key.value]) {
          acc[key.value] = []
        }
        acc[key.value].push(obj)
        return acc
      },
      {}
    )
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
  <div id="archives">
    <TheTopBgImg
      :bg-cover="imageStore.pageList.archive"
      title="文章归档"
      :poetry-text="poetryText"
    />
    <div class="m-auto mt-10 max-w-[844px] pl-7 pr-4">
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
