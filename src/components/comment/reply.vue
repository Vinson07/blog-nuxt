<script setup lang="ts">
import type { Reply } from '@/types/comment'

interface Props {
  id: number
  replyCount: number
  data: Reply[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'reloadReply', id: number, data: Reply[], count?: number): void
}>()

const replyList = ref<Reply[]>(props.data)
const showMore = ref(true)
const { comment } = useApi()

// 获取回复
async function getReplyListFn(current = 1) {
  const { data } = await comment.getReplyList(props.id, { current, size: 5 })
  if (data.value?.flag && data.value.data) {
    emit('reloadReply', props.id, data.value.data)
    replyList.value = data.value.data
    showMore.value = false
  }
}

// 添加回复
async function addReply(id: number) {
  // 最后一页
  const lastPage = Math.ceil(props.replyCount / 5)
  const { data } = await comment.getReplyList(id, { current: lastPage, size: 5 })
  if (data.value?.flag && data.value.data) {
    const length = data.value.data.length
    // 拿到刚添加的回复
    const lastReply = data.value.data[length - 1]
    const list = [...replyList.value, lastReply]
    emit('reloadReply', id, list, props.replyCount + 1)
  }
}

function handleLoadMore() {
  getReplyListFn()
}

function changePage(page: number) {
  getReplyListFn(page)
}
</script>

<template>
  <ul>
    <CommentItem v-for="item in data" :key="item.id" reply :data="item" @add-reply="addReply" />
    <div class="pl-10 text-xs">
      <div v-if="showMore && replyCount > 3">
        <span class="text-gray-400">共{{ replyCount }}条回复，</span>
        <span class="inline-flex cursor-pointer items-center text-blue-500" @click="handleLoadMore">
          <i class="mr-1 not-italic">点击查看</i>
          <Icon name="streamline:interface-arrows-button-down-arrow-down-keyboard" />
        </span>
      </div>
      <CommentPaging
        v-else-if="replyCount > 5"
        :page="1"
        :pagesize="5"
        :total="replyCount"
        @change-page="changePage"
      />
    </div>
  </ul>
</template>
