<script setup lang="ts">
import type { ArticleDetail } from '@/types/article'

const route = useRoute()

const post = ref<ArticleDetail>({
  articleContent: '',
  articleCover: '',
  articleTitle: '',
  categoryId: 0,
  categoryName: '',
  createTime: '',
  id: 0,
  lastArticle: {
    articleCover: '',
    articleTitle: '',
    id: 0
  },
  likeCount: 0,
  newestArticleList: [],
  nextArticle: {
    articleCover: '',
    articleTitle: '',
    id: 0
  },
  originalUrl: '',
  recommendArticleList: [],
  tagDTOList: [],
  type: 0,
  updateTime: '',
  viewsCount: 0
})

const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
const { article } = useApi()
const { data } = await article.getArticleDetail(id)
if (data.value) {
  const { data: article } = data.value
  useHead({
    title: article.articleTitle,
    meta: [
      {
        name: 'description',
        content: article.categoryName
      }
    ]
  })
  post.value = article
}
</script>

<template>
  <Post v-bind="post" />
</template>
