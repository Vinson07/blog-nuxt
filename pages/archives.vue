<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { getPoetry } from '@/apis/poetry'
import { getArchives } from '@/apis/article'
import type { RecordList } from '@/types/article'

const message = useMessage()
const router = useRouter()
const imageStore = useImageStore()
const poetryText = ref('')
const archiveList = ref<RecordList[]>([])
const filterArchiveList = ref<{ [key: string]: RecordList[] }>({})
const count = 1

// 获取文章列表
archiveData(count)

async function archiveData(count: number) {
  try {
    const { code, data, message: msg } = await getArchives(count)
    if (code === 20000) {
      if (data.recordList.length > 0) {
        archiveList.value = [...archiveList.value, ...data.recordList]
        count++
        archiveData(count)
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
      }
    } else {
      message.warning(msg)
    }
  } catch (error) {
    console.warn(error)
  }
}

const filterTime = computed(() => (time: string) => {
  return useDateFormat(time, 'MM-DD').value
})

onMounted(async () => {
  try {
    const { data } = await getPoetry()
    poetryText.value = `${data.content} —— ${data.author}`
  } catch (error) {
    console.warn(error)
  }
})
</script>

<template>
  <div id="archives">
    <the-top-bg-img
      :poetry-text="poetryText"
      :bg-cover="imageStore.pageList.archive"
      bg-title="文章归档"
    />
    <div class="m-auto mt-10 max-w-[844px] pl-7 pr-4">
      <ul class="border-l border-dashed pb-1">
        <li v-for="(item, key, index) in filterArchiveList" :key="index" class="relative pl-8">
          <div
            class="absolute top-0 -left-[1.14rem] flex h-9 w-9 items-center justify-center rounded-full bg-orange-400"
          >
            <Icon name="material-symbols:event-note-sharp" class="text-xl text-white" />
          </div>
          <h3 class="mb-5 text-xl italic leading-9 text-orange-400">{{ key }}</h3>
          <ol>
            <li
              v-for="archive in item"
              :key="archive.id"
              class="relative mb-5 flex justify-between bg-neutral-100 p-5"
              @click="router.push(`/post/${archive.id}`)"
            >
              <div
                class="absolute top-[1.6rem] -left-[2.4rem] h-3 w-3 rounded-full bg-orange-400"
              ></div>
              <div class="arrow-left-ar absolute top-3 -left-5 h-0 w-0"></div>
              <p
                class="cursor-pointer text-zinc-500 hover:text-orange-500 hover:dark:text-[#007fff]"
              >
                {{ archive.articleTitle }}
              </p>
              <div class="flex items-center text-base text-neutral-400">
                <Icon name="ic:round-access-time" size="20" />
                <span>{{ filterTime(archive.createTime) }}</span>
              </div>
            </li>
          </ol>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less">
#archives {
  .arrow-left-ar {
    border-left: 20px solid transparent;
    border-bottom: 20px solid #f5f5f5;
  }
}
</style>
