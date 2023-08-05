<script setup lang="ts">
import { NDivider, useMessage } from 'naive-ui'
import type { Comment } from '@/types/comment'
import emojiList from '@/utils/emoji'

interface Props {
  id: number
  type: number
}

const props = defineProps<Props>()

const userStore = useUserStore()
const blogStore = useBlogStore()
const message = useMessage()
const recordList = ref<Comment[]>([])
const total = ref(0)
const commentContent = ref('')

const { comment } = useApi()

provide<number>('type', props.type)
provide<number>('id', props.id)

// 获取评论列表
const params = reactive({
  current: 1,
  size: 2,
  typeId: props.id,
  commentType: props.type
})
const { data: commentData, pending } = await comment.getCommentList(params, { server: false })
watch(
  commentData,
  (value) => {
    if (value?.flag && value.data.recordList) {
      total.value = value.data.count
      recordList.value = [...recordList.value, ...value.data.recordList]
    }
  },
  { immediate: true }
)

/**
 * 是否还要加载
 * 评论数和评论总数不相同 加载 反之则不加载
 * */
const isLoad = computed(() => recordList.value.length !== total.value)

// 加载更多
const handleLoading = () => {
  params.current++
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
  const reg = /\[.+?\]/g
  const content = commentContent.value.replace(reg, function (str) {
    return `<img src= '${emojiList[str]}' width='24' height='24' style='margin: 0 1px;vertical-align: bottom;'/>`
  })

  const { data } = await comment.addComment({
    commentContent: content,
    typeId: props.id,
    commentType: props.type
  })
  if (data.value?.flag) {
    // 清空输入框
    commentContent.value = ''
    if (blogStore.siteConfig?.commentCheck) {
      message.success('评论成功，正在审核中')
    } else {
      message.success('评论成功！！')
    }
    // 获取添加评论
    const { data } = await comment.getCommentList({
      current: 1,
      size: 1,
      typeId: props.id,
      commentType: props.type
    })
    if (data.value?.flag && data.value.data.recordList) {
      recordList.value.unshift(data.value.data.recordList[0])
    }
  } else {
    message.error('评论失败！！')
  }
}

// 更新回复
async function reloadReply(id: number) {
  const { data } = await comment.getReplyList(id)
  if (data.value?.data) {
    const list = data.value.data
    recordList.value.forEach((item) => {
      if (item.id === id) item.replyVOList = list
    })
  }
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
      <div class="mr-4">
        <BaseAvatar :size="35" :src="userStore.userInfo?.avatar ?? ''" />
      </div>
      <comment-input v-model:value="commentContent" @submit="onSubmit" />
    </div>
    <!-- 华丽的分割线 -->
    <n-divider style="margin-top: 30px; margin-bottom: 0">
      <Icon name="iconamoon:comment-remove-light" size="18" class="dark:text-white" />
      <span class="ml-1 text-lg dark:text-white">评论区</span>
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
          :id="item.id"
          :reply-count="item.replyCount"
          :data="item.replyVOList"
          @reload-reply="reloadReply"
        />
      </CommentItem>
    </ul>
    <!-- 加载列表 -->
    <div class="my-8 text-center">
      <!-- <n-button v-if="isLoad" ghost @click="handleLoading">
        <template #icon>
          <Icon v-if="pending" name="eos-icons:bubble-loading" size="16" />
          <Icon v-else name="uiw:loading" size="16" />
        </template>
        加载更多
      </n-button> -->
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
      <p v-if="recordList.length === 0">快来发表评论吧～</p>
    </div>
  </div>
</template>
