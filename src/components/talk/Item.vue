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
    <div class="hidden pt-1 md:block">
      <n-avatar
        class="cursor-pointer shadow-md transition-transform duration-500 hover:rotate-180"
        round
        size="large"
        :src="list.avatar"
      />
    </div>
    <div
      class="card shadow-light-shadow hover:shadow-light-shadow-hover dark:shadow-dark-shadow dark:hover:shadow-dark-shadow-hover relative mx-4 flex-1 rounded-md px-5 py-3 transition-shadow duration-300"
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

<style scoped>
.talk-item .gradient1 {
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
}
.talk-item .card::before {
  @apply hidden md:inline-block;
  content: '';
  position: absolute;
  top: 5px;
  left: -20px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid transparent;
  border-right: 10px solid #f6d365;
}
.talk-item .gradient2 {
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}
.talk-item .card.gradient2::before {
  border-right: 10px solid #e0c3fc;
}
.talk-item .gradient3 {
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.talk-item .card.gradient3::before {
  border-right: 10px solid #667eea;
}
.talk-item .gradient4 {
  background-image: linear-gradient(-225deg, #ac32e4 0%, #7918f2 48%, #4801ff 100%);
}
.talk-item .card.gradient4::before {
  border-right: 10px solid #ac32e4;
}
.talk-item .gradient5 {
  background-image: linear-gradient(to top, #d9afd9 0%, #97d9e1 100%);
}
.talk-item .card.gradient5::before {
  border-right: 10px solid #97d9e1;
}
</style>
