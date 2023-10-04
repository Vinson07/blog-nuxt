import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/common'
// @ts-ignore
import iterator from 'markdown-it-for-inline'
// @ts-ignore
import container from 'markdown-it-container'
// @ts-ignore
import checkbox from 'markdown-it-checkbox'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      markdownIt: (data: string) => {
        const md = new MarkdownIt({
          html: true, // 在源码中启用HTML标签
          linkify: true, // 将类似URL的文本自动转换为链接
          breaks: true, // 转换段落里的 '\n' 到 <br>
          typographer: true,
          highlight: function (str, lang) {
            // 当前时间加随机数生成唯一的id标识
            const codeIndex = parseInt(Date.now().toString()) + Math.floor(Math.random() * 10000000)
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
                // const preCode = hljs.highlight(lang, str, true).value
                const preCode = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
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
        // a标签 新窗口打开
        md.use(iterator, 'url_new_win', 'link_open', function (tokens: any, idx: number) {
          const aIndex = tokens[idx].attrIndex('target')
          if (aIndex < 0) {
            tokens[idx].attrPush(['target', '_blank'])
          } else {
            tokens[idx].attrs[aIndex][1] = '_blank'
          }
        })
        // 图片处理
        // md.use(iterator, 'image_replace', 'image', function (tokens: any, idx: number) {
        //   const aIndex = tokens[idx].attrIndex('class')
        //   if (aIndex < 0) {
        //     tokens[idx].attrPush(['class', 'img-preview'])
        //   } else {
        //     tokens[idx].attrs[aIndex][1] = 'img-preview'
        //   }
        // })
        // 自定义容器
        md.use(container, 'tip')
        md.use(container, 'warning')
        md.use(container, 'danger')
        md.use(container, 'success')
        // 折叠
        md.use(container, 'spoiler', {
          validate: function (params: string) {
            return params.trim().match(/^spoiler\s+(.*)$/)
          },
          render: function (tokens: any, idx: number) {
            const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/)
            if (tokens[idx].nesting === 1) {
              // opening tag
              return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n'
            } else {
              // closing tag
              return '</details>\n'
            }
          }
        })
        // 复选框
        md.use(checkbox, {
          divWrap: true,
          divClass: 'contains-task-list'
          // idPrefix: 'cbx_'
        })
        // 渲染成html
        return md.render(data)
      },
      markdownItSearch: (data: string) => {
        const md = new MarkdownIt({
          html: true
        }).disable(['link', 'image'])
        return md.renderInline(data)
      },
      markdownItContent: (data: string) => {
        const md = new MarkdownIt()
        // 去除markdown标签
        return md
          .render(data)
          .replace(/<\/?[^>]*>/g, '')
          .replace(/[|]*\n/, '')
          .replace(/&npsp;/gi, '')
      }
    }
  }
})
