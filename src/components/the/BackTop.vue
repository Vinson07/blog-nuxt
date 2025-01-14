<script setup lang="ts">
const { y } = useWindowScroll()

function handleTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div
    :style="{ top: y >= 1200 ? '0' : '-910px' }"
    class="back-top animate-bounce-slow transition-[top] duration-700 max-md:hidden"
  >
    <div
      class="back-to-top absolute bottom-0 h-[105px] w-full cursor-pointer select-none"
      @click="handleTop"
    ></div>
  </div>
</template>

<style scoped>
.back-top {
  width: 70px;
  /* height: 900px; */
  height: 750px;
  position: fixed;
  right: 25px;
  top: -910px;
  z-index: 40;
  background: url(~/assets/img/scroll.png) no-repeat center;
  background-size: contain;
  animation: bounce-slow 3s linear infinite;
  -webkit-animation: bounce-slow 3s linear infinite;
}
</style>
