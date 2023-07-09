<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
import type { ArticleDetail } from '@/types/article'
import { getArticleDetail } from '@/apis/article'

const route = useRoute()
const userStore = useUserStore()
const post = ref<ArticleDetail | null>(null)

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Vinson` : 'Vinson'
  }
})

try {
  const { data } = await getArticleDetail(route.params.id)
  if (data) post.value = data
} catch (error) {
  console.error(error)
}
</script>

<template>
  <div>
    <Head>
      <Title>{{ post?.articleTitle ?? '' }}</Title>
      <Meta name="description" :content="post?.categoryName ?? '个人博客'" />
    </Head>
    <TheTopBgImg
      class="articlePattern"
      type="article"
      :bg-cover="post?.articleCover"
      :title="post?.articleTitle"
      :author="userStore.websiteConfig.websiteAuthor"
      :view="post?.viewsCount"
      :time="post?.createTime"
    />
    <PostContent v-if="post" :article-detail="post" />
    <div v-else class="relative mx-auto mt-4 max-w-[1140px]">
      <n-skeleton text :repeat="5" />
      <n-skeleton text style="width: 90%" />
      <n-skeleton text style="width: 80%" />
      <n-skeleton text style="width: 70%" />
      <n-skeleton text style="width: 60%" />
      <n-skeleton text style="width: 50%" />
    </div>
  </div>
</template>
