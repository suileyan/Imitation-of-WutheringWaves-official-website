// 强类型约束的页面配置
import type PageConfig from '@/types/page.d.ts'

const config = {
  type: 'error',
  title: '页面未找到',
  requiresAuth: false,
} satisfies PageConfig

export default config
