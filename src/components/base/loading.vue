<script setup lang="ts"></script>

<template>
  <div id="loading">
    <div class="mg-loading"></div>
  </div>
</template>

<style scoped>
#loading {
  @apply bg-v-background dark:bg-v-background-dark;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: #f9f9f9; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.mg-loading {
  position: relative;
  width: 50px;
  perspective: 200px;
}

.mg-loading:after,
.mg-loading:before {
  position: absolute;
  width: 20px;
  height: 20px;
  content: '';
  -webkit-animation: jumping 0.5s infinite alternate;
  animation: jumping 0.5s infinite alternate;
  background: transparent;
}

.mg-loading:before {
  left: 0;
}

.mg-loading:after {
  right: 0;
  -webkit-animation-delay: 0.15s;
  animation-delay: 0.15s;
}
</style>
