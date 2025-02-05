<script setup lang="ts">
import { NDivider, NAvatar, useMessage } from 'naive-ui'
import type { Comment, Reply } from '@/types/comment'
import { useEmojiMap } from '@/utils/emoji'

interface Props {
  id?: number
  type: number // 评论类型 (1文章 2友链 3说说)
  nodataTip?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  nodataTip: '快来发表评论吧～'
})

const userStore = useUserStore()
const blogStore = useBlogStore()
const message = useMessage()
const emojiMap = useEmojiMap()

const recordList = ref<Comment[]>([])
const total = ref(0)
const commentContent = ref('')
const addPending = ref(false) // 添加评论加载状态，防治重复评论

const { comment: commentApi } = useApi()

provide<number>('type', props.type)
provide<number | undefined>('id', props.id)

// 获取评论列表
const params = {
  current: 1,
  size: 10,
  typeId: props.id,
  commentType: props.type
}
const {
  data: commentData,
  pending,
  execute
} = await commentApi.getCommentList(params, { immediate: false })
onMounted(async () => {
  await execute()
  if (commentData.value?.flag && commentData.value.data.recordList) {
    total.value = commentData.value.data.count
    recordList.value = commentData.value.data.recordList
  }
})

/**
 * 是否还要加载
 * 评论数和评论总数不相同 加载 反之则不加载
 * */
const isLoad = computed(() => recordList.value.length !== total.value)

// 加载更多
const handleLoading = async () => {
  params.current++

  await execute()
  if (commentData.value?.flag && commentData.value.data.recordList) {
    recordList.value = [...recordList.value, ...commentData.value.data.recordList]
  }
}

// 添加评论
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
  const content = useEmojiParse(emojiMap, commentContent.value)
  // 添加评论
  addPending.value = true
  const { data } = await commentApi.addComment({
    commentContent: content,
    typeId: props.id,
    commentType: props.type
  })
  addPending.value = false
  if (data.value?.flag) {
    // 清空输入框
    commentContent.value = ''
    if (blogStore.siteConfig?.commentCheck) {
      message.success('评论成功，正在审核中')
    } else {
      message.success('评论成功！！')
    }
    // 获取添加评论
    const { data } = await commentApi.getCommentList({
      current: 1,
      size: 1,
      typeId: props.id,
      commentType: props.type
    })
    if (data.value?.flag && data.value.data.recordList) {
      total.value = data.value.data.count
      recordList.value = [...data.value.data.recordList, ...recordList.value]
    }
  } else {
    message.error('评论失败！！')
  }
}

// 更新一级回复
async function addReply(id: number) {
  let replyCount = 0
  let replyList: Reply[] = []
  recordList.value.forEach((item) => {
    if (item.id === id) {
      replyCount = item.replyCount || 0
      replyList = item.replyVOList || []
    }
  })
  // 最后一页 默认为1
  const lastPage = Math.ceil(replyCount / 5) || 1
  const { data } = await commentApi.getReplyList(id, { current: lastPage, size: 5 })
  if (data.value?.flag && data.value.data) {
    const length = data.value.data.length
    // 拿到刚添加的回复
    const lastReply = data.value.data[length - 1]
    const list = [...replyList, lastReply]
    // 更新回复
    recordList.value.forEach((item) => {
      if (item.id === id) {
        item.replyVOList = list
        item.replyCount = replyCount + 1
      }
    })
  }
}

// 更新二级回复
function reloadReply(id: number, data: Reply[], count?: number) {
  recordList.value.forEach((item) => {
    if (item.id === id) {
      item.replyVOList = data
      if (count) item.replyCount = count
    }
  })
}
</script>

<template>
  <div class="py-10px">
    <div class="veditor mb-15px flex items-center">
      <Icon name="iconamoon:comment-remove-light" size="18" />
      <span class="ml-1 text-lg">评论</span>
    </div>
    <div class="my-15px flex">
      <div class="mr-4">
        <n-avatar size="medium" round :src="userStore.userInfo?.avatar" />
      </div>
      <comment-input v-model:value="commentContent" :loading="addPending" @submit="onSubmit" />
    </div>
    <n-divider dashed style="margin: 0">
      <span class="ml-1 text-sm dark:text-white">{{ total }} 条评论</span>
    </n-divider>
    <ul>
      <CommentItem v-for="item in recordList" :key="item.id" :data="item" @add-reply="addReply">
        <CommentReply
          v-if="item.replyVOList"
          :id="item.id"
          :reply-count="item.replyCount"
          :data="item.replyVOList"
          @reload-reply="reloadReply"
        />
      </CommentItem>
    </ul>
    <div class="my-8 text-center">
      <p v-if="isLoad" class="h-8">
        <img
          v-if="pending"
          src="~/assets/img/svg/wordpress-rotating-ball-o.svg"
          class="h-8 w-8"
          alt=""
        />
        <span
          v-else
          class="text-15 cursor-pointer text-orange-500 hover:underline dark:text-indigo-500"
          @click="handleLoading"
        >
          加载更多
        </span>
      </p>
      <p v-if="recordList.length === 0">{{ nodataTip }}</p>
    </div>
  </div>
</template>
