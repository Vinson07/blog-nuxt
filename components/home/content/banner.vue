<template>
  <div class="mb-10">
    <h3 class="h-title">
      <Icon name="zondicons:anchor" />
      <span class="ml-2">START:DASH!!</span>
    </h3>
    <div class="flex">
      <div class="nav-feature group">
        <nuxt-link target="_blank" to="https://music.sakura520.co/">
          <TheImage src="https://cdn.sakura520.co/images/20180325154208_GYwna.jpeg" />
          <div class="nav-feature__text">
            <h4 class="text-title bg-[rgba(255,255,255,0.4)]">Web音乐播放器</h4>
            <p class="text-tip">高颜值的第三方网易云播放器</p>
          </div>
        </nuxt-link>
      </div>
      <div class="nav-feature group mx-2">
        <nuxt-link target="_blank" to="">
          <TheImage src="https://cdn.sakura520.co/images/20170416215602_iNAM4.jpeg" />
          <div class="nav-feature__text">
            <h4 class="text-title bg-[rgba(255,255,255,0.4)]">sakura</h4>
            <p class="text-tip">本站 Sakura 主题</p>
          </div>
        </nuxt-link>
      </div>
      <div class="nav-feature group">
        <nuxt-link target="_blank" to="">
          <TheImage
            src="https://cdn.sakura520.co/images/38bf42ad37a6eba0b927e10e8d544ac498e9c4c0.jpeg"
          />
          <div class="nav-feature__text">
            <h4 class="text-title bg-[rgba(255,255,255,0.4)]">sakura</h4>
            <p class="text-tip">本站 Sakura 主题</p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.nav-feature {
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  @apply relative h-40 flex-1 cursor-pointer overflow-hidden rounded-xl;
  &__img {
    @apply h-full w-full object-cover transition-transform duration-500 group-hover:scale-125;
  }
  &__text {
    @apply absolute top-0 left-0 right-0 bottom-0 text-center transition-colors duration-1000 hover:bg-[rgba(255,255,255,0.4)] dark:hover:bg-[rgba(51,51,51,0.7)];
    .text-title {
      @apply mt-7 mb-5 -translate-x-full py-3 text-lg uppercase text-[#505050] transition-transform duration-500 group-hover:translate-x-0 dark:bg-[rgb(0,0,0,0.2)] dark:text-[#CCCCCC];
    }
    .text-tip {
      @apply translate-x-full text-xs italic text-[#505050] transition-transform duration-500 group-hover:translate-x-0 dark:text-[#CCCCCC];
    }
  }
}
</style>
