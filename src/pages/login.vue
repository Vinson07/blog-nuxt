<script setup lang="ts">
definePageMeta({
  layout: 'no-bottom'
})
useHead({
  title: '登录-Vinson',
  meta: [
    {
      name: 'description',
      content: `vinson，Vinson个人博客，知识库，登录`
    },
    { name: 'keywords', content: `博客，前端，登录` }
  ]
})

const imageStore = useImageStore()

const typeForm = ref('login')

const handleToggleForm = (type: string) => {
  typeForm.value = type
}
</script>

<template>
  <client-only>
    <div
      class="login flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${imageStore.pageList.login})` }"
    >
      <div
        class="box relative w-96 overflow-hidden rounded-3xl border-2 border-solid border-white bg-[hsla(0,0%,10%,0.1)] py-10 px-6 backdrop-blur max-md:mx-4 max-md:w-full"
      >
        <Login v-if="typeForm === 'login'" @toggle="handleToggleForm" />
        <LoginRegister v-else :type="typeForm" @toggle="handleToggleForm" />
      </div>
    </div>
  </client-only>
</template>
