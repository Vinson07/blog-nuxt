<script setup lang="ts">
import type { RecordList } from '@/types/article'

const imageStore = useImageStore()
const archiveList = ref<RecordList[]>([])
const filterArchiveList = ref<{ [key: string]: RecordList[] }>({})
const current = ref(1)
const loading = ref(false)

const { article, poetry } = useApi()

// 获取文章列表
async function archiveData() {
  loading.value = true
  const { flag, data } = await article.getArchives({ current: current.value })
  if (flag) {
    const { recordList } = data
    if (recordList.length > 0) {
      archiveList.value = [...archiveList.value, ...recordList]
      current.value++
      archiveData()
    } else {
      filterArchiveList.value = archiveList.value.reduce(
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
      loading.value = false
    }
  }
}

onMounted(() => {
  archiveData()
})

// function onInfinite() {
//   if (loadMore.value && !pending.value) {
//     parmas.current++
//     refresh()
//   }
// }

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
          v-for="(item, key, index) in filterArchiveList"
          :key="index"
          :time="key"
          :list="item"
        />
      </ul>
      <div class="text-center">
        <img
          v-show="loading"
          src="~/assets/img/svg/wordpress-rotating-ball-o.svg"
          class="h-11 w-11"
          alt=""
        />
      </div>
      <!-- <BaseInfiniteScroll class="h-11 text-center" @infinite="onInfinite">
        <img
          v-show="pending"
          src="~/assets/img/svg/wordpress-rotating-ball-o.svg"
          class="h-11 w-11"
          alt=""
        />
      </BaseInfiniteScroll> -->
    </div>
  </div>
</template>
