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
  <div>
    <HomeBackground />
    <div class="page-content mx-auto max-w-[800px] pt-14">
      <HomeContentBanner />
      <main>
        <h3 class="h-title">
          <Icon name="entypo:leaf" />
          <span class="ml-2">Discovery</span>
        </h3>
        <ul class="post">
          <HomeContentItem />
          <HomeContentItem :active="true" />
        </ul>
        <div class="text-center">
          <button v-if="!nextPageLoad" class="next-page" @click="handleNextPage">Previous</button>
          <img
            v-else
            src="~/assets/img/svg/wordpress-rotating-ball-o.svg"
            class="mx-auto w-11 py-3"
            alt=""
          />
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="less">
.h-title {
  @apply mb-8 flex items-center border-b border-dashed border-gray-300 py-2 text-base font-normal;
}

.next-page {
  @apply rounded-full border px-9 py-3 text-gray-400 hover:border-amber-500 hover:text-amber-500 hover:shadow-[0_0_4px_rgba(0,0,0,0.3)] hover:shadow-orange-400;
  // &:hover {
  //   box-shadow: 0 0 4px rgb(255 165 0 0.85);
  // }
}
</style>
