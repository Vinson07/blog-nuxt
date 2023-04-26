<script setup lang="ts">
interface List {
  type: string
  id: string
  title: string
}

interface Props {
  top?: number
  right?: number
  tocList: List[]
}

const props = withDefaults(defineProps<Props>(), {
  top: 60,
  right: 100
})

const tocRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const tocTop = tocRef.value && tocRef.value.offsetTop
  const handleScroll = () => {
    if (tocRef.value) {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (tocTop && scrollTop > tocTop) {
        tocRef.value.style.position = 'fixed'
        tocRef.value.style.top = props.top + 'px'
        tocRef.value.style.right = props.right + 'px'
      } else {
        tocRef.value.style.position = ''
      }
    }
  }

  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav id="toc" ref="tocRef" class="max-h-[500px] max-w-[300px]">
    <ul>
      <li>
        <a href="">{{ '11' }}</a>
        <ol>
          <li>
            <a href="">{{ '22' }}</a>
          </li>
        </ol>
      </li>
    </ul>
  </nav>
</template>

<style lang="less">
#toc {
  @apply overflow-y-auto rounded px-4 py-1 shadow-xl;
  ul {
    li {
      a {
        @apply block overflow-hidden text-ellipsis whitespace-nowrap rounded p-2 hover:bg-gray-200 dark:hover:bg-indigo-500;
      }
      ol {
        @apply px-4;
      }
    }
  }
}
</style>
