<template>
  <div class="mb-10">
    <h3 class="h-title">
      <Icon name="zondicons:anchor" />
      <span class="ml-2">START:DASH!!</span>
    </h3>
    <div class="max-md:px-1 md:flex">
      <div class="nav-feature group max-md:hidden">
        <TheImage src="https://cdn.sakura520.co/images/20180325154208_GYwna.jpeg" />
        <div class="nav-feature__text">
          <h4 class="text-title">sakura</h4>
          <p class="text-tip">本站 WordPress 主题</p>
        </div>
      </div>
      <div class="nav-feature group max-md:hidden md:mx-2">
        <TheImage src="https://cdn.sakura520.co/images/20170416215602_iNAM4.jpeg" />
        <div class="nav-feature__text">
          <h4 class="text-title">sakura</h4>
          <p class="text-tip">本站 WordPress 主题</p>
        </div>
      </div>
      <div class="nav-feature group">
        <TheImage
          src="https://cdn.sakura520.co/images/38bf42ad37a6eba0b927e10e8d544ac498e9c4c0.jpeg"
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
  @apply relative h-40 flex-1 cursor-pointer overflow-hidden rounded-xl max-md:mb-3;
  &__img {
    @apply h-full w-full object-cover transition-transform duration-500 group-hover:scale-125;
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
