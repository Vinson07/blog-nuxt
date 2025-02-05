<script setup lang="ts">
import { NPopover, NTabs, NTabPane } from 'naive-ui'
import { emojiList, faceList } from '@/utils/emoji'

// emoji基地址
const runtimeConfig = useRuntimeConfig()
const { emojiUrl: emojiBaseUrl } = runtimeConfig.public

const emojis = ref(new Array(2))

const emit = defineEmits<{
  (e: 'addEmoji', key: string): void
}>()

function onTabChange(value: string | number) {
  switch (value) {
    case 0:
      break
    case 1:
      emojis.value[1] = emojiList[1]
      break
  }
}

function onPopUpdate(value: boolean) {
  if (value) {
    emojis.value[0] = emojiList[0]
  }
}
</script>

<template>
  <!-- 表情包 -->
  <n-popover placement="bottom-start" :flip="false" trigger="click" @update:show="onPopUpdate">
    <template #trigger>
      <div class="vemoji-btn flex cursor-pointer items-center">
        <Icon name="fluent-emoji-high-contrast:face-without-mouth" size="14" />
        <span class="ml-1 text-sm">表情</span>
      </div>
    </template>
    <n-tabs type="line" animated :pane-style="{ width: '256px' }" @update:value="onTabChange">
      <n-tab-pane v-for="(list, index) in emojis" :key="index" :name="index" :tab="faceList[index]">
        <ul class="flex flex-wrap items-center">
          <li
            v-for="(value, key) in list"
            :key="key"
            class="cursor-pointer rounded p-1 hover:bg-zinc-200"
            @click="emit('addEmoji', key as unknown as string)"
          >
            <img
              class="h-6 w-6"
              draggable="false"
              :title="String(key)"
              :src="emojiBaseUrl + value"
            />
          </li>
        </ul>
      </n-tab-pane>
    </n-tabs>
  </n-popover>
</template>
