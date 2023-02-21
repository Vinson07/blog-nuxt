<script setup lang="ts">
const year = '2022'
const title = `${year} 2023 Nuxt3`

const userStore = useUserStore()
userStore.setName('route')

const device = useDevice()
console.log(device.isMobile)

const { x, y } = useMouse()

const { $api } = useNuxtApp()
async function getData() {
  const { data } = await $api.mountain.getMountains()
  console.log(data.pageList, '#')
}
</script>

<template>
  <h1>index</h1>
  <div>{{ `${x} - ${y}` }}</div>
  <div>{{ userStore.name }}</div>
  <button @click="getData">getData</button>
  <div class="box bg-yellow-300">{{ title }}</div>
</template>

<style lang="less">
.box {
  width: 300px;
  height: 300px;
}
</style>
