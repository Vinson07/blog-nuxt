<script setup lang="ts">
const props = defineProps({
  size: {
    type: [Number, String],
    default: 30
  },
  src: {
    type: String,
    default: ''
  }
})

const sizeStyle = computed(() => {
  const str = props.size + 'px'
  return {
    width: str,
    height: str
  }
})

const hasImgLoad = ref(false)
function handleError() {
  hasImgLoad.value = true
}
</script>

<template>
  <div :style="sizeStyle" class="cursor-pointer select-none rounded-full bg-slate-300">
    <img
      v-if="props.src && !hasImgLoad"
      class="rounded-full object-cover"
      :src="props.src"
      alt=""
      @error="handleError"
    />
    <img v-else src="~/assets/img/default-avatar.png" alt="" />
  </div>
</template>
