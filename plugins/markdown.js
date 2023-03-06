import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      markdownIt: (data) => {
        const md = new MarkdownIt({
          html: true,
          linkify: true,
          typographer: true,
          highlight: function (str, lang) {
            // 当前时间加随机数生成唯一的id标识
            const codeIndex = parseInt(Date.now()) + Math.floor(Math.random() * 10000000)
            // 复制功能主要使用的是 clipboard.js
            let html = `<button class="copy-btn" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}">复制</button>`
            const linesLength = str.split(/\n/).length - 1
            // 生成行号
            let linesNum = '<span aria-hidden="true" class="line-numbers-rows">'
            for (let index = 0; index < linesLength; index++) {
              linesNum = linesNum + '<span></span>'
            }
            linesNum += '</span>'
            if (lang && hljs.getLanguage(lang)) {
              try {
                // highlight.js 高亮代码
                const preCode = hljs.highlight(lang, str, true).value
                html = html + preCode
                if (linesLength) {
                  html += '<b class="name">' + lang + '</b>'
                }
                // 将代码包裹在 textarea 中，由于防止textarea渲染出现问题，这里将 "<" 用 "&lt;" 代替，不影响复制功能
                return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
                  /<\/textarea>/g,
                  '&lt;/textarea>'
                )}</textarea>`
              } catch (error) {
                console.error(error)
              }
            }

            const preCode = md.utils.escapeHtml(str)
            html = html + preCode
            return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
              /<\/textarea>/g,
              '&lt;/textarea>'
            )}</textarea>`
          }
        })
        // 渲染成html
        const result = md.render(data)
        return result
      }
    }
  }
})
