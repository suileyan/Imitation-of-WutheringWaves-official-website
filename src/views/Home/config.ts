// 强类型约束的页面配置
import type PageConfig from '@/types/page.d.ts'
const config = {
  type: 'home',
  title: '《鸣潮》仿官方网站',
  requiresAuth: false,
  keepAlive: false,
} satisfies PageConfig

export default config
