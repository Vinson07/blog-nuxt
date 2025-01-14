<script setup lang="ts">
// 引入 vue-echarts 组件
import VChart from 'vue-echarts'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import { use } from 'echarts/core'
// 引入 CanvasRenderer 或者 SVGRenderer 是，这必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 引入饼图
import { PieChart } from 'echarts/charts'
// 按需引入组件
import { LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'

import type { OptionData } from '@/types/category'

// 注册引入的组件
use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

interface Props {
  width?: string
  height?: string
  optionData: OptionData[]
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '400px'
})

// 主题切换
const color = useColorMode()

const option = {
  backgroundColor: color.value === 'dark' ? '#262626' : '#fff',
  title: {
    text: '文章分类统计图',
    subtext: '',
    left: 'center'
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
      data: props.optionData
    }
  ]
}

// 切换背景
const theme = computed(() => color.value)
watch(theme, (val) => {
  if (val === 'dark') {
    option.backgroundColor = '#262626'
  } else {
    option.backgroundColor = '#fff'
  }
})
</script>

<template>
  <!-- 客户端组件 -->
  <ClientOnly fallback-tag="div" fallback="Loading...">
    <VChart
      class="chart"
      :option="option"
      :update-options="{ notMerge: true, lazyUpdate: true }"
      :theme="color.value"
      autoresize
      :style="{ width, height }"
    />
  </ClientOnly>
</template>
