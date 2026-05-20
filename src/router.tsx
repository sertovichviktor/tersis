import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  // ВЫКЛЮЧАЕМ ПРИЧИНЫ ФРИЗА:
  scrollRestoration: false, 
  defaultPreload: false,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
