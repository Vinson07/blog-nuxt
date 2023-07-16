<script setup lang="ts">
import { useMessage } from 'naive-ui'
import type { ArticleDetail } from '@/types/article'

const props = defineProps<ArticleDetail>()
const router = useRouter()
const userStore = useUserStore()
const message = useMessage()
const user = useUserStore()
const likeCount = ref(props.likeCount || 0)
const isLike = ref(false)

// 文章点赞
const likeActive = computed(() => isLike.value || user.userInfo.articleLikeSet?.includes(props.id))

const handleLike = useThrottleFn(async (id: number) => {
  if (!user.userInfo?.userInfoId) {
    message.warning('请先登录')
    return
  }
  const { article } = useApi()
  const { data } = await article.articleLike(id)
  if (data.value?.flag) {
    if (user.userInfo.articleLikeSet?.includes(id)) {
      likeCount.value--
      isLike.value = false
      message.warning('取消点赞！！')
    } else {
      likeCount.value++
      isLike.value = true
      message.success('点赞成功！！')
    }

    user.setArticleLike(id)
  }
}, 500)
</script>

<template>
  <main>
    <TheTopBgImg
      class="articlePattern"
      :bg-cover="articleCover"
      :title="articleTitle"
      :author="userStore.websiteConfig.websiteAuthor"
      :view="viewsCount"
      :time="createTime"
    />
    <div class="post-main relative mx-auto mt-4 max-w-[1140px]">
      <div class="relative rounded p-4 shadow-md dark:bg-neutral-800 xl:w-[820px]">
        <PostArticle :article-content="articleContent" />
        <div class="my-14 border-t border-b border-dashed py-5 text-sm text-zinc-500">
          <p class="cc-opacity flex items-center justify-center">
            <Icon name="bi:cc-circle" />
            <nuxt-link
              class="ml-1"
              to="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
              target="_blank"
            >
              知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议
            </nuxt-link>
          </p>
          <div class="mt-2 flex justify-between">
            <div class="tag flex items-center">
              <Icon name="fluent:tag-multiple-16-regular" size="16" />
              <span class="mx-1 cursor-pointer">{{ categoryName }}</span>
              <span v-for="tag in tagDTOList" :key="tag.id" class="mx-1 cursor-pointer">
                {{ tag.tagName }}
              </span>
            </div>
            <div id="needsharebutton-postbottom" class="flex">
              <Icon name="ci:share" class="btn mr-3 cursor-pointer" size="20" />
              <div
                class="reward-container flex select-none items-center"
                :class="{ 'text-blue-500': likeActive }"
                @click="handleLike(id)"
              >
                <Icon name="bx:bxs-like" class="cursor-pointer" size="20" />
                <span class="ml-1 text-sm">{{ likeCount }}</span>
              </div>
            </div>
          </div>
        </div>
        <post-toggle-post :last-article="lastArticle" :next-article="nextArticle" />
        <Comment :id="id" :type="1" />
      </div>
      <div class="absolute top-0 right-0 w-[300px] max-xl:hidden">
        <div
          v-if="recommendArticleList && recommendArticleList.length > 0"
          class="recommend mb-5 w-[inherit] rounded px-5 shadow-md dark:bg-neutral-800"
        >
          <div class="border-b py-4 font-medium dark:border-amber-300">推荐文章</div>
          <ul class="pb-1 text-sm">
            <li
              v-for="item in recommendArticleList"
              :key="item.id"
              class="my-3 cursor-pointer rounded py-1 px-2 hover:bg-gray-200 dark:hover:bg-indigo-500"
              @click="router.push(`/post/${item.id}`)"
            >
              <p>{{ item.articleTitle }}</p>
              <p class="pt-1 text-gray-400">
                <span>20点赞</span>
                <Icon name="bi:dot" />
                <span>10评论</span>
              </p>
            </li>
          </ul>
        </div>
        <PostToc />
      </div>
    </div>
  </main>
</template>
