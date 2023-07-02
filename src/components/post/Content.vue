<script setup lang="ts">
import type { ArticleDetail } from '@/types/article'

interface Props {
  articleDetail: ArticleDetail
}

defineProps<Props>()

const router = useRouter()
</script>

<template>
  <main class="post-main relative mx-auto mt-4 max-w-[1140px]">
    <div class="relative rounded p-4 shadow-md dark:bg-neutral-800 xl:w-[820px]">
      <PostArticle :article-content="articleDetail.articleContent" />
      <div class="my-14 border-t border-b border-dashed py-5 text-sm text-zinc-500">
        <p class="flex items-center justify-center">
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
            <span class="mx-1 cursor-pointer">{{ articleDetail.categoryName }}</span>
            <span v-for="tag in articleDetail.tagDTOList" :key="tag.id" class="mx-1 cursor-pointer">
              {{ tag.tagName }}
            </span>
          </div>
          <div class="flex">
            <Icon name="ci:share" class="mr-3 cursor-pointer" size="20" />
            <div class="flex items-center">
              <Icon
                name="bx:bxs-like"
                class="cursor-pointer"
                :class="{ 'text-red-600': false }"
                size="20"
              />
              <span class="ml-1 text-sm">{{ articleDetail.likeCount || 0 }}</span>
            </div>
          </div>
        </div>
      </div>
      <post-toggle-post
        :last-article="articleDetail.lastArticle"
        :next-article="articleDetail.nextArticle"
      />
      <!-- <post-comment /> -->
      <Comment :id="articleDetail.id" :type="1" />
    </div>
    <div class="absolute top-0 right-0 w-[300px] max-xl:hidden">
      <div
        v-if="articleDetail.recommendArticleList && articleDetail.recommendArticleList.length > 0"
        class="recommend mb-5 w-[inherit] rounded px-5 shadow-md dark:bg-neutral-800"
      >
        <div class="border-b py-4 font-medium dark:border-amber-300">推荐文章</div>
        <ul class="pb-1 text-sm">
          <li
            v-for="item in articleDetail.recommendArticleList"
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
  </main>
</template>
