<script setup lang="ts">
import { NPopover, NTabs, NTabPane } from 'naive-ui'
import emojiList from '@/utils/emoji'

const emit = defineEmits<{
  (e: 'addEmoji', key: string): void
}>()

function addEmoji(key: string | number) {
  emit('addEmoji', key.toString())
}
</script>

<template>
  <!-- 表情包 -->
  <n-popover placement="bottom-start" trigger="click">
    <template #trigger>
      <div class="vemoji-btn flex cursor-pointer items-center">
        <Icon name="fluent-emoji-high-contrast:face-without-mouth" size="14" />
        <span class="ml-1 text-sm">表情</span>
      </div>
    </template>
    <n-tabs type="line" animated :pane-style="{ width: '256px' }">
      <n-tab-pane name="emoji" tab="emoji">
        <ul class="flex flex-wrap items-center">
          <li
            v-for="(value, key) in emojiList"
            :key="key"
            class="cursor-pointer rounded p-1 hover:bg-zinc-200"
            @click="addEmoji(key)"
          >
            <img class="h-6 w-6" draggable="false" :title="key.toString()" :src="value" />
          </li>
        </ul>
      </n-tab-pane>
      <!-- <n-tab-pane name="the beatles" tab="bili">
        <div class="flex flex-wrap items-center">
          <img
            class="mr-2 mb-2 h-8 w-7 cursor-pointer"
            draggable="false"
            title="：滑稽："
            num="0"
            src="~/assets/img/phiz/face_0.png"
          />
        </div>
      </n-tab-pane> -->
    </n-tabs>
  </n-popover>
</template>
