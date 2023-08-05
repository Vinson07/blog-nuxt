<script setup lang="ts">
interface Props {
  size?: number
  src: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 30
})

console.log(props.src, '#')
// const hasImgLoad = ref(false)
// function handleError() {
//   hasImgLoad.value = true
// }
</script>

<template>
  <div class="cursor-pointer select-none rounded-full bg-slate-300">
    <img :width="size" :height="size" class="rounded-full object-cover" :src="src" alt="" />
    <!-- <img v-else :width="size" :height="size" src="~/assets/img/default-avatar.png" alt="" /> -->
  </div>
</template>
