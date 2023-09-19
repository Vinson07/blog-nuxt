export const useFormatLyric = () => {
  const lyricMap = new Map<number, string>()

  /**
   * 格式化时间字符串为时间，时间单位为秒
   * @param timeString 时间字符串，格式为： mm:ss:ss, 如： 00:01:404
   * @returns
   */
  const formatTimeToNumber = (timeString: string) => {
    const time = 0

    if (timeString) {
      const splitArr = timeString.split(':').map((item) => Number(item))
      return splitArr[0] * 60 + splitArr[1]
    }

    return time
  }

  /**
   * 格式化歌词字符串为"时间-歌词"格式的数组
   * @param lyric 歌词字符串
   * @returns
   */
  const format = (lyric: string) => {
    const lyricParts = lyric.split('\n').filter((item) => item)
    // 清空
    lyricMap.clear()

    lyricParts.forEach((item) => {
      const splitItems = item.split(']')

      // const lyricItem: ILyric = {
      //   time: formatTimeToNumber(splitItems[0].slice(1)),
      //   text: splitItems[1]
      // }
      const time = Math.floor(formatTimeToNumber(splitItems[0].slice(1)))
      const text = splitItems[1]
      lyricMap.set(time, text)
    })
  }

  return {
    lyricMap,
    format
  }
}
