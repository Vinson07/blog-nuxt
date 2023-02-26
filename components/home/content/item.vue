<script setup lang="ts">
const router = useRouter()
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const { active } = toRefs(props)
</script>

<template>
  <li class="post__list" :class="{ active: active }" @click="router.push({ path: '/post/1' })">
    <div class="post__list__img">
      <img
        class="h-full w-full object-cover"
        src="https://2heng.xin/wp-content/uploads//2021/07/20210729_025259-1024x877.jpg"
      />
    </div>
    <div class="post__list__content">
      <div class="content-time">
        <Icon name="mingcute:time-fill" size="18" class="pr-1" />
        发布于 2021-07-30
      </div>
      <h4 class="content-title">基于 SCSS mixin 的 flex gap polyfill</h4>
      <div class="content-info">
        <p class="info-item">
          <Icon name="mdi:eye" size="16" />
          <span class="ml-1">18,105 热度</span>
        </p>
        <p class="info-item">
          <Icon name="fe:comment" size="16" />
          <span class="ml-1">49 条评论</span>
        </p>
        <p class="info-item">
          <Icon name="material-symbols:files" size="16" />
          <span class="ml-1">碎碎念</span>
        </p>
      </div>
      <div class="py-7">
        <p class="content-text multiline-ellipsis">
          一直以来，习惯在 flex 布局中使用 gap 这个属性设置间距，一直以来也都是在最新的 Chrome
          上调试，所以从来没有想在 flex gap 在其他一直以来，习惯在 flex 布局中使用 gap
          这个属性设置间距，一直以来也都是在最新的 Chrome 上调试，所以从来没有想在 flex gap 在其他
        </p>
      </div>
      <div class="content-ellipsis">
        <Icon name="ion:ellipsis-horizontal" size="26" color="#4b5563" />
      </div>
    </div>
  </li>
</template>

<style lang="less">
.post__list {
  @apply mb-10 flex h-80 cursor-pointer overflow-hidden rounded-2xl;
  &.active {
    @apply flex-row-reverse;
    .content-ellipsis {
      @apply justify-start;
    }
  }
  box-shadow: 0 1px 20px -6px rgb(0 0 0 0.5);
  &__img {
    @apply flex-1 overflow-hidden;
    img {
      @apply transition-transform duration-500 hover:rotate-12 hover:scale-125;
    }
  }
  &__content {
    @apply flex-1 px-8 pt-5;
    .content-time {
      @apply flex items-center text-xs text-gray-400;
    }
    .content-title {
      @apply py-6 text-xl text-gray-600;
    }
    .content-info {
      @apply flex text-xs text-gray-400;
    }
    .info-item {
      @apply mr-4 flex items-center;
    }
    .content-text {
      @apply text-gray-600;
    }
    .content-ellipsis {
      @apply flex justify-end;
    }
  }
}
</style>
