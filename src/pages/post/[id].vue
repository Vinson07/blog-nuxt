<script setup lang="ts">
import { useMessage } from 'naive-ui'

const route = useRoute()
const userStore = useUserStore()
const blogStore = useBlogStore()
const message = useMessage()

const likeCount = ref(0)
const isLike = ref(false)

const id = +route.params.id
const { article } = useApi()

// 获取文章详情
const { data: articleInfo, pending } = await article.getArticle(id, { lazy: true })
if (articleInfo.value?.flag) {
  useHead({
    title: `${articleInfo.value.data.articleTitle}`
  })
  likeCount.value = articleInfo.value.data.likeCount
}

// 获取推荐文章
const { data: articleRecommend } = await article.getArticleRecommend({ lazy: true })

// 文章点赞
const handleLike = useThrottleFn(async (id: number) => {
  if (!userStore.userInfo) {
    message.warning('请先登录')
    return
  }
  const { data } = await article.likeArticle(id)
  if (data.value?.flag) {
    if (userStore.userInfo.articleLikeSet?.includes(id)) {
      likeCount.value--
      isLike.value = false
      message.warning('取消点赞！！')
    } else {
      likeCount.value++
      isLike.value = true
      message.success('点赞成功！！')
    }

    userStore.setLikeArticle(id)
  }
}, 500)

onMounted(() => {
  isLike.value = userStore.userInfo?.articleLikeSet?.includes(id) ?? false
})
</script>

<template>
  <main>
    <template v-if="articleInfo?.flag">
      <TheArticleBanner
        class="articlePattern"
        :bg-cover="articleInfo.data.articleCover"
        :title="articleInfo.data.articleTitle"
        :author="blogStore.siteConfig?.siteAuthor ?? ''"
        :view="articleInfo.data.viewCount"
        :time="articleInfo.data.createTime"
      />
      <div class="post-main relative mx-auto mt-4 max-w-[1140px] animate-[slideUpIn_1s]">
        <BaseBox class="relative xl:w-[820px]">
          <PostArticle :article-content="articleInfo.data.articleContent" />
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
                <!-- <span class="mx-1 cursor-pointer">
                    {{ articleInfo.data.category.categoryName }}
                  </span> -->
                <span
                  v-for="tag in articleInfo.data.tagVOList"
                  :key="tag.id"
                  class="mx-1 cursor-pointer"
                >
                  {{ tag.tagName }}
                </span>
              </div>
              <div id="needsharebutton-postbottom" class="flex">
                <Icon name="ci:share" class="btn mr-3 cursor-pointer" size="20" />
                <div
                  class="reward-container flex select-none items-center"
                  :class="{ 'text-blue-500': isLike }"
                  @click="handleLike(id)"
                >
                  <Icon name="bx:bxs-like" class="cursor-pointer" size="20" />
                  <span class="ml-1 text-sm">{{ likeCount }}</span>
                </div>
              </div>
            </div>
          </div>
          <post-toggle-post
            class="mb-5"
            :last-article="articleInfo.data.lastArticle"
            :next-article="articleInfo.data.nextArticle"
          />
          <Comment :id="id" :type="1" />
        </BaseBox>
        <div class="absolute top-0 right-0 h-full w-[300px] max-xl:hidden">
          <PostRecommend :list="articleRecommend?.data ?? null" />
          <PostToc2 />
        </div>
      </div>
    </template>
    <BaseLoading v-else-if="pending" />
    <div v-else class="flex h-screen items-center justify-center text-lg">暂无数据</div>
  </main>
</template>
