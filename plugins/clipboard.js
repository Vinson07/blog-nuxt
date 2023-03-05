import Clipboard from 'clipboard'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      copy: (el) => new Clipboard(el)
    }
  }
})
