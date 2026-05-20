import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  // 1. Оставляем скролл, это полезно
  scrollRestoration: true, 
  
  // 2. ГЛАВНЫЙ ФИКС: Выключаем предзагрузку к чертям
  // Теперь роутер не будет ничего делать, пока ты реально не нажмешь на ссылку
  defaultPreload: false, 
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
