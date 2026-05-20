import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  // ВЫКЛЮЧАЕМ ЭТИ ДВЕ ШТУКИ - ОНИ УБИВАЛИ САЙТ:
  scrollRestoration: false, 
  defaultPreload: false,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
