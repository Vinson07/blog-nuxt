<script setup lang="ts">
import type { OptionData } from '@/types/category'

const imageStore = useImageStore()
const router = useRouter()

const { category } = useApi()

useHead({
  title: '文章分类'
})

const optionData = ref<OptionData[]>([])

const { data } = await category.getCategoryList()
if (data.value?.data) {
  optionData.value = data.value.data.map((item) => {
    return {
      value: item.articleCount,
      name: item.categoryName
    }
  })
}

const getRandomColor = () => imageStore.colors[Math.floor(Math.random() * imageStore.colors.length)]
</script>

<template>
  <div>
    <ThePageBanner :bg-cover="imageStore.pageList.category" title="文章分类" />
    <div class="mx-auto my-5 max-w-4xl animate-[slideUpIn_1s]">
      <BaseBox>
        <ul class="flex flex-wrap justify-center text-base text-slate-700">
          <li
            v-for="item in data?.data"
            :key="item.id"
            class="m-10px group cursor-pointer rounded-md py-2 px-5 shadow-md hover:bg-gradient-to-r hover:from-sky-500 hover:to-indigo-500 hover:text-white"
            :style="{ backgroundColor: getRandomColor() }"
            @click="router.push(`/category/${item.id}`)"
          >
            <span>{{ item.categoryName }}</span>
            <span class="text-v-hc dark:text-v-hc-dark ml-1 group-hover:text-white">
              {{ item.articleCount }}
            </span>
          </li>
        </ul>
      </BaseBox>
      <BaseBox class="mt-5">
        <BaseEcharts :option-data="optionData" />
      </BaseBox>
    </div>
  </div>
</template>
