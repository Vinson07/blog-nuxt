<script setup lang="ts">
const imageStore = useImageStore()
const router = useRouter()

const { category } = useApi()
useHead({
  title: '文章分类-Vinson'
})

const option = reactive({
  title: {
    text: '文章分类统计图🎉',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    top: 'bottom'
  },
  series: [
    {
      name: '分类统计',
      type: 'pie',
      radius: [35, 130],
      center: ['50%', '47%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 6
      },
      data: [] as {
        value: number
        name: string
      }[]
    }
  ]
})

const { data } = await category.getCategoryList()
if (data.value?.data) {
  const optionData = data.value.data.map((item) => {
    return {
      value: item.articleCount,
      name: item.categoryName
    }
  })

  setTimeout(() => {
    option.series[0].data = optionData
  }, 300)
}

const getRandomColor = () =>
  imageStore.colors[Math.floor(Math.random() * imageStore.colors.length + 1)]
</script>

<template>
  <div>
    <ThePageBanner :bg-cover="imageStore.pageList.category" title="文章分类" />
    <BaseBox class="mx-auto my-5 max-w-4xl">
      <ul class="flex flex-wrap text-base text-slate-700">
        <li
          v-for="item in data?.data"
          :key="item.id"
          class="m-1 cursor-pointer rounded-md py-2 px-5 shadow-md hover:bg-gradient-to-r hover:from-sky-500 hover:to-indigo-500 hover:text-white"
          :style="{ backgroundColor: getRandomColor() }"
          @click="router.push(`/category/${item.id}`)"
        >
          <span>{{ item.categoryName }}</span>
          <span class="ml-1">{{ item.articleCount }}</span>
        </li>
      </ul>
    </BaseBox>
    <BaseBox class="mx-auto max-w-4xl">
      <BaseEcharts :options="option" />
    </BaseBox>
  </div>
</template>
