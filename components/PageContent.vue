<script setup lang="ts">
const nextPageLoad = ref(false)
function handleNextPage() {
  nextPageLoad.value = true
  setTimeout(() => {
    nextPageLoad.value = false
  }, 1000)
}
</script>

<template>
  <div class="mx-auto max-w-[800px]">
    <div class="mt-14 mb-10">
      <h3 class="h-title">
        <Icon name="zondicons:anchor" />
        <span class="ml-2">START:DASH!!</span>
      </h3>
      <div class="flex">
        <div class="nav-feature group">
          <img
            class="nav-feature__img"
            src="https://static.sakura520.co/config/274a3851ab099df4b062848dca18bf84.jpg"
          />
          <div class="nav-feature__text">
            <h4 class="text-title">sakura</h4>
            <p class="text-tip">本站 WordPress 主题</p>
          </div>
        </div>
        <div class="nav-feature group mx-1">
          <img
            class="nav-feature__img"
            src="https://static.sakura520.co/config/274a3851ab099df4b062848dca18bf84.jpg"
          />
          <div class="nav-feature__text">
            <h4 class="text-title">sakura</h4>
            <p class="text-tip">本站 WordPress 主题</p>
          </div>
        </div>
        <div class="nav-feature group">
          <img
            class="nav-feature__img"
            src="https://static.sakura520.co/config/274a3851ab099df4b062848dca18bf84.jpg"
          />
          <div class="nav-feature__text">
            <h4 class="text-title">sakura</h4>
            <p class="text-tip">本站 WordPress 主题</p>
          </div>
        </div>
      </div>
    </div>
    <main>
      <h3 class="h-title">
        <Icon name="entypo:leaf" />
        <span class="ml-2">Discovery</span>
      </h3>
      <ul class="post">
        <li class="post__list">
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
              <p class="content-text">
                一直以来，习惯在 flex 布局中使用 gap 这个属性设置间距，一直以来也都是在最新的 Chrome
                上调试，所以从来没有想在 flex gap 在其他一直以来，习惯在 flex 布局中使用 gap
                这个属性设置间距，一直以来也都是在最新的 Chrome 上调试，所以从来没有想在 flex gap
                在其他
              </p>
            </div>
            <div class="content-ellipsis">
              <Icon name="ion:ellipsis-horizontal" size="26" color="#4b5563" />
            </div>
          </div>
        </li>
        <li class="post__list active">
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
              <p class="content-text">
                一直以来，习惯在 flex 布局中使用 gap 这个属性设置间距，一直以来也都是在最新的 Chrome
                上调试，所以从来没有想在 flex gap 在其他一直以来，习惯在 flex 布局中使用 gap
                这个属性设置间距，一直以来也都是在最新的 Chrome 上调试，所以从来没有想在 flex gap
                在其他
              </p>
            </div>
            <div class="content-ellipsis">
              <Icon name="ion:ellipsis-horizontal" size="26" color="#4b5563" />
            </div>
          </div>
        </li>
      </ul>
      <div class="text-center">
        <button v-if="!nextPageLoad" class="next-page" @click="handleNextPage">Previous</button>
        <img
          v-else
          src="~/assets/img/svg/wordpress-rotating-ball-o.svg"
          class="mx-auto w-11"
          alt=""
        />
      </div>
    </main>
  </div>
</template>

<style lang="less">
.h-title {
  @apply mb-8 flex items-center border-b border-dashed border-gray-300 py-2 text-base font-normal;
}

.nav-feature {
  @apply relative h-40 flex-1 overflow-hidden rounded-xl;
  &__img {
    @apply h-full w-full transition-transform duration-500 group-hover:scale-125;
  }
  &__text {
    @apply absolute top-0 left-0 right-0 bottom-0 text-center transition-colors duration-1000 hover:bg-[rgba(0,0,0,.5)];
    .text-title {
      @apply mt-7 mb-5 -translate-x-full bg-zinc-900 py-3 text-lg uppercase text-white transition-transform duration-500 group-hover:translate-x-0;
    }
    .text-tip {
      @apply translate-x-full text-xs italic text-gray-400 transition-transform duration-500 group-hover:translate-x-0;
    }
  }
}

.post {
  &__list {
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
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        // height: 67.5px;
        overflow: hidden;
      }
      .content-ellipsis {
        @apply flex justify-end;
      }
    }
  }
}

.next-page {
  @apply rounded-full border px-9 py-3 text-gray-400 hover:border-amber-500 hover:text-amber-500;
  &:hover {
    box-shadow: 0 0 4px rgb(255 165 0 0.85);
  }
}
</style>
