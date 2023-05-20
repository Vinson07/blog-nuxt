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

const createTime = computed(() => (time: string) => useDateFormat(time, 'YYYY-MM-DD').value)
</script>

<template>
  <li
    class="post__list bg-[rgba(255,255,255,0.9)] shadow-[0_1px_30px_-4px_#e8e8e8] md:h-[300px]"
    :class="{ active: active }"
  >
    <div class="post__list__img md:flex-[1.4]">
      <the-image :src="item.articleCover" />
    </div>
    <div class="post__list__content" @click="router.push(`/post/${item.id}`)">
      <div class="content-time">
        <Icon name="mingcute:time-fill" size="18" class="pr-1" />
        发布于 {{ createTime(item.createTime) }}
      </div>
      <h4 class="content-title">
        {{ item.articleTitle }}
      </h4>
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
      <div class="py-3">
        <p class="content-text multiline-ellipsis">{{ $markdownItContent(item.articleContent) }}</p>
      </div>
      <div class="content-ellipsis">
        <Icon name="ion:ellipsis-horizontal" size="26" />
      </div>
    </div>
  </li>
</template>

<style lang="less">
.post__list {
  @apply mb-10 overflow-hidden rounded-lg transition-shadow duration-500 hover:shadow-[0_1px_20px_10px_#e8e8e8] dark:bg-[rgba(51,51,51,0.7)] dark:shadow-[0_1px_35px_-8px_rgba(26,26,26,0.6)] dark:hover:shadow-[0_1px_20px_0px_rgb(99,102,241)] md:flex;
  &.active {
    @apply flex-row-reverse;
    .post__list__content {
      @apply text-left;
      // .content-time {
      //   @apply justify-start;
      // }
      .content-info {
        @apply justify-start;
      }
      .content-ellipsis {
        @apply justify-start;
      }
    }
  }
  &__img {
    @apply overflow-hidden max-md:h-64;
    img {
      @apply transition-transform duration-500 hover:rotate-12 hover:scale-125;
    }
  }
  &__content {
    @apply px-8 pt-5 text-right md:flex-1;
    .content-time {
      @apply flex w-max items-center rounded-md bg-[#fccd0026] py-1 px-2 text-xs text-orange-500 dark:bg-[#333333] dark:text-[#888];
    }
    .content-title {
      @apply my-6 cursor-pointer text-xl hover:text-orange-500 hover:dark:text-indigo-500;
    }
    .content-info {
      @apply flex justify-end text-xs;
    }
    .info-item {
      @apply mr-4 flex items-center;
      svg {
        @apply text-orange-500 dark:text-[#888];
      }
    }
    .content-ellipsis {
      @apply flex justify-end max-md:hidden;
    }
  }
}
</style>
