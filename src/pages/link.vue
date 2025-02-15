<script setup lang="ts">
const imageStore = useImageStore()

useHead({
  title: '友链'
})

const blogStore = useBlogStore()
const { link } = useApi()

// 友链列表
const { data: linkList } = await link.getLinkList()
</script>

<template>
  <div class="min-h-screen">
    <ThePageBanner :bg-cover="imageStore.pageList.link" title="友链" />
    <BaseBox class="mx-auto mt-5 max-w-4xl animate-[slideUpIn_1s]">
      <div class="mt-4 text-base">
        <p>欢迎交换友链 ꉂ(ˊᗜˋ)</p>
        <p class="my-5">
          请告诉我你的：<br />
          1、名字<br />
          2、一句话介绍<br />
          3、名字颜色<br />
          4、主页地址<br />
          5、头像（HTTPS*）
        </p>
        <p>
          For Example：<br />
          ★ Name: {{ blogStore.siteConfig?.siteName }} <br />
          ★ Bio: {{ blogStore.siteConfig?.siteIntro }}<br />
          ★ Color: #409eff<br />
          ★ URL: {{ blogStore.siteConfig?.siteAddress }}<br />
          ★ Avatar:
          <a
            class="text-v-hc dark:text-v-hc-dark"
            :href="blogStore.siteConfig?.authorAvatar"
            target="_blank"
            rel="nofollow"
          >
            获取嵌入代码
          </a>
        </p>
      </div>
      <div class="my-10">
        <h3
          class="border-v-hc text-v-hc dark:border-v-hc-dark dark:text-v-hc-dark border-l-[3px] pl-3 text-xl"
        >
          朋友们
        </h3>
        <div v-if="linkList?.flag" class="grid grid-cols-1 gap-2 py-5 px-3 md:grid-cols-3">
          <LinkBuddy
            v-for="item in linkList.data"
            :key="item.id"
            :avatar="item.avatar"
            :title="item.name"
            :link="item.url"
            :intro="item.introduction"
            :color="item.color"
          />
        </div>
      </div>
      <Comment :type="2" nodata-tip="快来交换友链吧～" />
    </BaseBox>
  </div>
</template>
