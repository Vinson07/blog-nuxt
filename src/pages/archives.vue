<script setup lang="ts">
import type { RecordList } from '@/types/article'

const imageStore = useImageStore()
const archiveList = ref<RecordList[]>([])
const parmas = reactive({ current: 1 })
const loadMore = ref(true)

const { article, poetry } = useApi()

// 获取文章列表
const { data, pending, refresh } = await article.getArchives(parmas)

watchEffect(() => {
  if (data.value && data.value.data.recordList.length > 0) {
    archiveList.value = archiveList.value.concat(data.value.data.recordList)
  } else {
    loadMore.value = false
  }
})

function onInfinite() {
  if (loadMore.value && !pending.value) {
    parmas.current++
    refresh()
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

// async function archiveData() {
//   loading.value = true
//   const { data, pending } = await article.getArchives(count)
//   console.log(data.value)
//   loading.value = pending.value
//   if (data.value) {
//     const { recordList } = data.value.data
//     if (recordList.length > 0) {
//       archiveList.value = [...archiveList.value, ...recordList]
//       count++
//       archiveData()
//     } else {
//       filterArchiveList.value = archiveList.value.reduce(
//         (acc: { [key: string]: RecordList[] }, obj: RecordList) => {
//           const key = useDateFormat(obj.createTime, 'YYYY-MM')
//           if (!acc[key.value]) {
//             acc[key.value] = []
//           }
//           acc[key.value].push(obj)
//           return acc
//         },
//         {}
//       )
//       console.log(filterArchiveList.value, '#')
//       loading.value = false
//     }
//   }
// }
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
        <ArchivesList v-for="item in archiveList" :key="item.id" v-bind="item" />
      </ul>
      <InfiniteScroll class="h-11 text-center" @infinite="onInfinite">
        <img
          v-show="pending"
          src="~/assets/img/svg/wordpress-rotating-ball-o.svg"
          class="h-11 w-11"
          alt=""
        />
      </InfiniteScroll>
    </div>
  </div>
</template>
