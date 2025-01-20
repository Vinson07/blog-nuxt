<script setup lang="ts">
interface Props {
  starsCount?: number
  distance?: number
}

const props = withDefaults(defineProps<Props>(), {
  starsCount: 800,
  distance: 800
})

// 星星实体
const starRef = ref<HTMLDivElement[] | null>(null)

onMounted(() => {
  const starArr = starRef.value
  if (!starArr) return

  starArr.forEach((item) => {
    const speed = 0.1 + Math.random() * 1
    const thisDistance = props.distance + Math.random() * 300
    item.style.transformOrigin = `0 0 ${thisDistance}px`
    item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${
      Math.random() * 360
    }deg) rotateX(${Math.random() * -50}deg) scale(${speed},${speed})`
  })
})
</script>

<template>
  <div class="starry-sky-bg">
    <div class="stars">
      <div v-for="item in starsCount" :key="item" ref="starRef" class="star"></div>
    </div>
  </div>
</template>

<style scoped>
.starry-sky-bg {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;
}

@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
  }
}

.stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: fixed;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotate 66s infinite linear;
  bottom: 0;
  z-index: -99;
}

.star {
  width: 2px;
  height: 2px;
  background: #f7f7b8;
  position: fixed;
  top: 0px;
  left: 0;
  backface-visibility: hidden;
}
</style>
