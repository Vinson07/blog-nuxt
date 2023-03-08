export default defineNuxtPlugin(() => {
  return {
    provide: {
      toc: () => {
        // 处理文章目录 定位方法
        const handleScroll = () => {
          const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          const tocNavDom: HTMLDivElement | null = document.querySelector('#toc-nav')
          if (tocNavDom) {
            if (scrollTop > 345) {
              tocNavDom.style.top = '80px'
            } else {
              tocNavDom.style.top = ''
            }
          }
        }

        addEventListener('scroll', handleScroll, false)

        onUnmounted(() => {
          removeEventListener('scroll', handleScroll)
        })
      }
    }
  }
})
