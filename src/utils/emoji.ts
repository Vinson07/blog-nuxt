const faceList = ['tv_小电视', '小黄脸']

const emojiList = [
  {
    '[tv_白眼]': `/emoji/tv/baiyan.gif`,
    '[tv_doge]': `/emoji/tv/doge.gif`,
    '[tv_坏笑]': `/emoji/tv/huaixiao.gif`,
    '[tv_难过]': `/emoji/tv/nanguo.gif`,
    '[tv_生气]': `/emoji/tv/shengqi.gif`,
    '[tv_委屈]': `/emoji/tv/weiqu.gif`,
    '[tv_斜眼笑]': `/emoji/tv/xieyanxiao.gif`,
    '[tv_呆]': `/emoji/tv/dai.gif`,
    '[tv_发怒]': `/emoji/tv/fanu.gif`,
    '[tv_惊吓]': `/emoji/tv/jingxia.gif`,
    '[tv_呕吐]': `/emoji/tv/outu.gif`,
    '[tv_思考]': `/emoji/tv/sikao.gif`,
    '[tv_微笑]': `/emoji/tv/weixiao.gif`,
    '[tv_疑问]': `/emoji/tv/yiwen.gif`,
    '[tv_大哭]': `/emoji/tv/daku.gif`,
    '[tv_鼓掌]': `/emoji/tv/guzhang.gif`,
    '[tv_抠鼻]': `/emoji/tv/koubi.gif`,
    '[tv_亲亲]': `/emoji/tv/qinqin.gif`,
    '[tv_调皮]': `/emoji/tv/tiaopi.gif`,
    '[tv_笑哭]': `/emoji/tv/xiaoku.gif`,
    '[tv_晕]': `/emoji/tv/yun.gif`,
    '[tv_点赞]': `/emoji/tv/dianzan.gif`,
    '[tv_害羞]': `/emoji/tv/haixiu.gif`,
    '[tv_睡着]': `/emoji/tv/shuizhe.gif`,
    '[tv_色]': `/emoji/tv/se.gif`,
    '[tv_吐血]': `/emoji/tv/tuxue.gif`,
    '[tv_无奈]': `/emoji/tv/wunai.gif`,
    '[tv_再见]': `/emoji/tv/zaijian.gif`,
    '[tv_流汗]': `/emoji/tv/liuhan.gif`,
    '[tv_偷笑]': `/emoji/tv/touxiao.gif`,
    '[tv_抓狂]': `/emoji/tv/zhuakuang.gif`,
    '[tv_黑人问号]': `/emoji/tv/wenhao.gif`,
    '[tv_困]': `/emoji/tv/kun.gif`,
    '[tv_打脸]': `/emoji/tv/dalian.gif`,
    '[tv_闭嘴]': `/emoji/tv/bizui.gif`,
    '[tv_鄙视]': `/emoji/tv/bishi.gif`,
    '[tv_腼腆]': `/emoji/tv/miantian.gif`,
    '[tv_馋]': `/emoji/tv/chan.gif`,
    '[tv_可爱]': `/emoji/tv/keai.gif`,
    '[tv_发财]': `/emoji/tv/facai.gif`,
    '[tv_生病]': `/emoji/tv/shengbing.gif`,
    '[tv_流鼻血]': `/emoji/tv/liubixue.gif`,
    '[tv_尴尬]': `/emoji/tv/ganga.gif`,
    '[tv_大佬]': `/emoji/tv/dalao.gif`
  },
  {
    '[衰]': `/emoji/01/shai.gif`,
    '[鄙视]': `/emoji/01/bishi.gif`,
    '[再见]': `/emoji/01/zaijian.gif`,
    '[捂嘴]': `/emoji/01/wuzui.gif`,
    '[摸鱼]': `/emoji/01/moyu.gif`,
    '[奋斗]': `/emoji/01/fendou.gif`,
    '[白眼]': `/emoji/01/baiyan.gif`,
    '[可怜]': `/emoji/01/kelian.gif`,
    '[皱眉]': `/emoji/01/zhoumei.gif`,
    '[鼓掌]': `/emoji/01/guzhang.gif`,
    '[烦恼]': `/emoji/01/fannao.gif`,
    '[吐舌]': `/emoji/01/tushe.gif`,
    '[挖鼻]': `/emoji/01/wabi.gif`,
    '[委屈]': `/emoji/01/weiqu.gif`,
    '[滑稽]': `/emoji/01/huaji.gif`,
    '[啊这]': `/emoji/01/azhe.gif`,
    '[生气]': `/emoji/01/shengqi.gif`,
    '[害羞]': `/emoji/01/haixiu.gif`,
    '[晕]': `/emoji/01/yun.gif`,
    '[好色]': `/emoji/01/haose.gif`,
    '[流泪]': `/emoji/01/liulei.gif`,
    '[吐血]': `/emoji/01/tuxie.gif`,
    '[微笑]': `/emoji/01/weixiao.gif`,
    '[酷]': `/emoji/01/ku.gif`,
    '[坏笑]': `/emoji/01/huaixiao.gif`,
    '[吓]': `/emoji/01/xia.gif`,
    '[大兵]': `/emoji/01/dabing.gif`,
    '[哭笑]': `/emoji/01/kuxiao.gif`,
    '[困]': `/emoji/01/kun.gif`,
    '[呲牙]': `/emoji/01/ciya.gif`
  }
]

// 把emojiList数组中的每一个对象，放到emojiMap中方便取用
function useEmojiMap(): {} {
  let emojiMap = {}
  emojiList.forEach((emojis) => {
    emojiMap = { ...emojiMap, ...emojis }
  })
  return emojiMap
}

export { faceList, emojiList, useEmojiMap }
