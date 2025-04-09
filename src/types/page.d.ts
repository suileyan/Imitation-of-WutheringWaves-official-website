// src/types/page.d.ts
declare interface PageConfig {
  type: string
  title?: string
  requiresAuth?: boolean
  keepAlive?: boolean
}

export default PageConfig
