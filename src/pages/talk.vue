<script setup lang="ts">
import type { Talk } from '@/types/talk'

useHead({
  title: '说说'
})

const imageStore = useImageStore()

const loadMore = ref(true)
const talkList = ref<Talk[]>([])
const params = reactive({
  current: 1,
  size: 5
})

const { talk } = useApi()

const { data, pending } = await talk.getTalkList(params)
watch(
  data,
  (value) => {
    if (value?.flag) {
      talkList.value = [...talkList.value, ...value.data.recordList]
      if (value.data.count === talkList.value.length) {
        loadMore.value = false
      }
    }
  },
  { immediate: true }
)

function onInfinite() {
  if (!pending.value && loadMore.value) {
    params.current++
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
