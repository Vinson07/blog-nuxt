<script setup lang="ts">
import { getArticleDetail } from '@/apis/article'
import type { ArticleDetail } from '@/types/article'

const route = useRoute()
const userStore = useUserStore()
const post = ref<ArticleDetail>()

try {
  const { code, data } = await getArticleDetail(route.params.id)
  if (code === 20000) {
    post.value = data
  }
} catch (error) {}
</script>

<template>
  <div>
    <PostPattern
      :img-src="post?.articleCover"
      :title="post?.articleTitle"
      :time="post?.createTime"
      :author="userStore.websiteConfig.websiteAuthor"
      :view="post?.viewsCount"
    />
    <PostContent :post="post" />
  </div>
</template>
