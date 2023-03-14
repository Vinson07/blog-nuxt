<script setup lang="ts">
import { NAvatar, NImage } from 'naive-ui'
</script>

<template>
  <div class="group/img relative m-1 h-36 w-64 overflow-hidden rounded-md">
    <n-image src="https://cdn.sakura520.co/images/20180325154208_GYwna.jpeg" />
    <div class="link-mask transition-[top]">
      <div class="text-center">
        <n-avatar
          round
          :size="70"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <h4>Hexo</h4>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.link-mask {
  @apply absolute top-0 left-0 flex h-full w-full items-center justify-center duration-500 group-hover/img:-top-full;
  // background: linear-gradient(
  //   to bottom,
  //   rgba(255, 255, 255, 0.7) 60%,
  //   rgba(255, 255, 255, 0.9) 40%
  // );
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.8) 40%);
}
</style>
