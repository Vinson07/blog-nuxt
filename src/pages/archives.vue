<script setup lang="ts">
// import { NCollapse, NCollapseItem } from 'naive-ui'
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

// const filterTime = computed(() => (time: string) => useDateFormat(time, 'MM-DD').value)
</script>

<template>
  <div id="archives">
    <ThePageBanner :bg-cover="imageStore.pageList.archive" title="文章归档" />
    <div class="m-auto mt-10 max-w-[844px] animate-[slideUpIn_1s] pl-7 pr-4">
      <ul class="border-l border-dashed pb-1">
        <ArchivesList
          v-for="(item, key, index) in archiveList"
          :key="index"
          :index="index"
          :time="key"
          :list="item"
        />
      </ul>
      <!-- <n-collapse class="archives-collapse" :default-expanded-names="[0]">
        <template #arrow>
          <div
            class="flex h-9 w-9 items-center justify-center rounded-full bg-orange-400 dark:bg-indigo-500"
          >
            <Icon name="material-symbols:event-note-sharp" class="text-xl text-white" />
          </div>
        </template>
        <n-collapse-item v-for="(item, key, index) in archiveList" :key="index" :name="index">
          <template #header>
            <h3
              class="ml-5px cursor-pointer select-none text-xl italic leading-9 text-orange-400 dark:text-indigo-500"
            >
              {{ key }}
            </h3>
          </template>
          <ol class="pl-[3.2rem]">
            <li
              v-for="archive in item"
              :key="archive.id"
              class="relative mb-5 flex justify-between rounded bg-neutral-100 p-5 shadow-md"
            >
              <div
                class="absolute top-[1.6rem] -left-[2.4rem] h-3 w-3 rounded-full bg-orange-400 dark:bg-indigo-500"
              ></div>
              <div class="arrow-left-ar absolute top-3 -left-5 h-0 w-0"></div>
              <NuxtLink
                :to="`/post/${archive.id}`"
                class="cursor-pointer text-base text-zinc-500 hover:text-orange-500 hover:dark:text-indigo-500"
              >
                {{ archive.articleTitle }}
              </NuxtLink>
              <div class="flex items-center text-base text-neutral-400">
                <Icon name="ic:round-access-time" size="20" />
                <span>{{ filterTime(archive.createTime) }}</span>
              </div>
            </li>
          </ol>
        </n-collapse-item>
      </n-collapse> -->
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
