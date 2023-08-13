<script setup lang="ts">
import type { ArticleRecommend } from '@/types/article'

defineProps<{ list: ArticleRecommend[] | null }>()

const router = useRouter()
</script>

<template>
  <BaseBox v-if="list && list.length > 0" class="recommend mb-5 w-[inherit]">
    <div class="border-b pb-4 text-base font-medium dark:border-amber-300">推荐文章</div>
    <ul class="pb-1 text-sm">
      <li
        v-for="item in list"
        :key="item.id"
        class="text-15 mt-3 cursor-pointer rounded py-1 px-2 hover:bg-gray-200 dark:hover:bg-indigo-500"
        @click="router.push(`/post/${item.id}`)"
      >
        <p>{{ item.articleTitle }}</p>
        <p class="text-gray-400">
          <span>20点赞</span>
          <Icon name="bi:dot" />
          <span>10评论</span>
        </p>
      </li>
    </ul>
  </BaseBox>
</template>
