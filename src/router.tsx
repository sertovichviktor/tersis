import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  scrollRestoration: false, 
  defaultPreload: false, // ГЛАВНЫЙ ФИКС: роутер не будет "паниковать" при кликах
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
