<template>
  <svg
    class="waves"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 24 150 28"
    preserveAspectRatio="none"
    shape-rendering="auto"
  >
    <!--形状容器-->
    <defs>
      <path
        id="gentle-wave"
        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
      ></path>
    </defs>
    <!--组合波浪-->
    <g class="parallax">
      <use
        class="use fill-[rgba(253,253,253,0.7)] dark:fill-[rgba(34,34,34,0.7)]"
        xlink:href="#gentle-wave"
        x="48"
        y="0"
      ></use>
      <use
        class="use fill-[rgba(253,253,253,0.5)] dark:fill-[rgba(34,34,34,0.5)]"
        xlink:href="#gentle-wave"
        x="48"
        y="3"
      ></use>
      <use
        class="use fill-[rgba(253,253,253,0.3)] dark:fill-[rgba(34,34,34,0.3)]"
        xlink:href="#gentle-wave"
        x="48"
        y="5"
      ></use>
      <use
        class="use fill-[#fdfdfd] dark:fill-[#21252b]"
        xlink:href="#gentle-wave"
        x="48"
        y="7"
      ></use>
    </g>
  </svg>
</template>

<style scoped>
.waves {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 12vh;
  min-height: 3.125rem;
  max-height: 9.375rem;
  /* z-index: 1; */
  transition: all 0.6s;
}
.waves .parallax .use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.waves .parallax .use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.waves .parallax .use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.waves .parallax .use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.waves .parallax .use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@media (max-width: 768px) {
  .waves {
    height: 10vh;
    min-height: 10vh;
  }
}
</style>
