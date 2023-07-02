<script setup lang="ts">
import { useMessage } from 'naive-ui'
import type { Record } from '@/types/comment'
import { addComment } from '@/apis/comment'

interface Props {
  reply?: boolean
  data: Record
}

const props = withDefaults(defineProps<Props>(), {
  reply: false
})

const emit = defineEmits<{
  (e: 'reloadReply'): void
}>()

const user = useUserStore()
const message = useMessage()
const isShowInput = ref(false)
const btnRef = ref<HTMLElement | null>(null)
const commentContent = ref('')
const type = inject<number>('type')
const id = inject<number>('id')

const timeFormat = computed(() => (time: string) => useDateFormat(time, 'YYYY-MM-DD HH:mm').value)
const commentClass = computed(() => (props.reply ? ['reply', 'py-0', 'my-3', 'border-none'] : []))

const handleReply = () => {
  isShowInput.value = !isShowInput.value
}

const onHide = (event: Event) => {
  const target = event.target as HTMLElement
  // console.log(!btnRef.value?.contains(target))
  if (!btnRef.value?.contains(target)) {
    isShowInput.value = false
  }
}

async function onSubmit() {
  if (!user.userInfo?.userInfoId) {
    message.warning('请先登录')
  }

  try {
    const parentId = props.reply ? props.data.parentId : props.data.id
    const replyUserId = props.reply ? props.data.replyUserId : props.data.userId
    const { flag } = await addComment({
      commentContent: commentContent.value,
      type: type || 0,
      topicId: id,
      parentId,
      replyUserId
    })
    if (flag) {
      isShowInput.value = false
      message.success('评论成功！！')
      emit('reloadReply')
    } else {
      message.error('评论失败！！')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <li
    class="border-b border-dashed border-b-slate-200 py-3 text-sm dark:border-b-neutral-700"
    :class="commentClass"
  >
    <div class="flex">
      <Avatar :size="reply ? 25 : 35" :src="data.avatar" :class="reply ? 'mt-2' : 'mt-1'" />
      <div class="ml-4 flex-1">
        <h3 class="cursor-pointer text-blue-500">{{ data.nickname }}</h3>
        <p class="text-gray-400">{{ timeFormat(data.createTime) }}</p>
        <p class="my-2 break-all">
          <NuxtLink
            v-if="reply && data.replyUserId !== data.userId"
            to=""
            class="mr-1 cursor-pointer text-blue-500"
          >
            @{{ data.replyNickname }}
          </NuxtLink>
          <!-- eslint-disable-next-line -->
          <span v-html="data.commentContent"></span>
        </p>
        <div class="flex">
          <div class="mr-4 flex cursor-pointer items-center">
            <Icon name="solar:like-outline" />
            <span class="ml-1 cursor-pointer">{{ data.likeCount || 0 }}</span>
          </div>
          <div
            ref="btnRef"
            class="flex cursor-pointer items-center"
            :class="{ 'text-blue-500': isShowInput }"
            @click="handleReply"
          >
            <Icon name="icon-park-outline:comment" />
            <span class="ml-1 cursor-pointer">{{ isShowInput ? '取消回复' : '回复' }}</span>
          </div>
        </div>
        <div v-if="isShowInput">
          <comment-input
            v-model:value="commentContent"
            class="mt-3"
            :placeholder="`回复 @${data.nickname}`"
            @submit="onSubmit"
            @hide="onHide"
          />
        </div>
        <!-- 二级评论 -->
        <slot></slot>
      </div>
    </div>
  </li>
</template>
