// 图片资源
const cantarella = new URL('@/assets/images/role/cantarella.png', import.meta.url).href
const baizhi = new URL('@/assets/images/role/baizhi.png', import.meta.url).href
const camellya = new URL('@/assets/images/role/camellya.png', import.meta.url).href
const chixia = new URL('@/assets/images/role/chixia.png', import.meta.url).href
const danjin = new URL('@/assets/images/role/danjin.png', import.meta.url).href
const qiushui = new URL('@/assets/images/role/qiushui.png', import.meta.url).href
const sanhua = new URL('@/assets/images/role/sanhua.png', import.meta.url).href
const shorekeeper = new URL('@/assets/images/role/shorekeeper.png', import.meta.url).href
const yuanwu = new URL('@/assets/images/role/yuanwu.png', import.meta.url).href

const cantarella_TC = new URL('@/assets/tachie/cantarella.png', import.meta.url).href
const baizhi_TC = new URL('@/assets/tachie/baizhi.webp', import.meta.url).href
const camellya_TC = new URL('@/assets/tachie/camellya.png', import.meta.url).href
const chixia_TC = new URL('@/assets/tachie/chixia.webp', import.meta.url).href
const danjin_TC = new URL('@/assets/tachie/danjin.webp', import.meta.url).href
const qiushui_TC = new URL('@/assets/tachie/qiushui.png', import.meta.url).href
const sanhua_TC = new URL('@/assets/tachie/sanhua.webp', import.meta.url).href
const shorekeeper_TC = new URL('@/assets/tachie/shorekeeper.png', import.meta.url).href
const yuanwu_TC = new URL('@/assets/tachie/yuanwu.webp', import.meta.url).href
//视频资源
const chun_zh = '/assets/videos/compressPV/chun_zh.mp4?url'
const dj_zh = '/assets/videos/compressPV/dj_zh.mp4?url'
const ktll_zh = '/assets/videos/compressPV/ktll_zh.mp4?url'
const qs_zh = '/assets/videos/compressPV/qs_zh.mp4?url'
const sar_zh = '/assets/videos/compressPV/sar_zh.mp4?url'
const sh_zh = '/assets/videos/compressPV/sh_zh.mp4?url'

//音频资源
const cantarella_zh = new URL('@/assets/mp3/cantarella.mp3', import.meta.url).href
const baizhi_zh = new URL('@/assets/mp3/baizhi.mp3', import.meta.url).href
const camellya_zh = new URL('@/assets/mp3/camellya.mp3', import.meta.url).href
const chixia_zh = new URL('@/assets/mp3/chixia.mp3', import.meta.url).href
const danjin_zh = new URL('@/assets/mp3/danjin.mp3', import.meta.url).href
const qiushui_zh = new URL('@/assets/mp3/qiushui.mp3', import.meta.url).href
const sanhua_zh = new URL('@/assets/mp3/sanhua.mp3', import.meta.url).href
const shorekeeper_zh = new URL('@/assets/mp3/shorekeeper.mp3', import.meta.url).href
const yuanwu_zh = new URL('@/assets/mp3/yuanwu.mp3', import.meta.url).href

export const totalPages = [
  {
    role: { zh_cn: '坎特蕾拉', en_us: 'Cantarella' },
    details: {
      tachie: cantarella_TC,
      attribute: '湮灭',
      camp: '黎那汐塔',
      quality: 5,
      CV: { zh_cn: '小米' },
      dub: cantarella_zh,
      introduce: '翡萨烈现任家主，「毒药」坎特蕾拉。是「毒」，还是「药」，取决于你的用法哦。',
      PV: ktll_zh,
    },
    controller: { image: cantarella },
  },

  {
    role: { zh_cn: '椿', en_us: 'Camellya' },
    details: {
      tachie: camellya_TC,
      attribute: '湮灭',
      camp: '黑海岸',
      quality: 5,
      CV: { zh_cn: '柳知萧' },
      dub: camellya_zh,
      introduce: '我很期待……这场只属于你我的游戏',
      PV: chun_zh,
    },
    controller: { image: camellya },
  },
  {
    role: { zh_cn: '守岸人', en_us: 'The Shorekeeper' },
    details: {
      tachie: shorekeeper_TC,
      attribute: '衍射',
      camp: '黑海岸',
      quality: 5,
      CV: { zh_cn: '唐雅菁' },
      dub: shorekeeper_zh,
      introduce: '守岸人，这个称呼就很好。它表示，某种因你而有的意义和决心。',
      PV: sar_zh,
    },
    controller: { image: shorekeeper },
  },
  {
    role: { zh_cn: '丹瑾', en_us: 'Danjin' },
    details: {
      tachie: danjin_TC,
      attribute: '湮灭',
      camp: '瑝珑',
      quality: 4,
      CV: { zh_cn: '一口井' },
      dub: danjin_zh,
      introduce: '希望我所到之处的罪恶通通消失。明里没有，暗里也不许有。',
      PV: dj_zh,
    },
    controller: { image: danjin },
  },
  {
    role: { zh_cn: '散华', en_us: 'Sanhua' },
    details: {
      tachie: sanhua_TC,
      attribute: '冷凝',
      camp: '瑝珑',
      quality: 4,
      CV: { zh_cn: '宋媛媛' },
      dub: sanhua_zh,
      introduce: '请不要离我太远。我有把握，绝不会让你被伤及分毫。',
      PV: sh_zh,
    },
    controller: { image: sanhua },
  },
  {
    role: { zh_cn: '渊武', en_us: 'Yuanwu' },
    details: {
      tachie: yuanwu_TC,
      attribute: '导电',
      camp: '瑝珑',
      quality: 4,
      CV: { zh_cn: '刘北辰' },
      dub: yuanwu_zh,
      introduce: '做事嘛，自己想清楚了，无愧于心就好。',
      PV: null,
    },
    controller: { image: yuanwu },
  },
  {
    role: { zh_cn: '白芷', en_us: 'Baizhi' },
    details: {
      tachie: baizhi_TC,
      attribute: '冷凝',
      camp: '瑝珑',
      quality: 4,
      CV: { zh_cn: '陈婷婷' },
      dub: baizhi_zh,
      introduce: '我不是因为相信抱有期待的，而是因为怀疑。不能证无，就意味可能证有。',
      PV: null,
    },
    controller: { image: baizhi },
  },
  {
    role: { zh_cn: '炽霞', en_us: 'Chixia' },
    details: {
      tachie: chixia_TC,
      attribute: '热熔',
      camp: '瑝珑',
      quality: 4,
      CV: { zh_cn: '蔡娜' },
      dub: chixia_zh,
      introduce: '今巡尉炽霞，要是遇到什么需要帮忙的事儿，就找我吧！',
      PV: dj_zh,
    },
    controller: { image: chixia },
  },
  {
    role: { zh_cn: '秋水', en_us: 'Aalto' },
    details: {
      tachie: qiushui_TC,
      attribute: '气动',
      camp: '黑海岸',
      quality: 4,
      CV: { zh_cn: '梁达伟' },
      dub: qiushui_zh,
      introduce: '哟，老顾客，今天想打听什么？',
      PV: qs_zh,
    },
    controller: { image: qiushui },
  },
]
