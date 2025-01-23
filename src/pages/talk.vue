<script setup lang="ts">
import type { Talk } from '@/types/talk'

useHead({
  title: '说说'
})

const imageStore = useImageStore()

const talkList = ref<Talk[]>([])

const { talk } = useApi()
const params = {
  current: 1,
  size: 5
}
const { data, pending, execute } = await talk.getTalkList(params)
if (data.value?.flag) {
  talkList.value = data.value.data.recordList
}

/**
 * 是否还要加载
 * 列表数和总数不相同 加载 反之则不加载
 * */
const isLoad = computed(() => talkList.value.length !== data.value?.data.count)

async function onInfinite() {
  if (!pending.value && isLoad.value) {
    params.current++
    // 手动触发请求
    await execute()
    if (data.value?.flag) {
      talkList.value = [...talkList.value, ...data.value.data.recordList]
    }
  }
}
</script>

<template>
  <div>
    <ThePageBanner :bg-cover="imageStore.pageList.talk" title="说说" />
    <div class="mx-auto max-w-3xl animate-[slideUpIn_1s] pt-10">
      <TalkItem v-for="item in talkList" :key="item.id" :list="item" />
    </div>
    <BaseInfiniteScroll :distance="250" class="text-center" @infinite="onInfinite">
      <Icon v-show="pending" name="eos-icons:bubble-loading" class="text-3xl" />
    </BaseInfiniteScroll>
  </div>
</template>
