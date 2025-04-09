import type { Component } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 扩展路由元数据类型
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    isHome: boolean
    isError: boolean
  }
}

interface PageConfig {
  type?: 'home' | 'error'
  title: string
  requiresAuth?: boolean
  [key: string]: unknown
}

const pageModules = import.meta.glob('../views/**/*.vue', { eager: true })
const configModules = import.meta.glob('../views/**/config.ts', { eager: true })

const generateRoutes = (): RouteRecordRaw[] => {
  return Object.entries(pageModules).map(([filePath, module]) => {
    const dirPath = filePath.replace(/[^/]+\.vue$/, '')
    const configPath = `${dirPath}config.ts`

    // 安全加载配置
    const config = (() => {
      try {
        return (configModules[configPath] as { default: PageConfig }).default || {}
      } catch {
        console.warn(`[路由配置] ${configPath} 加载失败`)
        return {}
      }
    })() as PageConfig

    // 标题校验
    if (!config.title) {
      console.error(`[路由错误] ${filePath} 未配置标题`)
      config.title = '未命名页面'
    }

    const rawPath = filePath
      .replace('../views/', '')
      .replace(/(\/index)?\.vue$/, '')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase()

    let routePath = ''
    if (config.type === 'home') {
      routePath = '/'
    } else if (config.type === 'error') {
      routePath = '/:pathMatch(.*)*'
    } else {
      routePath = `/${rawPath.replace(/\/home(\/|$)/, '')}`
    }

    return {
      path: routePath,
      name: rawPath.replace(/\//g, '-'),
      component: (module as { default: Component }).default,
      meta: {
        title: config.title,
        isHome: config.type === 'home',
        isError: config.type === 'error',
        requiresAuth: config.requiresAuth || false,
      },
    }
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes: generateRoutes()
    .sort((a, b) => {
      const aIsHome = a.meta?.isHome ?? false
      const bIsHome = b.meta?.isHome ?? false
      return aIsHome ? -1 : bIsHome ? 1 : 0
    })
    .concat([{ path: '/index', redirect: '/' }]),
})

// 全局标题设置
router.beforeEach((to) => {
  const appName = 'Wuthering Waves'
  document.title = to.meta.isHome
    ? `${to.meta.title} | ${appName}`
    : `${to.meta.title} - ${appName}`
})

export default router
