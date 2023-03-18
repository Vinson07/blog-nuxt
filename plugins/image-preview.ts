export default defineNuxtPlugin(() => {
  return {
    provide: {
      imagePreview: (el: Ref<HTMLElement | null>) => {
        if (!el.value) return false

        const { innerWidth: winWidth, innerHeight: winHeight } = window

        el.value.addEventListener('click', function (e: Event) {
          e.preventDefault()
          const target = e.target as HTMLImageElement
          if (target.hasAttribute('preview')) {
            const originalEl = target
            originalEl.style.opacity = '0'
            openPreview(originalEl)
          }
        })

        function openPreview(el: HTMLImageElement) {
          const { offsetWidth, offsetHeight, src } = el
          const { top, left } = el.getBoundingClientRect()

          // 创建蒙层
          const mask = document.createElement('div')
          const img = document.createElement('img')
          mask.classList.add('img-modal')
          img.classList.add('img-preview')
          img.src = src
          img.width = offsetWidth
          img.style.top = top + 'px'
          img.style.left = left + 'px'

          // 移动图片到屏幕中心位置
          const timeId = setTimeout(() => {
            const centerHeight = (winHeight - offsetHeight) / 2 - top
            const centerWidth = (winWidth - offsetWidth) / 2 - left
            img.style.transform = `translate(${centerWidth}px, ${centerHeight}px)`
            mask.style.opacity = '1'
          }, 300)

          // 添加在body下
          document.body.appendChild(mask)
          document.body.appendChild(img)
          // 注册事件
          mask.addEventListener('click', clickFunc)
          img.addEventListener('dblclick', doubleFunc)

          // 遮罩点击事件
          function clickFunc() {
            mask.style.opacity = '0'
            img.style.transform = 'translate(0, 0)'
            clearTimeout(timeId)
            setTimeout(() => {
              document.body.removeChild(mask)
              document.body.removeChild(img)
              el.style.opacity = '1'
            }, 300)
            mask.removeEventListener('click', clickFunc)
            img.removeEventListener('dblclick', doubleFunc)
          }

          // 双击图片事件
          let toggleScale = true
          function doubleFunc() {
            const centerHeight = (winHeight - offsetHeight) / 2 - top
            const centerWidth = (winWidth - offsetWidth) / 2 - left
            if (toggleScale) {
              img.style.transform = `translate(${centerWidth}px, ${centerHeight}px) scale(2)`
              img.style.cursor = 'zoom-out'
              toggleScale = false
            } else {
              img.style.transform = `translate(${centerWidth}px, ${centerHeight}px) scale(1)`
              img.style.cursor = 'zoom-in'
              toggleScale = true
            }
          }
        }
      }
    }
  }
})
