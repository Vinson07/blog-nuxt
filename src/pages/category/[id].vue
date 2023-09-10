<script setup lang="ts">
import type { ArticleCondition } from '@/types/article'

const imageStore = useImageStore()
const route = useRoute()
const router = useRouter()

const id = route.params.id
const articleList = ref<ArticleCondition[]>([])
const loadMore = ref(true)

const { category } = useApi()
const params = {
  categoryId: Number(id),
  current: 1,
  size: 10
}
const { data, pending, refresh } = await category.getCategoryArticleList(params)
watch(
  data,
  (category) => {
    if (category?.flag) {
      if (category.data.articleConditionVOList && category.data.articleConditionVOList.length > 0) {
        articleList.value = [...articleList.value, ...category.data.articleConditionVOList]
      } else {
        loadMore.value = false
      }
    }
  },
  { immediate: true }
)

useHead({
  title: `${data.value?.data.name ?? '文章分类'}`
})

function onInfinite() {
  if (!pending.value && loadMore.value) {
    params.current++
    refresh()
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
