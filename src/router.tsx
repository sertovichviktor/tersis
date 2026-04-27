import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Создаем роутер для SPA (без серверных функций)
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

// Регистрируем роутер для поддержки типов
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
