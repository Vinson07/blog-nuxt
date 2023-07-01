<script setup lang="ts">
import { NButton, NDivider, useMessage } from 'naive-ui'
import type { Record } from '@/types/comment'
import { getCommentList, addComment } from '@/apis/comment'
import emojiList from '@/utils/emoji'

interface Props {
  type: number
}

const prop = defineProps<Props>()

const recordList = ref<Record[]>([])
const total = ref(0)
const loading = ref(false)
const current = ref(1)
const loadBtn = ref(true)
const user = useUserStore()
const message = useMessage()

// 获取评论列表
async function comment() {
  loading.value = true
  try {
    const { data } = await getCommentList({ current: current.value, type: prop.type })
    loading.value = false
    if (data) {
      total.value = data.count
      if (data?.recordList && data.recordList.length > 0) {
        recordList.value = recordList.value.concat(data.recordList)
      }
      if (data.count === recordList.value.length) loadBtn.value = false
    }
  } catch (error) {
    loading.value = false
    console.error(error)
  }
}
comment()

const handleLoading = () => {
  current.value++
  comment()
}

// 添加评论
async function onSubmit(content: string) {
  if (!user.userInfo?.userInfoId) {
    message.warning('请先登录')
    return
  }

  // 解析表情
  const reg = /\[.+?\]/g
  content = content.replace(reg, function (str) {
    return `<img src= '${emojiList[str]}' width='24' height='24' style='margin: 0 1px;vertical-align: bottom;'/>`
  })
  try {
    const { flag } = await addComment({
      commentContent: content,
      type: prop.type
    })
    if (flag) {
      message.success('评论成功')
      current.value = 1
      const { data } = await getCommentList({ current: current.value, type: prop.type })
      if (data?.recordList) recordList.value.unshift(data.recordList[0])
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <!-- 评论 -->
  <div>
    <!-- 标题 -->
    <div class="mt-5 flex items-center">
      <Icon name="iconamoon:comment-remove-light" size="18" />
      <span class="ml-1 text-lg">评论</span>
    </div>
    <n-divider style="margin: 10px 0 15px" />
    <!-- 评论区 -->
    <div class="flex">
      <Avatar class="mr-4" size="35" />
      <comment-input @submit="onSubmit" />
    </div>
    <!-- 华丽的分割线 -->
    <n-divider style="margin-top: 30px; margin-bottom: 0">
      <Icon name="iconamoon:comment-remove-light" size="18" />
      <span class="ml-1 text-lg">评论区</span>
    </n-divider>
    <!-- 评论内容 -->
    <div>
      <CommentList v-if="recordList" :data="recordList" />
    </div>
    <!-- 加载列表 -->
    <div class="my-8 text-center">
      <n-button v-if="loadBtn" ghost @click="handleLoading">
        <template #icon>
          <Icon v-if="loading" name="eos-icons:bubble-loading" size="16" />
          <Icon v-else name="uiw:loading" size="16" />
        </template>
        加载更多
      </n-button>
    </div>
  </div>
</template>
