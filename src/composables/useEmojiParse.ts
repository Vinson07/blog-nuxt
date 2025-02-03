export interface Emoji {
  [key: string]: string
}

export const useEmojiParse = (allEmoji: Emoji, val: string): string => {
  // 基地址
  const runtimeConfig = useRuntimeConfig()
  const { emojiUrl } = runtimeConfig.public
  // 解析表情
  const reg = /\[.+?\]/g
  val = val.replace(reg, (str: any) => {
    const emojiPath = emojiUrl + allEmoji[str]
    // 表情库不存在的就默认返回原字符串
    if (!emojiPath) {
      return str
    }
    return `<img src="${emojiPath}" alt="${str}" title="${str}" style="height: 24px; margin: 0 1px; vertical-align: text-bottom"/>`
  })
  return val
}
