<template>
  <div class="mb-10">
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
</template>

<style lang="less">
.nav-feature {
  @apply relative h-40 flex-1 cursor-pointer overflow-hidden rounded-xl;
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
</style>
