<script setup lang="ts">
import type { ArticleCondition } from '@/types/article'

const imageStore = useImageStore()
const route = useRoute()
const router = useRouter()

const id = route.params.id
const articleList = ref<ArticleCondition[]>([])
let isLoad = true

const { category } = useApi()
const params = {
  categoryId: Number(id),
  current: 1,
  size: 10
}
const { data, pending, execute } = await category.getCategoryArticleList(params)

if (data.value?.flag) {
  articleList.value = data.value.data.articleConditionVOList
}

useHead({
  title: `${data.value?.data.name ?? '文章分类'}`
})

async function onInfinite() {
  if (!pending.value && isLoad) {
    params.current++
    await execute()
    if (data.value?.flag) {
      const list = data.value.data.articleConditionVOList
      if (list && list.length > 0) {
        articleList.value = [...articleList.value, ...list]
      } else {
        isLoad = false
      }
    }
  }
}
</script>

<template>
  <div>
    <ThePageBanner
      :bg-cover="imageStore.pageList.category"
      :title="data?.data.name ?? '文章分类'"
    />
    <BaseBox class="mx-auto mt-5 max-w-4xl animate-[slideUpIn_1s]">
      <ul class="pt-4">
        <li v-for="item in articleList" :key="item.id" class="mb-4 flex items-center">
          <TheImage
            style="width: 151px; height: 80px"
            class="rounded-xl"
            :src="item.articleCover"
            @click="router.push(`/post/${item.id}`)"
          />
          <div class="pl-3">
            <h4
              class="cursor-pointer text-lg font-bold hover:text-orange-500 hover:dark:text-indigo-500"
              @click="router.push(`/post/${item.id}`)"
            >
              {{ item.articleTitle }}
            </h4>
            <p class="mt-2 text-base">
              <span v-for="tag in item.tagVOList" :key="tag.id" class="mx-1">
                <i class="text-neutral-400">#</i>
                {{ tag.tagName }}
              </span>
            </p>
          </div>
        </li>
      </ul>
      <BaseInfiniteScroll :distance="250" class="text-center" @infinite="onInfinite">
        <Icon v-show="pending" name="eos-icons:bubble-loading" class="text-3xl" />
      </BaseInfiniteScroll>
    </BaseBox>
  </div>
</template>
