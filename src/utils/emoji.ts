const runtimeConfig = useRuntimeConfig()
const { emojiUrl } = runtimeConfig.public

const faceList = ['tv_小电视', '小黄脸']

const emojiList = [
  {
    '[tv_白眼]': `${emojiUrl}/emoji/tv/baiyan.gif`,
    '[tv_doge]': `${emojiUrl}/emoji/tv/doge.gif`,
    '[tv_坏笑]': `${emojiUrl}/emoji/tv/huaixiao.gif`,
    '[tv_难过]': `${emojiUrl}/emoji/tv/nanguo.gif`,
    '[tv_生气]': `${emojiUrl}/emoji/tv/shengqi.gif`,
    '[tv_委屈]': `${emojiUrl}/emoji/tv/weiqu.gif`,
    '[tv_斜眼笑]': `${emojiUrl}/emoji/tv/xieyanxiao.gif`,
    '[tv_呆]': `${emojiUrl}/emoji/tv/dai.gif`,
    '[tv_发怒]': `${emojiUrl}/emoji/tv/fanu.gif`,
    '[tv_惊吓]': `${emojiUrl}/emoji/tv/jingxia.gif`,
    '[tv_呕吐]': `${emojiUrl}/emoji/tv/outu.gif`,
    '[tv_思考]': `${emojiUrl}/emoji/tv/sikao.gif`,
    '[tv_微笑]': `${emojiUrl}/emoji/tv/weixiao.gif`,
    '[tv_疑问]': `${emojiUrl}/emoji/tv/yiwen.gif`,
    '[tv_大哭]': `${emojiUrl}/emoji/tv/daku.gif`,
    '[tv_鼓掌]': `${emojiUrl}/emoji/tv/guzhang.gif`,
    '[tv_抠鼻]': `${emojiUrl}/emoji/tv/koubi.gif`,
    '[tv_亲亲]': `${emojiUrl}/emoji/tv/qinqin.gif`,
    '[tv_调皮]': `${emojiUrl}/emoji/tv/tiaopi.gif`,
    '[tv_笑哭]': `${emojiUrl}/emoji/tv/xiaoku.gif`,
    '[tv_晕]': `${emojiUrl}/emoji/tv/yun.gif`,
    '[tv_点赞]': `${emojiUrl}/emoji/tv/dianzan.gif`,
    '[tv_害羞]': `${emojiUrl}/emoji/tv/haixiu.gif`,
    '[tv_睡着]': `${emojiUrl}/emoji/tv/shuizhe.gif`,
    '[tv_色]': `${emojiUrl}/emoji/tv/se.gif`,
    '[tv_吐血]': `${emojiUrl}/emoji/tv/tuxue.gif`,
    '[tv_无奈]': `${emojiUrl}/emoji/tv/wunai.gif`,
    '[tv_再见]': `${emojiUrl}/emoji/tv/zaijian.gif`,
    '[tv_流汗]': `${emojiUrl}/emoji/tv/liuhan.gif`,
    '[tv_偷笑]': `${emojiUrl}/emoji/tv/touxiao.gif`,
    '[tv_抓狂]': `${emojiUrl}/emoji/tv/zhuakuang.gif`,
    '[tv_黑人问号]': `${emojiUrl}/emoji/tv/wenhao.gif`,
    '[tv_困]': `${emojiUrl}/emoji/tv/kun.gif`,
    '[tv_打脸]': `${emojiUrl}/emoji/tv/dalian.gif`,
    '[tv_闭嘴]': `${emojiUrl}/emoji/tv/bizui.gif`,
    '[tv_鄙视]': `${emojiUrl}/emoji/tv/bishi.gif`,
    '[tv_腼腆]': `${emojiUrl}/emoji/tv/miantian.gif`,
    '[tv_馋]': `${emojiUrl}/emoji/tv/chan.gif`,
    '[tv_可爱]': `${emojiUrl}/emoji/tv/keai.gif`,
    '[tv_发财]': `${emojiUrl}/emoji/tv/facai.gif`,
    '[tv_生病]': `${emojiUrl}/emoji/tv/shengbing.gif`,
    '[tv_流鼻血]': `${emojiUrl}/emoji/tv/liubixue.gif`,
    '[tv_尴尬]': `${emojiUrl}/emoji/tv/ganga.gif`,
    '[tv_大佬]': `${emojiUrl}/emoji/tv/dalao.gif`
  },
  {
    '[衰]': `${emojiUrl}/emoji/01/shai.gif`,
    '[鄙视]': `${emojiUrl}/emoji/01/bishi.gif`,
    '[再见]': `${emojiUrl}/emoji/01/zaijian.gif`,
    '[捂嘴]': `${emojiUrl}/emoji/01/wuzui.gif`,
    '[摸鱼]': `${emojiUrl}/emoji/01/moyu.gif`,
    '[奋斗]': `${emojiUrl}/emoji/01/fendou.gif`,
    '[白眼]': `${emojiUrl}/emoji/01/baiyan.gif`,
    '[可怜]': `${emojiUrl}/emoji/01/kelian.gif`,
    '[皱眉]': `${emojiUrl}/emoji/01/zhoumei.gif`,
    '[鼓掌]': `${emojiUrl}/emoji/01/guzhang.gif`,
    '[烦恼]': `${emojiUrl}/emoji/01/fannao.gif`,
    '[吐舌]': `${emojiUrl}/emoji/01/tushe.gif`,
    '[挖鼻]': `${emojiUrl}/emoji/01/wabi.gif`,
    '[委屈]': `${emojiUrl}/emoji/01/weiqu.gif`,
    '[滑稽]': `${emojiUrl}/emoji/01/huaji.gif`,
    '[啊这]': `${emojiUrl}/emoji/01/azhe.gif`,
    '[生气]': `${emojiUrl}/emoji/01/shengqi.gif`,
    '[害羞]': `${emojiUrl}/emoji/01/haixiu.gif`,
    '[晕]': `${emojiUrl}/emoji/01/yun.gif`,
    '[好色]': `${emojiUrl}/emoji/01/haose.gif`,
    '[流泪]': `${emojiUrl}/emoji/01/liulei.gif`,
    '[吐血]': `${emojiUrl}/emoji/01/tuxie.gif`,
    '[微笑]': `${emojiUrl}/emoji/01/weixiao.gif`,
    '[酷]': `${emojiUrl}/emoji/01/ku.gif`,
    '[坏笑]': `${emojiUrl}/emoji/01/huaixiao.gif`,
    '[吓]': `${emojiUrl}/emoji/01/xia.gif`,
    '[大兵]': `${emojiUrl}/emoji/01/dabing.gif`,
    '[哭笑]': `${emojiUrl}/emoji/01/kuxiao.gif`,
    '[困]': `${emojiUrl}/emoji/01/kun.gif`,
    '[呲牙]': `${emojiUrl}/emoji/01/ciya.gif`
  }
]

// 把emojiList数组中的每一个对象，放到emojiMap中方便取用
function allEmoji(): {} {
  let emojiMap = {}
  emojiList.map((emojis) => (emojiMap = { ...emojiMap, ...emojis }))
  return emojiMap
}

export default {
  faceList,
  emojiList,
  allEmoji: allEmoji()
}
