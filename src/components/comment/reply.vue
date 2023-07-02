<script setup lang="ts">
import type { Record } from '@/types/comment'
import { getReplies } from '@/apis/comment'

interface Props {
  id: number
  replyCount: number | null
  data: Record[]
}

const props = defineProps<Props>()
const replyList = ref<Record[]>(props.data)
const loading = ref(false)
const showMore = ref(true)

async function reloadReply() {
  showMore.value = false
  loading.value = true
  try {
    const { data } = await getReplies(props.id)
    if (data) replyList.value = data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <ul>
    <CommentItem
      v-for="item in replyList"
      :key="item.id"
      reply
      :data="item"
      @reload-reply="reloadReply"
    />
    <div class="pl-10 text-xs">
      <span v-if="loading">加载中...</span>
      <div v-if="showMore && replyCount && replyCount > 3">
        <span class="text-gray-400">共{{ replyCount }}条回复，</span>
        <span class="inline-flex cursor-pointer items-center text-blue-500" @click="reloadReply">
          <i class="mr-1 not-italic">点击查看</i>
          <Icon name="streamline:interface-arrows-button-down-arrow-down-keyboard" />
        </span>
      </div>
    </div>
  </ul>
</template>
