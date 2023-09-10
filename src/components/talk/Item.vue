<script setup lang="ts">
import { NAvatar, useMessage } from 'naive-ui'
import type { Talk } from '@/types/talk'

interface Props {
  list: Talk
}

const props = defineProps<Props>()

const userStore = useUserStore()
const message = useMessage()
const { talk } = useApi()

const showComment = ref(false)
const likeCount = ref(props.list.likeCount)
const isLike = ref(false)

// 显示评论
const onToggleComment = () => {
  showComment.value = !showComment.value
}

// 时间格式化
const createTime = computed(
  () => (time: string) => useDateFormat(time, 'YYYY-MM-DD HH:mm:ss').value
)

// 随机数
// function getRandomInt(min: number, max: number) {
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }

const getRandomInt = computed(() => `gradient${Math.floor(Math.random() * (5 - 1 + 1)) + 1}`)

// 点赞
const handleLike = useThrottleFn(async () => {
  if (!userStore.userInfo) {
    message.warning('请先登录')
    return
  }

  const id = props.list.id
  const { data } = await talk.likeTalk(id)
  if (data.value?.flag) {
    if (userStore.userInfo.talkLikeSet?.includes(id)) {
      likeCount.value--
      isLike.value = false
      message.warning('取消点赞！！')
    } else {
      likeCount.value++
      isLike.value = true
      message.success('点赞成功！！')
    }

    userStore.setLikeTalk(id)
  }
}, 600)

// 是否点赞
isLike.value = userStore.userInfo?.talkLikeSet?.includes(props.list.id) ?? false
</script>

<template>
  <div class="talk-item mb-7 flex">
    <div class="pt-1">
      <n-avatar
        class="cursor-pointer shadow-md transition-transform duration-500 hover:rotate-180"
        round
        size="large"
        :src="list.avatar"
      />
    </div>
    <div
      class="card shadow-light-shadow hover:shadow-light-shadow-hover dark:shadow-dark-shadow dark:hover:shadow-dark-shadow-hover relative ml-4 flex-1 rounded-md px-5 py-3 transition-shadow duration-300"
      :class="getRandomInt"
    >
      <!-- eslint-disable-next-line -->
      <div v-html="list.talkContent"></div>
      <img v-for="img in list.imgList" :key="img" :src="img" class="mt-1 rounded-md" alt="" />
      <div
        class="pt-10px mt-10px flex items-center justify-between border-t-[1px] border-dashed border-white text-sm"
      >
        <div>
          <Icon name="ph:moon-stars-thin" />
          <span class="ml-1">{{ createTime(list.createTime) }}</span>
        </div>
        <div class="flex">
          <div class="mr-2 flex cursor-pointer select-none items-center" @click="handleLike">
            <Icon v-if="isLike" name="solar:like-bold" class="text-blue-500" />
            <Icon v-else name="solar:like-broken" />
            <span class="ml-1">{{ likeCount }}</span>
          </div>
          <div class="flex cursor-pointer select-none items-center" @click="onToggleComment">
            <Icon name="uil:comment-dots" />
            <span class="ml-1">{{ list.commentCount }}</span>
          </div>
        </div>
      </div>
      <Comment v-if="showComment" :id="list.id" :type="3" />
    </div>
  </div>
</template>
