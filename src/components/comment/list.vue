<script setup lang="ts">
import type { Record } from '@/types/comment'
defineProps<{
  data: Record[]
}>()
</script>

<template>
  <ul>
    <CommentItem v-for="item in data" :key="item.id" :data="item">
      <CommentReply
        v-if="item.replyDTOList"
        :id="item.id"
        :reply-count="item.replyCount"
        :data="item.replyDTOList"
      />
    </CommentItem>
  </ul>
</template>
