<script setup lang="ts">
import type { ArticleDetail } from '@/types/article'
import { getArticleDetail } from '@/apis/article'

const route = useRoute()
const userStore = useUserStore()
const post = ref<ArticleDetail>()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}-Vinson` : 'Vinson'
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
  <div v-if="post">
    <Head>
      <Title>{{ post?.articleTitle ?? '' }}</Title>
      <Meta name="description" :content="post?.categoryName ?? '个人博客'" />
    </Head>
    <PostPattern
      class="articlePattern"
      :img-src="post.articleCover"
      :title="post.articleTitle"
      :time="post.createTime"
      :author="userStore.websiteConfig.websiteAuthor"
      :view="post.viewsCount"
      :update-time="post.updateTime"
    />
    <PostContent :article-detail="post" />
  </div>
</template>
