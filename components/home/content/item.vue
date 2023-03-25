<script setup lang="ts">
const router = useRouter()
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  item: {
    type: Object,
    default: () => {}
  }
})

const { active, item } = toRefs(props)
const { $markdownItContent } = useNuxtApp()
</script>

<template>
  <li class="post__list" :class="{ active: active }" @click="router.push(`/post/${item.id}`)">
    <div class="post__list__img">
      <TheImage :src="item.articleCover" />
    </div>
    <div class="post__list__content">
      <div class="content-time">
        <Icon name="mingcute:time-fill" size="18" class="pr-1" />
        发布于 {{ item.createTime }}
      </div>
      <h4 class="content-title">{{ item.articleTitle }}</h4>
      <div class="content-info">
        <p class="info-item">
          <Icon name="mdi:eye" size="16" />
          <span class="ml-1">181 热度</span>
        </p>
        <p class="info-item">
          <Icon name="fe:comment" size="16" />
          <span class="ml-1">4 条评论</span>
        </p>
        <p class="info-item">
          <Icon name="material-symbols:files" size="16" />
          <span class="ml-1">{{ item.categoryName }}</span>
        </p>
      </div>
      <div class="py-7">
        <p class="content-text multiline-ellipsis">{{ $markdownItContent(item.articleContent) }}</p>
      </div>
      <div class="content-ellipsis">
        <Icon
          name="ion:ellipsis-horizontal"
          size="26"
          class="text-[#4b5563] dark:text-neutral-400"
        />
      </div>
    </div>
  </li>
</template>

<style lang="less">
.post__list {
  @apply mb-10 cursor-pointer overflow-hidden rounded-2xl dark:hover:shadow-lg dark:hover:shadow-indigo-500/50 md:flex md:h-80;
  &.active {
    @apply flex-row-reverse;
    .content-ellipsis {
      @apply justify-start;
    }
  }
  box-shadow: 0 1px 20px -6px rgb(0 0 0 0.5);
  &__img {
    @apply overflow-hidden max-md:h-64 md:flex-1;
    img {
      @apply transition-transform duration-500 hover:rotate-12 hover:scale-125;
    }
  }
  &__content {
    @apply px-8 pt-5 md:flex-1;
    .content-time {
      @apply flex items-center text-xs text-gray-400 dark:text-neutral-500;
    }
    .content-title {
      @apply py-6 text-xl text-gray-600 dark:text-neutral-400;
    }
    .content-info {
      @apply flex text-xs text-gray-400 dark:text-neutral-500;
    }
    .info-item {
      @apply mr-4 flex items-center;
    }
    .content-text {
      @apply text-gray-600 dark:text-neutral-400;
    }
    .content-ellipsis {
      @apply flex justify-end;
    }
  }
}
</style>
