<script setup lang="ts">
import { NButton, NInput } from 'naive-ui'
import { OnClickOutside } from '@vueuse/components'

interface Props {
  placeholder?: string
  btnText?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: '来发一针见血的评论吧!',
  btnText: '提交评论'
})

const content = ref('')
const disabled = ref(true)

const emit = defineEmits<{
  (e: 'hide', event: Event): void
  (e: 'submit', value: string): void
}>()

function onClickOutsideHandler(event: Event) {
  if (content.value.trim() !== '') return
  emit('hide', event)
}

function onInput() {
  if (content.value.trim() === '') {
    disabled.value = true
  } else {
    disabled.value = false
  }
}

function onSubmit() {
  emit('submit', content.value)
}

function onAddEmoji(key: string) {
  content.value += key
}
</script>

<template>
  <OnClickOutside
    :options="{
      ignore: ['.n-popover__content']
    }"
    class="flex-1"
    @trigger="onClickOutsideHandler"
  >
    <n-input
      v-model:value="content"
      :autosize="{
        minRows: 5
      }"
      type="textarea"
      :placeholder="placeholder"
      class="comment_textarea"
      @input="onInput"
    />

    <div class="mt-2 flex justify-between">
      <CommentEmoji @add-emoji="onAddEmoji" />
      <n-button ghost :disabled="disabled" @click="onSubmit"> {{ btnText }} </n-button>
    </div>
  </OnClickOutside>
</template>

<style>
.comment_textarea textarea {
  background: url(~/assets/img/comment.png) no-repeat bottom right;
  background-size: 35%;
}
</style>
