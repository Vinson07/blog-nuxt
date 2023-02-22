<script setup lang="ts">
// const isDark = useDark({
//   selector: 'html',
//   attribute: 'class',
//   valueDark: 'dark',
//   valueLight: 'light'
// })

// const toggleDark = useToggle(isDark)
// 菜单
const menuList = [
  {
    icon: 'noto:house-with-garden',
    text: '首页'
  },
  {
    icon: 'icon-park:message',
    text: '留言'
  },
  {
    icon: 'icon-park:friends-circle',
    text: '友链'
  },
  {
    icon: 'flat-color-icons:gallery',
    text: '图库'
  }
]
</script>

<template>
  <div>
    <header class="flex h-14 items-center justify-between bg-[rgba(0,0,0,.5)] px-4">
      <h1 class="cursor-pointer text-2xl">Vinson</h1>
      <nav>
        <ul class="flex">
          <li
            v-for="(item, index) in menuList"
            :key="index"
            class="flex cursor-pointer items-center px-1"
          >
            <Icon :name="item.icon" />
            <span class="pl-1">{{ item.text }}</span>
          </li>
        </ul>
      </nav>
      <div class="flex">
        <div class="cursor-pointer pr-1">
          <Icon name="icon-park:search" size="1.2em" />
        </div>
        <div class="cursor-pointer">头像</div>
      </div>
    </header>
    <slot />
  </div>
</template>
