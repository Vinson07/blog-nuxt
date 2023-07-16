<script setup lang="ts">
import { NButton, NDivider, useMessage } from 'naive-ui'
import type { Record } from '@/types/comment'
import emojiList from '@/utils/emoji'

interface Props {
  id: number
  type: number
}

const prop = defineProps<Props>()

const user = useUserStore()
const message = useMessage()
const recordList = ref<Record[]>([])
const total = ref(0)
const current = ref(1)
const loading = ref(false)
const loadBtn = ref(false)
const commentContent = ref('')

const { comment } = useApi()

provide<number>('type', prop.type)
provide<number>('id', prop.id)

// 获取评论列表
async function commentList(current: number) {
  const params = {
    current,
    type: prop.type,
    topicId: prop.id
  }
  loading.value = true
  const { data, pending } = await comment.getCommentList(params, { server: false })
  loading.value = pending.value
  if (data.value?.data) {
    const { count, recordList: list } = data.value.data
    total.value = count
    if (list && list.length > 0) {
      recordList.value = recordList.value.concat(list)
    }
    if (recordList.value.length > 0 && count !== recordList.value.length) {
      loadBtn.value = true
    } else {
      loadBtn.value = false
    }
  }
}

onMounted(() => {
  commentList(current.value)
})

const handleLoading = () => {
  current.value++
  commentList(current.value)
}

// 添加评论
async function onSubmit() {
  if (!user.userInfo?.userInfoId) {
    message.warning('请先登录')
    return
  }
  if (commentContent.value.trim() === '') {
    message.warning('内容不能为空！！！')
    return
  }

  // 解析表情
  const reg = /\[.+?\]/g
  commentContent.value = commentContent.value.replace(reg, function (str) {
    return `<img src= '${emojiList[str]}' width='24' height='24' style='margin: 0 1px;vertical-align: bottom;'/>`
  })

  const { data } = await comment.addComment({
    commentContent: commentContent.value,
    type: prop.type,
    topicId: prop.id
  })
  if (data.value?.flag) {
    commentContent.value = ''
    if (user.websiteConfig.isCommentReview) {
      message.success('评论成功，正在审核中')
    } else {
      message.success('评论成功！！')
    }
    const { data } = await comment.getCommentList({
      current: 1,
      type: prop.type,
      topicId: prop.id
    })
    if (data.value?.data.recordList) recordList.value.unshift(data.value.data.recordList[0])
  } else {
    message.error('评论失败！！')
  }
}

// 更新回复
async function reloadReply(id: number) {
  const { data } = await comment.getReplies(id)
  recordList.value.forEach((item) => {
    if (item.id === id) item.replyDTOList = data.value?.data
  })
}
</script>

<template>
  <!-- 评论 -->
  <div>
    <!-- 标题 -->
    <div class="veditor mt-5 flex items-center">
      <Icon name="iconamoon:comment-remove-light" size="18" />
      <span class="ml-1 text-lg">评论</span>
    </div>
    <n-divider style="margin: 10px 0 15px" />
    <!-- 评论区 -->
    <div class="flex">
      <Avatar class="mr-4" size="35" :src="user.userInfo?.avatar" />
      <comment-input v-model:value="commentContent" @submit="onSubmit" />
    </div>
    <!-- 华丽的分割线 -->
    <n-divider style="margin-top: 30px; margin-bottom: 0">
      <Icon name="iconamoon:comment-remove-light" size="18" />
      <span class="ml-1 text-lg">评论区</span>
    </n-divider>
    <!-- 评论内容 -->
    <ul>
      <CommentItem
        v-for="item in recordList"
        :key="item.id"
        :data="item"
        @reload-reply="reloadReply"
      >
        <CommentReply
          v-if="item.replyDTOList"
          :id="item.id"
          :reply-count="item.replyCount"
          :data="item.replyDTOList"
          @reload-reply="reloadReply"
        />
      </CommentItem>
    </ul>
    <!-- 加载列表 -->
    <div class="my-8 text-center">
      <n-button v-if="loadBtn" ghost @click="handleLoading">
        <template #icon>
          <Icon v-if="loading" name="eos-icons:bubble-loading" size="16" />
          <Icon v-else name="uiw:loading" size="16" />
        </template>
        加载更多
      </n-button>
      <p v-if="recordList.length === 0">快来发表评论吧～</p>
    </div>
  </div>
</template>
