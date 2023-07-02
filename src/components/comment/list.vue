<script setup lang="ts">
import type { Record } from '@/types/comment'
import { getReplies } from '@/apis/comment'

const props = defineProps<{
  data: Record[]
}>()

async function reloadReply(id: number | undefined) {
  if (id) {
    try {
      const { data } = await getReplies(id)
      if (data) {
        props.data.forEach((item) => {
          if (item.id === id) {
            item.replyDTOList = data
          }
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<template>
  <ul>
    <CommentItem v-for="item in data" :key="item.id" :data="item" @reload-reply="reloadReply">
      <CommentReply
        v-if="item.replyDTOList"
        :id="item.id"
        :reply-count="item.replyCount"
        :data="item.replyDTOList"
      />
    </CommentItem>
  </ul>
</template>
