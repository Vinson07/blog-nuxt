<script setup lang="ts">
import type { RecordList } from '@/types/article'

const props = defineProps<RecordList>()
// const router = useRouter()

const filterTime = useDateFormat(props.createTime, 'YYYY-MM-DD')
</script>

<template>
  <li class="archives-list relative pl-8">
    <!-- <div
      class="absolute top-0 -left-[1.14rem] flex h-9 w-9 items-center justify-center rounded-full bg-orange-400"
    >
      <Icon name="material-symbols:event-note-sharp" class="text-xl text-white" />
    </div>
    <h3 class="mb-5 text-xl italic leading-9 text-orange-400">{{ year }}</h3> -->
    <ol>
      <li class="relative mb-5 flex justify-between rounded bg-neutral-100 p-5">
        <div class="absolute top-[1.6rem] -left-[2.4rem] h-3 w-3 rounded-full bg-orange-400"></div>
        <div class="arrow-left-ar absolute top-3 -left-5 h-0 w-0"></div>
        <NuxtLink
          :to="`/post/${id}`"
          class="cursor-pointer text-zinc-500 hover:text-orange-500 hover:dark:text-[#007fff]"
        >
          {{ articleTitle }}
        </NuxtLink>
        <div class="flex items-center text-base text-neutral-400">
          <Icon name="ic:round-access-time" size="20" />
          <span>{{ filterTime }}</span>
        </div>
      </li>
    </ol>
  </li>
</template>

<style>
.archives-list .arrow-left-ar {
  border-left: 20px solid transparent;
  border-bottom: 20px solid #f5f5f5;
}
</style>
