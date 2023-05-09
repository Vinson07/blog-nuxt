<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { getArticleDetail } from '@/apis/article'
import type { ArticleDetail } from '@/types/article'

const route = useRoute()
const userStore = useUserStore()
const post = ref<ArticleDetail>()
const message = useMessage()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Vinson` : 'Vinson'
  }
})

try {
  const { code, data, message: msg } = await getArticleDetail(route.params.id)
  if (code === 20000) {
    post.value = data
  } else {
    message.warning(msg)
  }
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
    <post-pattern
      v-if="post"
      :img-src="post.articleCover"
      :title="post.articleTitle"
      :time="post.createTime"
      :author="userStore.websiteConfig.websiteAuthor"
      :view="post.viewsCount"
      :update-time="post.updateTime"
    />
    <post-content v-if="post" :post="post" />
  </div>
</template>
