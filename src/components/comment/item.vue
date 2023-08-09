<script setup lang="ts">
import { NAvatar, useMessage } from 'naive-ui'
import type { Comment, Reply } from '@/types/comment'
import EmojiApi from '@/utils/emoji'

interface Props {
  reply?: boolean
  data: Comment | Reply
}

const props = withDefaults(defineProps<Props>(), {
  reply: false
})

const emit = defineEmits<{
  (e: 'reloadReply', id: number): void
}>()

const userStore = useUserStore()
const message = useMessage()
const isShowInput = ref(false)
const btnRef = ref<HTMLElement | null>(null)
const commentContent = ref('')
const likeCount = ref(props.data.likeCount || 0)
const isLike = ref(false)
const type = inject<number>('type', 1)
const id = inject<number>('id')

const { comment } = useApi()

const timeFormat = computed(() => (time: string) => useDateFormat(time, 'YYYY-MM-DD HH:mm').value)
const commentClass = computed(() => (props.reply ? ['reply', 'my-3', 'border-none'] : ['py-3']))

// 回复
const handleReply = () => {
  commentContent.value = ''
  isShowInput.value = !isShowInput.value
}

// 点赞
const likeActive = computed(
  () => isLike.value || userStore.userInfo?.commentLikeSet?.includes(props.data.id)
)

const handleLike = useThrottleFn(async (commentId: number) => {
  if (!userStore.userInfo) {
    message.warning('请先登录')
    return
  }
  const { data } = await comment.likeComment(commentId)
  if (data.value?.flag) {
    if (userStore.userInfo.commentLikeSet?.includes(commentId)) {
      likeCount.value--
      isLike.value = false
      message.warning('取消点赞！！')
    } else {
      likeCount.value++
      isLike.value = true
      message.success('点赞成功！！')
    }

    userStore.setLikeComment(commentId)
  }
}, 500)

const onHide = (event: Event) => {
  const target = event.target as HTMLElement
  // console.log(!btnRef.value?.contains(target))
  if (!btnRef.value?.contains(target)) {
    isShowInput.value = false
  }
}

// 提交
async function onSubmit() {
  if (!userStore.userInfo) {
    message.warning('请先登录')
    return
  }

  if (commentContent.value.trim() === '') {
    message.warning('内容不能为空！！！')
    return
  }

  // 解析表情
  const content = useEmojiParse(EmojiApi.allEmoji, commentContent.value)
  // 添加评论
  const parentId = props.reply ? (props.data as Reply).parentId : props.data.id
  const params = {
    commentContent: content,
    typeId: id,
    commentType: type,
    parentId,
    replyId: props.data.id,
    toUid: props.data.fromUid
  }
  const { data } = await comment.addComment(params)
  if (data.value?.flag) {
    commentContent.value = ''
    isShowInput.value = false
    message.success('评论成功！！')

    // 重新加载回复
    const id = props.reply ? (props.data as Reply).parentId : props.data.id
    emit('reloadReply', id)
  } else {
    message.error('评论失败！！')
  }
}
</script>

<template>
  <li
    class="border-b border-dashed border-b-slate-200 text-sm dark:border-b-neutral-700"
    :class="commentClass"
  >
    <div class="flex">
      <div :class="reply ? 'mt-2' : 'mt-1'">
        <n-avatar round :size="reply ? 'small' : 'medium'" :src="data.avatar" />
      </div>
      <div class="ml-4 flex-1">
        <div class="flex items-center">
          <h3 class="text-15 cursor-pointer font-semibold text-blue-500">
            {{ data.fromNickname }}
          </h3>
          <p
            v-if="data.fromUid === 1"
            class="ml-1 rounded border border-orange-500 py-px px-[2px] text-xs leading-3 text-orange-500"
          >
            博主
          </p>
        </div>
        <p class="text-gray-400">{{ timeFormat(data.createTime) }}</p>
        <p class="vcontent my-2 break-all">
          <NuxtLink
            v-if="reply && data.fromUid !== (data as Reply).toUid"
            to=""
            class="mr-1 cursor-pointer text-blue-500"
          >
            @{{ (data as Reply).toNickname }}
          </NuxtLink>
          <!-- eslint-disable-next-line -->
          <span v-html="data.commentContent.replace(/(\r\n)|(\n)/g, '<br>')"></span>
        </p>
        <div class="flex">
          <div
            class="mr-4 flex cursor-pointer select-none items-center"
            :class="{ 'text-blue-500': likeActive }"
            @click="handleLike(data.id)"
          >
            <Icon v-if="likeActive" name="solar:like-bold" size="16" />
            <Icon v-else name="solar:like-outline" />
            <span class="ml-1 cursor-pointer">{{ likeCount }}</span>
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
            :placeholder="`回复 @${data.fromNickname}`"
            @submit="onSubmit"
            @hide="onHide"
          />
        </div>
        <!-- 二级评论 -->
        <slot />
      </div>
    </div>
  </li>
</template>
